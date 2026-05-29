"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"banks" | "submission">("banks");
  const [banks, setBanks] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showDeleteAdminModal, setShowDeleteAdminModal] = useState(false);
  const [showManageDropdown, setShowManageDropdown] = useState(false);
  const [showManageBanksDropdown, setShowManageBanksDropdown] = useState(false);
  const [showDeleteBankModal, setShowDeleteBankModal] = useState(false);
  const [showEditBankModal, setShowEditBankModal] = useState(false);
  const [deletingBankId, setDeletingBankId] = useState<string | null>(null);
  const [editingBank, setEditingBank] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [admins, setAdmins] = useState<any[]>([]);
  const [deletingAdminId, setDeletingAdminId] = useState<string | null>(null);
  const [togglingBankId, setTogglingBankId] = useState<string | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const [bankForm, setBankForm] = useState({
    accountLabel: "",
    accountName: "",
    maxLimit: "",
    minLimit: "",
    sortCode: "",
    accountNumber: "",
  });

  const [editForm, setEditForm] = useState({
    accountLabel: "",
    accountName: "",
    maxLimit: "",
    minLimit: "",
    sortCode: "",
    accountNumber: "",
  });

  const [adminForm, setAdminForm] = useState({
    username: "",
    password: "",
  });

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("adminRole");
    if (token) {
      setLoggedIn(true);
      setRole(savedRole || "admin");
      fetchBanks();
      fetchCustomers();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowManageDropdown(false);
      setShowManageBanksDropdown(false);
    };
    if (showManageDropdown || showManageBanksDropdown) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showManageDropdown, showManageBanksDropdown]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/admin/login`, { username, password });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("adminRole", res.data.role);
        setLoggedIn(true);
        setRole(res.data.role);
        fetchBanks();
        fetchCustomers();
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "Invalid username or password");
      setUsername("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") handleLogin();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminRole");
    setLoggedIn(false);
    setRole("");
    setUsername("");
    setPassword("");
  };

  const fetchBanks = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${API_URL}/banks/view-banks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBanks(res.data.data || []);
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 401) logout();
    }
  };

  const fetchCustomers = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${API_URL}/customer/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data.data || []);
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 401) logout();
    }
  };

  const fetchAdmins = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${API_URL}/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(res.data.data || []);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to fetch admins");
    }
  };

  const deleteAdmin = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this admin? This cannot be undone.");
    if (!confirmed) return;
    try {
      setDeletingAdminId(id);
      const token = getToken();
      await axios.delete(`${API_URL}/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins((prev) => prev.filter((a) => a._id !== id));
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to delete admin");
    } finally {
      setDeletingAdminId(null);
    }
  };

  const toggleBankStatus = async (id: string) => {
    try {
      setTogglingBankId(id);
      const token = getToken();
      const res = await axios.patch(`${API_URL}/banks/toggle-status/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBanks((prev) =>
        prev.map((b) => b._id === id ? { ...b, status: res.data.data.status } : b)
      );
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to toggle bank status");
    } finally {
      setTogglingBankId(null);
    }
  };

  // ---------------- DELETE BANK ----------------
  const deleteBank = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this bank?");
    if (!confirmed) return;
    try {
      setDeletingBankId(id);
      const token = getToken();
      await axios.delete(`${API_URL}/banks/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBanks((prev) => prev.filter((b) => b._id !== id));
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to delete bank");
    } finally {
      setDeletingBankId(null);
    }
  };

  // ---------------- OPEN EDIT BANK ----------------
  const openEditBank = (bank: any) => {
    setEditingBank(bank);
    setEditForm({
      accountLabel: bank.accountLabel,
      accountName: bank.accountName,
      maxLimit: String(bank.maxLimit),
      minLimit: String(bank.minLimit),
      sortCode: bank.sortCode,
      accountNumber: bank.accountNumber,
    });
    setShowEditBankModal(true);
  };

  // ---------------- SAVE EDIT BANK ----------------
  const saveEditBank = async () => {
    if (!editingBank) return;
    try {
      setSavingEdit(true);
      const token = getToken();
      const res = await axios.put(
        `${API_URL}/banks/edit/${editingBank._id}`,
        {
          ...editForm,
          maxLimit: Number(editForm.maxLimit),
          minLimit: Number(editForm.minLimit),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBanks((prev) =>
        prev.map((b) => b._id === editingBank._id ? res.data.data : b)
      );
      setShowEditBankModal(false);
      setEditingBank(null);
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to update bank");
    } finally {
      setSavingEdit(false);
    }
  };

  const approveCustomer = async (id: string) => {
    const confirmed = confirm("Approve this customer?");
    if (!confirmed) return;
    try {
      const token = getToken();
      await axios.post(`${API_URL}/customer/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to approve customer");
    }
  };

  const deleteCustomer = async (id: string) => {
    const confirmed = confirm("Are you sure you want to reject and delete this customer?");
    if (!confirmed) return;
    try {
      const token = getToken();
      await axios.delete(`${API_URL}/customer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to delete customer");
    }
  };

  const addBank = async () => {
    try {
      const token = getToken();
      await axios.post(
        `${API_URL}/banks/add`,
        {
          ...bankForm,
          maxLimit: Number(bankForm.maxLimit),
          minLimit: Number(bankForm.minLimit),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowBankModal(false);
      setBankForm({ accountLabel: "", accountName: "", maxLimit: "", minLimit: "", sortCode: "", accountNumber: "" });
      fetchBanks();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to add bank");
    }
  };

  const addAdmin = async () => {
    try {
      const token = getToken();
      await axios.post(`${API_URL}/admin/create-new`, adminForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Admin created successfully");
      setShowAdminModal(false);
      setAdminForm({ username: "", password: "" });
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to create admin");
    }
  };

  if (!loggedIn) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center bg-white">
        <div className="card border-0 shadow-lg p-4" style={{ width: "380px", borderRadius: "16px" }}>
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark">Junior Layer Admin</h2>
            <p className="text-muted mb-0">Login to continue</p>
          </div>
          <input
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            className="form-control mb-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-dark w-100" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-vh-100">

      {/* TOP BAR */}
    <div className="bg-black text-white px-4 py-3 d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid #333" }}>
      <div>
        <span className="fw-bold fs-5">Admin Portal</span>
        <span className="text-secondary ms-2 small">/ Dashboard</span>
      </div>

      <div className="d-flex align-items-center gap-2">
        {role === "superadmin" && (
          <div className="position-relative">
            <button
              className="btn btn-sm btn-outline-light"
              onClick={(e) => {
                e.stopPropagation();
                setShowManageDropdown((prev) => !prev);
              }}
            >
              Manage Admin ▾
            </button>

            {showManageDropdown && (
              <div
                className="position-absolute end-0 mt-1 bg-white border rounded shadow"
                style={{ minWidth: "160px", zIndex: 2000 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="dropdown-item py-2 px-3 text-dark"
                  onClick={() => {
                    setShowAdminModal(true);
                    setShowManageDropdown(false);
                  }}
                >
                  ➕ Add Admin
                </button>
                <hr className="my-1" />
                <button
                  className="dropdown-item py-2 px-3 text-danger"
                  onClick={() => {
                    fetchAdmins();
                    setShowDeleteAdminModal(true);
                    setShowManageDropdown(false);
                  }}
                >
                  🗑️ Delete Admin
                </button>
              </div>
            )}
          </div>
        )}

        <button className="btn btn-sm btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>

    {/* TAB BAR */}
    <div className="bg-black px-4 d-flex align-items-center gap-1" style={{ borderBottom: "2px solid #222" }}>
      <button
        className="btn btn-sm px-4 py-2 rounded-0"
        style={{
          color: activeTab === "banks" ? "#fff" : "#aaa",
          borderBottom: activeTab === "banks" ? "2px solid #fff" : "2px solid transparent",
          background: "transparent",
        }}
        onClick={() => { setActiveTab("banks"); fetchBanks(); }}
      >
        Banks
      </button>
      <button
        className="btn btn-sm px-4 py-2 rounded-0"
        style={{
          color: activeTab === "submission" ? "#fff" : "#aaa",
          borderBottom: activeTab === "submission" ? "2px solid #fff" : "2px solid transparent",
          background: "transparent",
        }}
        onClick={() => { setActiveTab("submission"); fetchCustomers(); }}
      >
        Submissions
      </button>
    </div>

      {/* MAIN CONTENT */}
      <div className="container py-4">

        {/* BANKS TAB */}
        {activeTab === "banks" && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="fw-bold mb-1 text-dark">Banks</h3>
                <p className="text-muted mb-0">Manage all linked bank accounts</p>
              </div>

              {/* MANAGE BANKS DROPDOWN */}
              <div className="position-relative">
                <button
                  className="btn btn-dark"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowManageBanksDropdown((prev) => !prev);
                  }}
                >
                  Manage Banks ▾
                </button>

                {showManageBanksDropdown && (
                  <div
                    className="position-absolute end-0 mt-1 bg-white border rounded shadow"
                    style={{ minWidth: "170px", zIndex: 2000 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="dropdown-item py-2 px-3 text-dark"
                      onClick={() => {
                        setShowBankModal(true);
                        setShowManageBanksDropdown(false);
                      }}
                    >
                      ➕ Add Bank
                    </button>
                    <hr className="my-1" />
                    <button
                      className="dropdown-item py-2 px-3 text-dark"
                      onClick={() => {
                        setShowEditBankModal(true);
                        setEditingBank(null);
                        setShowManageBanksDropdown(false);
                      }}
                    >
                      ✏️ Edit Bank
                    </button>
                    <hr className="my-1" />
                    <button
                      className="dropdown-item py-2 px-3 text-danger"
                      onClick={() => {
                        setShowDeleteBankModal(true);
                        setShowManageBanksDropdown(false);
                      }}
                    >
                      🗑️ Delete Bank
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="card border-0 shadow-sm" style={{ borderRadius: "14px" }}>
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Label</th>
                      <th>Name</th>
                      <th>Min</th>
                      <th>Max</th>
                      <th>Sort Code</th>
                      <th>Account</th>
                      <th>Total Received</th>
                      <th>Total Pending</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banks.length > 0 ? (
                      banks.map((b: any) => (
                        <tr key={b._id}>
                          <td>{b.accountLabel}</td>
                          <td>{b.accountName}</td>
                          <td>{b.minLimit}</td>
                          <td>{b.maxLimit}</td>
                          <td>{b.sortCode}</td>
                          <td>{b.accountNumber}</td>
                          <td>{b.totalReceived}</td>
                          <td>{b.totalPending}</td>
                          <td>
                            <button
                              className={`btn btn-sm ${b.status === "on" ? "btn-success" : "btn-secondary"}`}
                              disabled={togglingBankId === b._id}
                              onClick={() => toggleBankStatus(b._id)}
                            >
                              {togglingBankId === b._id ? "..." : b.status === "on" ? "ON" : "OFF"}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="text-center py-4 text-muted">
                          No banks found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* SUBMISSION TAB */}
        {activeTab === "submission" && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="fw-bold mb-1 text-dark">Submissions</h3>
                <p className="text-muted mb-0">Review and manage customer payment submissions</p>
              </div>
            </div>

            <div className="card border-0 shadow-sm" style={{ borderRadius: "14px" }}>
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Currency</th>
                      <th>Amount</th>
                      <th>Bank</th>
                      <th>Screenshot</th>
                      <th>Submitted At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.length > 0 ? (
                      customers.map((c: any) => (
                        <tr key={c._id}>
                          <td>{c.fullName}</td>
                          <td>{c.email}</td>
                          <td>{c.paymentCurrency}</td>
                          <td>{c.amount}</td>
                          <td>{c.bank?.accountLabel || c.bank?.accountName || "—"}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => window.open(c.screenshotUrl, "_blank")}
                            >
                              View
                            </button>
                          </td>
                          <td>
                            {new Date(c.createdAt).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => approveCustomer(c._id)}
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteCustomer(c._id)}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center py-4 text-muted">
                          No submissions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ADD BANK MODAL */}
      {showBankModal && (
        <Modal title="Add Bank Account" onClose={() => setShowBankModal(false)}>
          <div className="mb-3">
            <label className="form-label text-uppercase small fw-semibold text-dark">Bank / Account Label</label>
            <input
              className="form-control"
              placeholder="e.g. Tide Bank — GBP"
              value={bankForm.accountLabel}
              onChange={(e) => setBankForm({ ...bankForm, accountLabel: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-dark text-uppercase small fw-semibold">Account Name</label>
            <input
              className="form-control"
              placeholder="e.g. Global Traders Ltd"
              value={bankForm.accountName}
              onChange={(e) => setBankForm({ ...bankForm, accountName: e.target.value })}
            />
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label text-dark text-uppercase small fw-semibold">Sort Code</label>
              <input
                className="form-control"
                placeholder="XX-XX-XX"
                value={bankForm.sortCode}
                onChange={(e) => setBankForm({ ...bankForm, sortCode: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-dark text-uppercase small fw-semibold">Account Number</label>
              <input
                className="form-control"
                placeholder="XXXXXXXX"
                value={bankForm.accountNumber}
                onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
              />
            </div>
          </div>
          <div className="p-3 mb-4 text-dark rounded border bg-light">
            <div className="fw-semibold text-dark mb-2">💡 Payment Range (optional)</div>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label text-uppercase small">Min Amount (£)</label>
                <input
                  className="form-control"
                  placeholder="0"
                  value={bankForm.minLimit}
                  onChange={(e) => setBankForm({ ...bankForm, minLimit: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-uppercase small">Max Amount (£)</label>
                <input
                  className="form-control"
                  placeholder="9999"
                  value={bankForm.maxLimit}
                  onChange={(e) => setBankForm({ ...bankForm, maxLimit: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-outline-secondary" onClick={() => setShowBankModal(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={addBank}>Add Account</button>
          </div>
        </Modal>
      )}

      {/* DELETE BANK MODAL */}
      {showDeleteBankModal && (
        <Modal title="Delete Bank" onClose={() => setShowDeleteBankModal(false)}>
          {banks.length === 0 ? (
            <p className="text-muted text-center py-3">No banks found.</p>
          ) : (
            <div className="d-flex flex-column gap-2">
              {banks.map((b: any) => (
                <div
                  key={b._id}
                  className="d-flex justify-content-between align-items-center border rounded px-3 py-2"
                >
                  <div>
                    <div className="fw-semibold text-dark">{b.accountLabel}</div>
                    <div className="text-muted small">{b.accountName} — {b.accountNumber}</div>
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    disabled={deletingBankId === b._id}
                    onClick={() => deleteBank(b._id)}
                  >
                    {deletingBankId === b._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-outline-secondary" onClick={() => setShowDeleteBankModal(false)}>
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* EDIT BANK MODAL — step 1: select bank */}
      {showEditBankModal && !editingBank && (
        <Modal title="Edit Bank — Select" onClose={() => setShowEditBankModal(false)}>
          {banks.length === 0 ? (
            <p className="text-muted text-center py-3">No banks found.</p>
          ) : (
            <div className="d-flex flex-column gap-2">
              {banks.map((b: any) => (
                <div
                  key={b._id}
                  className="d-flex justify-content-between align-items-center border rounded px-3 py-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => openEditBank(b)}
                >
                  <div>
                    <div className="fw-semibold text-dark">{b.accountLabel}</div>
                    <div className="text-muted small">{b.accountName} — {b.accountNumber}</div>
                  </div>
                  <span className="text-muted small">Edit ›</span>
                </div>
              ))}
            </div>
          )}
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-outline-secondary" onClick={() => setShowEditBankModal(false)}>
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* EDIT BANK MODAL — step 2: edit form */}
      {showEditBankModal && editingBank && (
        <Modal title={`Edit — ${editingBank.accountLabel}`} onClose={() => { setShowEditBankModal(false); setEditingBank(null); }}>
          <div className="mb-3">
            <label className="form-label text-uppercase small fw-semibold text-dark">Bank / Account Label</label>
            <input
              className="form-control"
              value={editForm.accountLabel}
              onChange={(e) => setEditForm({ ...editForm, accountLabel: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-dark text-uppercase small fw-semibold">Account Name</label>
            <input
              className="form-control"
              value={editForm.accountName}
              onChange={(e) => setEditForm({ ...editForm, accountName: e.target.value })}
            />
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label text-dark text-uppercase small fw-semibold">Sort Code</label>
              <input
                className="form-control"
                value={editForm.sortCode}
                onChange={(e) => setEditForm({ ...editForm, sortCode: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-dark text-uppercase small fw-semibold">Account Number</label>
              <input
                className="form-control"
                value={editForm.accountNumber}
                onChange={(e) => setEditForm({ ...editForm, accountNumber: e.target.value })}
              />
            </div>
          </div>
          <div className="p-3 mb-4 text-dark rounded border bg-light">
            <div className="fw-semibold text-dark mb-2">💡 Payment Range</div>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label text-uppercase small">Min Amount (£)</label>
                <input
                  className="form-control"
                  value={editForm.minLimit}
                  onChange={(e) => setEditForm({ ...editForm, minLimit: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label text-uppercase small">Max Amount (£)</label>
                <input
                  className="form-control"
                  value={editForm.maxLimit}
                  onChange={(e) => setEditForm({ ...editForm, maxLimit: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-outline-secondary"
              onClick={() => { setEditingBank(null); }}
            >
              ← Back
            </button>
            <button
              className="btn btn-primary"
              disabled={savingEdit}
              onClick={saveEditBank}
            >
              {savingEdit ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </Modal>
      )}

      {/* ADD ADMIN MODAL */}
      {showAdminModal && role === "superadmin" && (
        <Modal title="Add Admin" onClose={() => setShowAdminModal(false)}>
          <input
            className="form-control mb-3"
            placeholder="Username"
            value={adminForm.username}
            onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
          />
          <input
            className="form-control mb-4"
            type="password"
            minLength={8}
            required
            placeholder="Password"
            value={adminForm.password}
            onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
          />
          <button className="btn btn-success w-100" onClick={addAdmin}>
            Create Admin
          </button>
        </Modal>
      )}

      {/* DELETE ADMIN MODAL */}
      {showDeleteAdminModal && role === "superadmin" && (
        <Modal title="Delete Admin" onClose={() => setShowDeleteAdminModal(false)}>
          {admins.length === 0 ? (
            <p className="text-muted text-center py-3">No other admins found.</p>
          ) : (
            <div className="d-flex flex-column gap-2">
              {admins.map((a: any) => (
                <div
                  key={a._id}
                  className="d-flex justify-content-between align-items-center border rounded px-3 py-2"
                >
                  <div>
                    <div className="fw-semibold text-dark">{a.username}</div>
                    <div className="text-muted small">{a.role}</div>
                  </div>
                  <button
                    className="btn btn-sm btn-danger"
                    disabled={deletingAdminId === a._id}
                    onClick={() => deleteAdmin(a._id)}
                  >
                    {deletingAdminId === a._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-outline-secondary" onClick={() => setShowDeleteAdminModal(false)}>
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ---------------- MODAL COMPONENT ----------------
function Modal({ title, children, onClose }: any) {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1050 }}
    >
      <div className="bg-white p-4 shadow" style={{ width: "420px", borderRadius: "16px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="m-0 fw-bold">{title}</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        {children}
      </div>
    </div>
  );
}










