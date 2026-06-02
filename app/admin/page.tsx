
// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// const adminStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Lato:wght@300;400;600&display=swap');

//   :root {
//     --navy:    #1C2B3A;
//     --navy2:   #243447;
//     --navy3:   #1a2535;
//     --cream:   #F5F0E8;
//     --cream2:  #EDE7D9;
//     --orange:  #C0622F;
//     --white:   #FFFFFF;
//     --muted:   rgba(255,255,255,0.5);
//     --border:  rgba(255,255,255,0.1);
//     --border2: rgba(255,255,255,0.07);
//   }

//   /* ---- BASE ---- */
//   .adm-root {
//     background: var(--navy);
//     min-height: 100vh;
//     font-family: 'Lato', sans-serif;
//     color: var(--white);
//   }

//   /* ---- LOGIN ---- */
//   .adm-login-page {
//     background: var(--navy);
//     min-height: 100vh;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-family: 'Lato', sans-serif;
//   }
//   .adm-login-card {
//     background: var(--navy2);
//     border: 1px solid var(--border);
//     border-radius: 6px;
//     padding: 48px 40px;
//     width: 380px;
//     box-shadow: 0 8px 48px rgba(0,0,0,0.4);
//   }
//   .adm-login-eyebrow {
//     font-size: 10px;
//     font-weight: 700;
//     letter-spacing: 0.16em;
//     text-transform: uppercase;
//     color: var(--orange);
//     margin-bottom: 6px;
//     display: block;
//   }
//   .adm-login-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 24px;
//     font-weight: 600;
//     color: var(--white);
//     margin: 0 0 6px;
//   }
//   .adm-login-sub {
//     font-size: 13px;
//     color: var(--muted);
//     margin-bottom: 28px;
//   }
//   .adm-input {
//     width: 100%;
//     padding: 11px 14px;
//     background: rgba(0,0,0,0.25);
//     border: 1px solid var(--border);
//     border-radius: 3px;
//     color: var(--white);
//     font-family: 'Lato', sans-serif;
//     font-size: 14px;
//     margin-bottom: 12px;
//     outline: none;
//     transition: border-color 0.2s;
//     box-sizing: border-box;
//   }
//   .adm-input::placeholder { color: var(--muted); }
//   .adm-input:focus { border-color: var(--orange); }

//   /* ---- TOPBAR ---- */
//   .adm-topbar {
//     background: var(--cream);
//     border-bottom: 1px solid var(--cream2);
//     padding: 14px 32px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     flex-wrap: wrap;
//     gap: 10px;
//   }
//   .adm-topbar-brand {
//     font-family: 'Playfair Display', serif;
//     font-size: 18px;
//     font-weight: 600;
//     color: var(--navy);
//     letter-spacing: 0.04em;
//   }
//   .adm-topbar-sub {
//     font-size: 12px;
//     color: #9a8e7e;
//     margin-left: 8px;
//     font-weight: 400;
//     font-family: 'Lato', sans-serif;
//   }
//   .adm-topbar-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

//   /* ---- TABBAR ---- */
//   .adm-tabbar {
//     background: var(--navy2);
//     border-bottom: 1px solid var(--border);
//     padding: 0 32px;
//     display: flex;
//     gap: 0;
//   }
//   .adm-tab {
//     background: none;
//     border: none;
//     border-bottom: 2px solid transparent;
//     padding: 14px 20px;
//     font-family: 'Lato', sans-serif;
//     font-size: 13px;
//     font-weight: 600;
//     letter-spacing: 0.06em;
//     text-transform: uppercase;
//     color: var(--muted);
//     cursor: pointer;
//     transition: color 0.2s, border-color 0.2s;
//   }
//   .adm-tab:hover { color: var(--white); }
//   .adm-tab-active { color: var(--white) !important; border-bottom-color: var(--orange) !important; }

//   /* ---- CONTENT ---- */
//   .adm-content { padding: 32px; }

//   .adm-page-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 22px;
//     font-weight: 600;
//     color: var(--white);
//     margin: 0 0 4px;
//   }
//   .adm-page-sub { font-size: 13px; color: var(--muted); margin: 0; }

//   /* ---- TABLE ---- */
//   .adm-table-wrap {
//     background: var(--navy2);
//     border: 1px solid var(--border);
//     border-radius: 6px;
//     overflow: hidden;
//   }
//   .adm-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-family: 'Lato', sans-serif;
//   }
//   .adm-table thead tr {
//     background: rgba(0,0,0,0.25);
//     border-bottom: 1px solid var(--border);
//   }
//   .adm-table th {
//     padding: 12px 16px;
//     font-size: 10px;
//     font-weight: 700;
//     letter-spacing: 0.12em;
//     text-transform: uppercase;
//     color: var(--muted);
//     text-align: left;
//     white-space: nowrap;
//   }
//   .adm-table td {
//     padding: 13px 16px;
//     font-size: 13px;
//     color: rgba(255,255,255,0.85);
//     border-bottom: 1px solid var(--border2);
//   }
//   .adm-table tbody tr:last-child td { border-bottom: none; }
//   .adm-table tbody tr:hover { background: rgba(255,255,255,0.03); }
//   .adm-empty { text-align: center; padding: 40px !important; color: var(--muted) !important; }

//   /* ---- BUTTONS ---- */
//   .adm-btn {
//     background: var(--orange);
//     color: #fff;
//     border: none;
//     border-radius: 3px;
//     padding: 10px 20px;
//     font-family: 'Lato', sans-serif;
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 0.12em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: background 0.2s;
//     white-space: nowrap;
//   }
//   .adm-btn:hover:not(:disabled) { background: #a8531f; }
//   .adm-btn:disabled { opacity: 0.5; cursor: not-allowed; }

//   .adm-btn-outline {
//     background: none;
//     color: var(--white);
//     border: 1px solid var(--border);
//     border-radius: 3px;
//     padding: 9px 16px;
//     font-family: 'Lato', sans-serif;
//     font-size: 11px;
//     font-weight: 600;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: border-color 0.2s, color 0.2s;
//     white-space: nowrap;
//   }
//   .adm-btn-outline:hover { border-color: rgba(255,255,255,0.4); }

//   .adm-btn-danger {
//     background: rgba(220,53,69,0.15);
//     color: #ff6b7a;
//     border: 1px solid rgba(220,53,69,0.3);
//     border-radius: 3px;
//     padding: 6px 14px;
//     font-family: 'Lato', sans-serif;
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 0.08em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: background 0.2s;
//     white-space: nowrap;
//   }
//   .adm-btn-danger:hover:not(:disabled) { background: rgba(220,53,69,0.3); }
//   .adm-btn-danger:disabled { opacity: 0.4; cursor: not-allowed; }

//   .adm-btn-success {
//     background: rgba(25,135,84,0.2);
//     color: #5dd99b;
//     border: 1px solid rgba(25,135,84,0.35);
//     border-radius: 3px;
//     padding: 6px 14px;
//     font-family: 'Lato', sans-serif;
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 0.08em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: background 0.2s;
//     white-space: nowrap;
//   }
//   .adm-btn-success:hover { background: rgba(25,135,84,0.35); }

//   .adm-btn-view {
//     background: none;
//     color: var(--muted);
//     border: 1px solid var(--border);
//     border-radius: 3px;
//     padding: 5px 12px;
//     font-family: 'Lato', sans-serif;
//     font-size: 11px;
//     cursor: pointer;
//     transition: all 0.15s;
//   }
//   .adm-btn-view:hover { border-color: rgba(255,255,255,0.35); color: var(--white); }

//   /* Status badge */
//   .adm-status-on {
//     background: rgba(25,135,84,0.2);
//     color: #5dd99b;
//     border: 1px solid rgba(25,135,84,0.35);
//     border-radius: 3px;
//     padding: 4px 12px;
//     font-size: 10px;
//     font-weight: 700;
//     letter-spacing: 0.1em;
//     cursor: pointer;
//     transition: background 0.2s;
//     font-family: 'Lato', sans-serif;
//   }
//   .adm-status-off {
//     background: rgba(255,255,255,0.07);
//     color: var(--muted);
//     border: 1px solid var(--border);
//     border-radius: 3px;
//     padding: 4px 12px;
//     font-size: 10px;
//     font-weight: 700;
//     letter-spacing: 0.1em;
//     cursor: pointer;
//     transition: background 0.2s;
//     font-family: 'Lato', sans-serif;
//   }

//   /* ---- DROPDOWN ---- */
//   .adm-dropdown-wrap { position: relative; }
//   .adm-dropdown-menu {
//     position: absolute;
//     right: 0;
//     top: calc(100% + 6px);
//     background: var(--navy2);
//     border: 1px solid var(--border);
//     border-radius: 4px;
//     box-shadow: 0 8px 32px rgba(0,0,0,0.5);
//     min-width: 170px;
//     z-index: 2000;
//     overflow: hidden;
//   }
//   .adm-dropdown-item {
//     display: block;
//     width: 100%;
//     background: none;
//     border: none;
//     padding: 11px 16px;
//     font-family: 'Lato', sans-serif;
//     font-size: 13px;
//     color: rgba(255,255,255,0.85);
//     text-align: left;
//     cursor: pointer;
//     transition: background 0.15s;
//   }
//   .adm-dropdown-item:hover { background: rgba(255,255,255,0.06); }
//   .adm-dropdown-item-danger { color: #ff6b7a !important; }
//   .adm-dropdown-divider { border: none; border-top: 1px solid var(--border); margin: 0; }

//   /* ---- MODAL ---- */
//   .adm-modal-overlay {
//     position: fixed;
//     top: 0; left: 0;
//     width: 100%; height: 100%;
//     background: rgba(0,0,0,0.7);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     z-index: 1050;
//     padding: 16px;
//     box-sizing: border-box;
//   }
//   .adm-modal {
//     background: var(--navy2);
//     border: 1px solid var(--border);
//     border-radius: 6px;
//     width: 440px;
//     max-width: 100%;
//     max-height: 90vh;
//     overflow-y: auto;
//     box-shadow: 0 16px 64px rgba(0,0,0,0.6);
//   }
//   .adm-modal-header {
//     background: var(--cream);
//     padding: 20px 24px 18px;
//     border-bottom: 1px solid var(--cream2);
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }
//   .adm-modal-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 17px;
//     font-weight: 600;
//     color: var(--navy);
//     margin: 0;
//   }
//   .adm-modal-close {
//     background: none;
//     border: none;
//     font-size: 20px;
//     color: #9a8e7e;
//     cursor: pointer;
//     padding: 0;
//     line-height: 1;
//     transition: color 0.15s;
//   }
//   .adm-modal-close:hover { color: var(--navy); }
//   .adm-modal-body { padding: 24px; }

//   /* Modal form elements */
//   .adm-label {
//     display: block;
//     font-size: 10px;
//     font-weight: 700;
//     letter-spacing: 0.12em;
//     text-transform: uppercase;
//     color: var(--muted);
//     margin-bottom: 6px;
//   }
//   .adm-modal-input {
//     width: 100%;
//     padding: 10px 13px;
//     background: rgba(0,0,0,0.3);
//     border: 1px solid var(--border);
//     border-radius: 3px;
//     color: var(--white);
//     font-family: 'Lato', sans-serif;
//     font-size: 13px;
//     outline: none;
//     transition: border-color 0.2s;
//     box-sizing: border-box;
//     margin-bottom: 14px;
//   }
//   .adm-modal-input::placeholder { color: var(--muted); }
//   .adm-modal-input:focus { border-color: var(--orange); }

//   .adm-range-box {
//     background: rgba(0,0,0,0.2);
//     border: 1px solid var(--border);
//     border-radius: 4px;
//     padding: 16px;
//     margin-bottom: 16px;
//   }
//   .adm-range-title {
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     color: var(--orange);
//     margin-bottom: 12px;
//   }

//   /* Modal bank list item */
//   .adm-bank-list-item {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     border: 1px solid var(--border);
//     border-radius: 4px;
//     padding: 12px 14px;
//     margin-bottom: 8px;
//     background: rgba(0,0,0,0.15);
//     cursor: pointer;
//     transition: border-color 0.15s;
//   }
//   .adm-bank-list-item:hover { border-color: rgba(255,255,255,0.25); }
//   .adm-bank-list-name { font-size: 13px; font-weight: 600; color: var(--white); margin-bottom: 2px; }
//   .adm-bank-list-sub { font-size: 11px; color: var(--muted); }

//   .adm-modal-footer {
//     display: flex;
//     justify-content: flex-end;
//     gap: 8px;
//     margin-top: 20px;
//   }

//   /* Logout button in topbar */
//   .adm-logout-btn {
//     background: rgba(220,53,69,0.15);
//     color: #ff6b7a;
//     border: 1px solid rgba(220,53,69,0.3);
//     border-radius: 3px;
//     padding: 7px 16px;
//     font-family: 'Lato', sans-serif;
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: background 0.2s;
//   }
//   .adm-logout-btn:hover { background: rgba(220,53,69,0.28); }

//   /* Login btn */
//   .adm-login-btn {
//     width: 100%;
//     background: var(--orange);
//     color: #fff;
//     border: none;
//     border-radius: 3px;
//     padding: 13px;
//     font-family: 'Lato', sans-serif;
//     font-size: 12px;
//     font-weight: 700;
//     letter-spacing: 0.14em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: background 0.2s;
//     margin-top: 4px;
//   }
//   .adm-login-btn:hover:not(:disabled) { background: #a8531f; }
//   .adm-login-btn:disabled { opacity: 0.5; cursor: not-allowed; }

//   /* Topbar manage admin btn */
//   .adm-manage-btn {
//     background: none;
//     border: 1px solid rgba(28,43,58,0.25);
//     border-radius: 3px;
//     padding: 7px 14px;
//     font-family: 'Lato', sans-serif;
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     color: var(--navy);
//     cursor: pointer;
//     transition: border-color 0.2s;
//     white-space: nowrap;
//   }
//   .adm-manage-btn:hover { border-color: var(--navy); }

//   /* Topbar manage dropdown (on cream bg) */
//   .adm-topbar-dropdown {
//     position: absolute;
//     right: 0;
//     top: calc(100% + 6px);
//     background: var(--white);
//     border: 1px solid var(--cream2);
//     border-radius: 4px;
//     box-shadow: 0 8px 32px rgba(28,43,58,0.15);
//     min-width: 160px;
//     z-index: 2000;
//     overflow: hidden;
//   }
//   .adm-topbar-dropdown-item {
//     display: block;
//     width: 100%;
//     background: none;
//     border: none;
//     padding: 11px 16px;
//     font-family: 'Lato', sans-serif;
//     font-size: 13px;
//     color: var(--navy);
//     text-align: left;
//     cursor: pointer;
//     transition: background 0.15s;
//   }
//   .adm-topbar-dropdown-item:hover { background: var(--cream); }
//   .adm-topbar-dropdown-item-danger { color: #c0392b !important; }
//   .adm-topbar-divider { border: none; border-top: 1px solid var(--cream2); margin: 0; }

//   /* ---- RESPONSIVE ---- */
//   @media (max-width: 480px) {
//     .adm-topbar {
//       padding: 12px 16px;
//     }
//     .adm-topbar-brand {
//       font-size: 15px;
//     }
//     .adm-manage-btn {
//       padding: 6px 10px;
//       font-size: 10px;
//       letter-spacing: 0.06em;
//     }
//     .adm-logout-btn {
//       padding: 6px 10px;
//       font-size: 10px;
//       letter-spacing: 0.06em;
//     }
//     .adm-tabbar {
//       padding: 0 16px;
//     }
//     .adm-tab {
//       padding: 12px 12px;
//       font-size: 11px;
//     }
//     .adm-content {
//       padding: 16px;
//     }
//     .adm-login-card {
//       width: 100%;
//       padding: 36px 24px;
//     }
//   }
// `;


// export default function AdminPage() {
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   const [savingAdminEdit, setSavingAdminEdit] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [role, setRole] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [activeTab, setActiveTab] = useState<"banks" | "submission">("banks");
//   const [banks, setBanks] = useState<any[]>([]);
//   const [customers, setCustomers] = useState<any[]>([]);
//   const [showBankModal, setShowBankModal] = useState(false);
//   const [showAdminModal, setShowAdminModal] = useState(false);
//   const [showDeleteAdminModal, setShowDeleteAdminModal] = useState(false);
//   const [showManageDropdown, setShowManageDropdown] = useState(false);
//   const [showManageBanksDropdown, setShowManageBanksDropdown] = useState(false);
//   const [showDeleteBankModal, setShowDeleteBankModal] = useState(false);
//   const [showEditBankModal, setShowEditBankModal] = useState(false);
//   const [deletingBankId, setDeletingBankId] = useState<string | null>(null);
//   const [editingBank, setEditingBank] = useState<any | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [admins, setAdmins] = useState<any[]>([]);
//   const [deletingAdminId, setDeletingAdminId] = useState<string | null>(null);
//   const [togglingBankId, setTogglingBankId] = useState<string | null>(null);
//   const [savingEdit, setSavingEdit] = useState(false);

//   // Settings state
//   const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
//   const [showSettingsModal, setShowSettingsModal] = useState(false);
//   const [settingsForm, setSettingsForm] = useState({ username: "", password: "" });
//   const [savingSettings, setSavingSettings] = useState(false);

//   // Spreadsheet state
//   const [showSpreadsheetModal, setShowSpreadsheetModal] = useState(false);
//   const [spreadsheetId, setSpreadsheetId] = useState("");
//   const [savingSpreadsheet, setSavingSpreadsheet] = useState(false);

//   const [bankForm, setBankForm] = useState({
//     accountLabel: "", accountName: "", maxLimit: "", minLimit: "", sortCode: "", accountNumber: "",
//   });

//   // ✅ UPDATED: editForm now includes all bank fields
//   const [editForm, setEditForm] = useState({
//     accountLabel: "", accountName: "", maxLimit: "", minLimit: "",
//     sortCode: "", accountNumber: "", totalReceived: "", totalPending: "", status: "on",
//   });

//   const [adminForm, setAdminForm] = useState({ username: "", password: "" });

//   const getToken = () => localStorage.getItem("token");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const savedRole = localStorage.getItem("adminRole");
//     if (token) { setLoggedIn(true); setRole(savedRole || "admin"); fetchBanks(); fetchCustomers(); }
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = () => {
//       setShowManageDropdown(false);
//       setShowManageBanksDropdown(false);
//       setShowSettingsDropdown(false);
//     };
//     if (showManageDropdown || showManageBanksDropdown || showSettingsDropdown)
//       document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [showManageDropdown, showManageBanksDropdown, showSettingsDropdown]);

//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.post(`${API_URL}/admin/login`, { username, password });
//       if (res.data.success) {
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("adminRole", res.data.role);
//         setLoggedIn(true); setRole(res.data.role); fetchBanks(); fetchCustomers();
//       }
//     } catch (error: any) {
//       alert(error?.response?.data?.message || "Invalid username or password");
//       setUsername(""); setPassword("");
//     } finally { setLoading(false); }
//   };

//   const handleKeyDown = (e: any) => { if (e.key === "Enter") handleLogin(); };

//   const logout = () => {
//     localStorage.removeItem("token"); localStorage.removeItem("adminRole");
//     setLoggedIn(false); setRole(""); setUsername(""); setPassword("");
//   };

//   const fetchBanks = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/banks/view-banks`, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setBanks(res.data.data || []);
//     } catch (error: any) { console.log(error); if (error?.response?.status === 401) logout(); }
//   };

//   const fetchCustomers = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/customer/all`, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setCustomers(res.data.data || []);
//     } catch (error: any) { console.log(error); if (error?.response?.status === 401) logout(); }
//   };

//   const fetchAdmins = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/admin/all`, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setAdmins(res.data.data || []);
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to fetch admins"); }
//   };

//   const deleteAdmin = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this admin? This cannot be undone.")) return;
//     try {
//       setDeletingAdminId(id);
//       await axios.delete(`${API_URL}/admin/delete/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setAdmins((prev) => prev.filter((a) => a._id !== id));
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to delete admin"); }
//     finally { setDeletingAdminId(null); }
//   };

//   const toggleBankStatus = async (id: string) => {
//     try {
//       setTogglingBankId(id);
//       const res = await axios.patch(`${API_URL}/banks/toggle-status/${id}`, {}, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setBanks((prev) => prev.map((b) => b._id === id ? { ...b, status: res.data.data.status } : b));
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to toggle bank status"); }
//     finally { setTogglingBankId(null); }
//   };

//   const deleteBank = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this bank?")) return;
//     try {
//       setDeletingBankId(id);
//       await axios.delete(`${API_URL}/banks/remove/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setBanks((prev) => prev.filter((b) => b._id !== id));
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to delete bank"); }
//     finally { setDeletingBankId(null); }
//   };

//   // ✅ UPDATED: populates all fields including totalReceived, totalPending, status
//   const openEditBank = (bank: any) => {
//     setEditingBank(bank);
//     setEditForm({
//       accountLabel: bank.accountLabel,
//       accountName: bank.accountName,
//       maxLimit: String(bank.maxLimit),
//       minLimit: String(bank.minLimit),
//       sortCode: bank.sortCode,
//       accountNumber: bank.accountNumber,
//       totalReceived: String(bank.totalReceived ?? 0),
//       totalPending: String(bank.totalPending ?? 0),
//       status: bank.status ?? "on",
//     });
//     setShowEditBankModal(true);
//   };

//   // ✅ UPDATED: sends all fields including totalReceived, totalPending, status
//   const saveEditBank = async () => {
//     if (!editingBank) return;
//     try {
//       setSavingEdit(true);
//       const res = await axios.put(
//         `${API_URL}/banks/edit/${editingBank._id}`,
//         {
//           ...editForm,
//           maxLimit: Number(editForm.maxLimit),
//           minLimit: Number(editForm.minLimit),
//           totalReceived: Number(editForm.totalReceived),
//           totalPending: Number(editForm.totalPending),
//         },
//         { headers: { Authorization: `Bearer ${getToken()}` } }
//       );
//       setBanks((prev) => prev.map((b) => b._id === editingBank._id ? res.data.data : b));
//       setShowEditBankModal(false); setEditingBank(null);
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to update bank"); }
//     finally { setSavingEdit(false); }
//   };

//   const approveAllCustomers = async () => {
//     if (!confirm("Approve all customers? This cannot be undone.")) return;
//     try {
//       await axios.post(`${API_URL}/customer/approve-all`, {}, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setCustomers([]);
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to approve all customers"); }
//   };

//   const approveCustomer = async (id: string) => {
//     if (!confirm("Approve this customer?")) return;
//     try {
//       await axios.post(`${API_URL}/customer/approve/${id}`, {}, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setCustomers((prev) => prev.filter((c) => c._id !== id));
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to approve customer"); }
//   };

//   const deleteCustomer = async (id: string) => {
//     if (!confirm("Are you sure you want to reject and delete this customer?")) return;
//     try {
//       await axios.delete(`${API_URL}/customer/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setCustomers((prev) => prev.filter((c) => c._id !== id));
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to delete customer"); }
//   };

//   const addBank = async () => {
//     try {
//       await axios.post(`${API_URL}/banks/add`, { ...bankForm, maxLimit: Number(bankForm.maxLimit), minLimit: Number(bankForm.minLimit) }, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setShowBankModal(false);
//       setBankForm({ accountLabel: "", accountName: "", maxLimit: "", minLimit: "", sortCode: "", accountNumber: "" });
//       fetchBanks();
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to add bank"); }
//   };

//   const addAdmin = async () => {
//     try {
//       await axios.post(`${API_URL}/admin/create-new`, adminForm, { headers: { Authorization: `Bearer ${getToken()}` } });
//       alert("Admin created successfully");
//       setShowAdminModal(false); setAdminForm({ username: "", password: "" });
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to create admin"); }
//   };

//   const editSelf = async () => {
//     if (!settingsForm.username && !settingsForm.password) {
//       alert("Provide at least a new username or password.");
//       return;
//     }
//     try {
//       setSavingSettings(true);
//       const payload: any = {};
//       if (settingsForm.username) payload.username = settingsForm.username;
//       if (settingsForm.password) payload.password = settingsForm.password;
//       await axios.patch(`${API_URL}/admin/edit-self`, payload, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       alert("Account updated. Please log in again.");
//       logout();
//     } catch (error: any) {
//       alert(error?.response?.data?.message || "Failed to update account");
//     } finally {
//       setSavingSettings(false);
//     }
//   };

//   const saveSpreadsheetId = async () => {
//     if (!spreadsheetId.trim()) { alert("Please enter a spreadsheet ID."); return; }
//     try {
//       setSavingSpreadsheet(true);
//       await axios.post(`${API_URL}/spreadsheet/change`, { googleSheetId: spreadsheetId.trim() }, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       alert("Spreadsheet ID updated successfully.");
//       setShowSpreadsheetModal(false);
//       setSpreadsheetId("");
//     } catch (error: any) {
//       alert(error?.response?.data?.message || "Failed to update spreadsheet ID");
//     } finally {
//       setSavingSpreadsheet(false);
//     }
//   };

//   // ---- LOGIN SCREEN ----
//   if (!loggedIn) {
//     return (
//       <>
//         <style>{adminStyles}</style>
//         <div className="adm-login-page">
//           <div className="adm-login-card">
//             <span className="adm-login-eyebrow">Admin Portal</span>
//             <h2 className="adm-login-title">Junior Layer</h2>
//             <p className="adm-login-sub">Sign in to your dashboard</p>
//             <input className="adm-input" placeholder="Username" value={username}
//               onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} />
//             <input className="adm-input" type="password" placeholder="Password" value={password}
//               onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
//             <button className="adm-login-btn" onClick={handleLogin} disabled={loading}>
//               {loading ? "Signing in…" : "Sign In"}
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   // ---- MAIN DASHBOARD ----
//   return (
//     <>
//       <style>{adminStyles}</style>
//       <div className="adm-root">

//         {/* TOPBAR */}
//         <div className="adm-topbar">
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <span className="adm-topbar-brand">ADMIN PORTAL</span>
//           </div>
//           <div className="adm-topbar-actions">
//             {role === "superadmin" && (
//               <div className="adm-dropdown-wrap">
//                 <button className="adm-manage-btn" onClick={(e) => { e.stopPropagation(); setShowManageDropdown((p) => !p); }}>
//                   Manage Admin ▾
//                 </button>
//                 {showManageDropdown && (
//                   <div className="adm-topbar-dropdown" onClick={(e) => e.stopPropagation()}>
//                     <button className="adm-topbar-dropdown-item" onClick={() => { setShowAdminModal(true); setShowManageDropdown(false); }}>
//                       ➕ Add Admin
//                     </button>
//                     <hr className="adm-topbar-divider" />
//                     <button className="adm-topbar-dropdown-item adm-topbar-dropdown-item-danger" onClick={() => { fetchAdmins(); setShowDeleteAdminModal(true); setShowManageDropdown(false); }}>
//                       🗑️ Delete Admin
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* SETTINGS DROPDOWN */}
//             <div className="adm-dropdown-wrap">
//               <button className="adm-manage-btn" onClick={(e) => { e.stopPropagation(); setShowSettingsDropdown((p) => !p); }}>
//                 ⚙️ Settings ▾
//               </button>
//               {showSettingsDropdown && (
//                 <div className="adm-topbar-dropdown" onClick={(e) => e.stopPropagation()}>
//                   <button className="adm-topbar-dropdown-item" onClick={() => { setSettingsForm({ username: "", password: "" }); setShowSettingsModal(true); setShowSettingsDropdown(false); }}>
//                     🔑 Change Credentials
//                   </button>
//                   <hr className="adm-topbar-divider" />
//                   <button className="adm-topbar-dropdown-item" onClick={() => { setSpreadsheetId(""); setShowSpreadsheetModal(true); setShowSettingsDropdown(false); }}>
//                     📊 Edit Spreadsheet ID
//                   </button>
//                 </div>
//               )}
//             </div>

//             <button className="adm-logout-btn" onClick={logout}>Logout</button>
//           </div>
//         </div>

//         {/* TABBAR */}
//         <div className="adm-tabbar">
//           <button className={`adm-tab ${activeTab === "banks" ? "adm-tab-active" : ""}`}
//             onClick={() => { setActiveTab("banks"); fetchBanks(); }}>Banks</button>
//           <button className={`adm-tab ${activeTab === "submission" ? "adm-tab-active" : ""}`}
//             onClick={() => { setActiveTab("submission"); fetchCustomers(); }}>Submissions</button>
//         </div>

//         {/* CONTENT */}
//         <div className="adm-content">

//           {/* BANKS TAB */}
//           {activeTab === "banks" && (
//             <>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
//                 <div>
//                   <h3 className="adm-page-title">Banks</h3>
//                   <p className="adm-page-sub">Manage all linked bank accounts</p>
//                 </div>
//                 <div className="adm-dropdown-wrap">
//                   <button className="adm-btn" onClick={(e) => { e.stopPropagation(); setShowManageBanksDropdown((p) => !p); }}>
//                     Manage Banks ▾
//                   </button>
//                   {showManageBanksDropdown && (
//                     <div className="adm-dropdown-menu" onClick={(e) => e.stopPropagation()}>
//                       <button className="adm-dropdown-item" onClick={() => { setShowBankModal(true); setShowManageBanksDropdown(false); }}>
//                         ➕ Add Bank
//                       </button>
//                       <hr className="adm-dropdown-divider" />
//                       <button className="adm-dropdown-item" onClick={() => { setShowEditBankModal(true); setEditingBank(null); setShowManageBanksDropdown(false); }}>
//                         ✏️ Edit Bank
//                       </button>
//                       <hr className="adm-dropdown-divider" />
//                       <button className="adm-dropdown-item adm-dropdown-item-danger" onClick={() => { setShowDeleteBankModal(true); setShowManageBanksDropdown(false); }}>
//                         🗑️ Delete Bank
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="adm-table-wrap">
//                 <div style={{ overflowX: "auto" }}>
//                   <table className="adm-table">
//                     <thead>
//                       <tr>
//                         {["Label","Name","Min","Max","Sort Code","Account","Total Received","Total Pending","Status"].map(h => (
//                           <th key={h}>{h}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {banks.length > 0 ? banks.map((b: any) => (
//                         <tr key={b._id}>
//                           <td>{b.accountLabel}</td>
//                           <td>{b.accountName}</td>
//                           <td>{b.minLimit}</td>
//                           <td>{b.maxLimit}</td>
//                           <td>{b.sortCode}</td>
//                           <td>{b.accountNumber}</td>
//                           <td>{b.totalReceived}</td>
//                           <td>{b.totalPending}</td>
//                           <td>
//                             <button
//                               className={b.status === "on" ? "adm-status-on" : "adm-status-off"}
//                               disabled={togglingBankId === b._id}
//                               onClick={() => toggleBankStatus(b._id)}
//                             >
//                               {togglingBankId === b._id ? "…" : b.status === "on" ? "ON" : "OFF"}
//                             </button>
//                           </td>
//                         </tr>
//                       )) : (
//                         <tr><td colSpan={9} className="adm-empty">No banks found</td></tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </>
//           )}

//           {/* SUBMISSIONS TAB */}
//           {activeTab === "submission" && (
//             <>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
//                 <div>
//                   <h3 className="adm-page-title">Submissions</h3>
//                   <p className="adm-page-sub">Review and manage customer payment submissions</p>
//                 </div>
//                 {customers.length > 0 && (
//                   <button className="adm-btn-success" style={{ padding: "10px 20px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }} onClick={approveAllCustomers}>
//                     ✓ Approve All
//                   </button>
//                 )}
//               </div>

//               <div className="adm-table-wrap">
//                 <div style={{ overflowX: "auto" }}>
//                   <table className="adm-table">
//                     <thead>
//                       <tr>
//                         {["Reference ID","Full Name","Email","Currency","Amount","Bank","Screenshot","Submitted At","Actions"].map(h => (
//                           <th key={h}>{h}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {customers.length > 0 ? customers.map((c: any) => (
//                         <tr key={c._id}>
//                           <td>{c.referenceId}</td>
//                           <td>{c.fullName}</td>
//                           <td>{c.email}</td>
//                           <td>{c.paymentCurrency}</td>
//                           <td>{c.amount}</td>
//                           <td>{c.bank?.accountLabel || c.bank?.accountName || "—"}</td>
//                           <td>
//                             <button className="adm-btn-view" onClick={() => window.open(c.screenshotUrl, "_blank")}>
//                               View
//                             </button>
//                           </td>
//                           <td style={{ whiteSpace: "nowrap" }}>
//                             {new Date(c.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
//                           </td>
//                           <td>
//                             <div style={{ display: "flex", gap: "6px" }}>
//                               <button className="adm-btn-success" onClick={() => approveCustomer(c._id)}>Approve</button>
//                               <button className="adm-btn-danger" onClick={() => deleteCustomer(c._id)}>Reject</button>
//                             </div>
//                           </td>
//                         </tr>
//                       )) : (
//                         <tr><td colSpan={9} className="adm-empty">No submissions found</td></tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         {/* ADD BANK MODAL */}
//         {showBankModal && (
//           <AdminModal title="Add Bank Account" onClose={() => setShowBankModal(false)}>
//             <label className="adm-label">Bank / Account Label</label>
//             <input className="adm-modal-input" placeholder="e.g. Tide Bank — GBP" value={bankForm.accountLabel}
//               onChange={(e) => setBankForm({ ...bankForm, accountLabel: e.target.value })} />
//             <label className="adm-label">Account Name</label>
//             <input className="adm-modal-input" placeholder="e.g. Global Traders Ltd" value={bankForm.accountName}
//               onChange={(e) => setBankForm({ ...bankForm, accountName: e.target.value })} />
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//               <div>
//                 <label className="adm-label">Sort Code</label>
//                 <input className="adm-modal-input" placeholder="XX-XX-XX" value={bankForm.sortCode}
//                   onChange={(e) => setBankForm({ ...bankForm, sortCode: e.target.value })} />
//               </div>
//               <div>
//                 <label className="adm-label">Account Number</label>
//                 <input className="adm-modal-input" placeholder="XXXXXXXX" value={bankForm.accountNumber}
//                   onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })} />
//               </div>
//             </div>
//             <div className="adm-range-box">
//               <div className="adm-range-title">💡 Payment Range (optional)</div>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//                 <div>
//                   <label className="adm-label">Min Amount (£)</label>
//                   <input className="adm-modal-input" placeholder="0" value={bankForm.minLimit}
//                     onChange={(e) => setBankForm({ ...bankForm, minLimit: e.target.value })} />
//                 </div>
//                 <div>
//                   <label className="adm-label">Max Amount (£)</label>
//                   <input className="adm-modal-input" placeholder="9999" value={bankForm.maxLimit}
//                     onChange={(e) => setBankForm({ ...bankForm, maxLimit: e.target.value })} />
//                 </div>
//               </div>
//             </div>
//             <div className="adm-modal-footer">
//               <button className="adm-btn-outline" onClick={() => setShowBankModal(false)}>Cancel</button>
//               <button className="adm-btn" onClick={addBank}>Add Account</button>
//             </div>
//           </AdminModal>
//         )}

//         {/* DELETE BANK MODAL */}
//         {showDeleteBankModal && (
//           <AdminModal title="Delete Bank" onClose={() => setShowDeleteBankModal(false)}>
//             {banks.length === 0 ? <p style={{ color: "var(--muted)", textAlign: "center", padding: "20px 0" }}>No banks found.</p> : (
//               banks.map((b: any) => (
//                 <div key={b._id} className="adm-bank-list-item" style={{ cursor: "default" }}>
//                   <div>
//                     <div className="adm-bank-list-name">{b.accountLabel}</div>
//                     <div className="adm-bank-list-sub">{b.accountName} — {b.accountNumber}</div>
//                   </div>
//                   <button className="adm-btn-danger" disabled={deletingBankId === b._id} onClick={() => deleteBank(b._id)}>
//                     {deletingBankId === b._id ? "Deleting…" : "Delete"}
//                   </button>
//                 </div>
//               ))
//             )}
//             <div className="adm-modal-footer">
//               <button className="adm-btn-outline" onClick={() => setShowDeleteBankModal(false)}>Close</button>
//             </div>
//           </AdminModal>
//         )}

//         {/* EDIT BANK — step 1: select */}
//         {showEditBankModal && !editingBank && (
//           <AdminModal title="Edit Bank — Select" onClose={() => setShowEditBankModal(false)}>
//             {banks.length === 0 ? <p style={{ color: "var(--muted)", textAlign: "center", padding: "20px 0" }}>No banks found.</p> : (
//               banks.map((b: any) => (
//                 <div key={b._id} className="adm-bank-list-item" onClick={() => openEditBank(b)}>
//                   <div>
//                     <div className="adm-bank-list-name">{b.accountLabel}</div>
//                     <div className="adm-bank-list-sub">{b.accountName} — {b.accountNumber}</div>
//                   </div>
//                   <span style={{ fontSize: "12px", color: "var(--muted)" }}>Edit ›</span>
//                 </div>
//               ))
//             )}
//             <div className="adm-modal-footer">
//               <button className="adm-btn-outline" onClick={() => setShowEditBankModal(false)}>Close</button>
//             </div>
//           </AdminModal>
//         )}

//         {/* EDIT BANK — step 2: form (✅ UPDATED with all fields) */}
//         {showEditBankModal && editingBank && (
//           <AdminModal title={`Edit — ${editingBank.accountLabel}`} onClose={() => { setShowEditBankModal(false); setEditingBank(null); }}>
//             <label className="adm-label">Bank / Account Label</label>
//             <input className="adm-modal-input" value={editForm.accountLabel}
//               onChange={(e) => setEditForm({ ...editForm, accountLabel: e.target.value })} />
//             <label className="adm-label">Account Name</label>
//             <input className="adm-modal-input" value={editForm.accountName}
//               onChange={(e) => setEditForm({ ...editForm, accountName: e.target.value })} />
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//               <div>
//                 <label className="adm-label">Sort Code</label>
//                 <input className="adm-modal-input" value={editForm.sortCode}
//                   onChange={(e) => setEditForm({ ...editForm, sortCode: e.target.value })} />
//               </div>
//               <div>
//                 <label className="adm-label">Account Number</label>
//                 <input className="adm-modal-input" value={editForm.accountNumber}
//                   onChange={(e) => setEditForm({ ...editForm, accountNumber: e.target.value })} />
//               </div>
//             </div>
//             <div className="adm-range-box">
//               <div className="adm-range-title">💡 Payment Range</div>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//                 <div>
//                   <label className="adm-label">Min Amount (£)</label>
//                   <input className="adm-modal-input" value={editForm.minLimit}
//                     onChange={(e) => setEditForm({ ...editForm, minLimit: e.target.value })} />
//                 </div>
//                 <div>
//                   <label className="adm-label">Max Amount (£)</label>
//                   <input className="adm-modal-input" value={editForm.maxLimit}
//                     onChange={(e) => setEditForm({ ...editForm, maxLimit: e.target.value })} />
//                 </div>
//               </div>
//             </div>
//             <div className="adm-range-box">
//               <div className="adm-range-title">📊 Totals</div>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//                 <div>
//                   <label className="adm-label">Total Received (£)</label>
//                   <input className="adm-modal-input" type="number" min="0" value={editForm.totalReceived}
//                     onChange={(e) => setEditForm({ ...editForm, totalReceived: e.target.value })} />
//                 </div>
//                 <div>
//                   <label className="adm-label">Total Pending (£)</label>
//                   <input className="adm-modal-input" type="number" min="0" value={editForm.totalPending}
//                     onChange={(e) => setEditForm({ ...editForm, totalPending: e.target.value })} />
//                 </div>
//               </div>
//             </div>
//             <label className="adm-label">Status</label>
//             <select
//               className="adm-modal-input"
//               value={editForm.status}
//               onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
//             >
//               <option value="on">ON</option>
//               <option value="off">OFF</option>
//             </select>
//             <div className="adm-modal-footer">
//               <button className="adm-btn-outline" onClick={() => setEditingBank(null)}>← Back</button>
//               <button className="adm-btn" disabled={savingEdit} onClick={saveEditBank}>
//                 {savingEdit ? "Saving…" : "Save Changes"}
//               </button>
//             </div>
//           </AdminModal>
//         )}

//         {/* ADD ADMIN MODAL */}
//         {showAdminModal && role === "superadmin" && (
//           <AdminModal title="Add Admin" onClose={() => setShowAdminModal(false)}>
//             <label className="adm-label">Username</label>
//             <input className="adm-modal-input" placeholder="Username" value={adminForm.username}
//               onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })} />
//             <label className="adm-label">Password</label>
//             <input className="adm-modal-input" type="password" minLength={8} placeholder="Password" value={adminForm.password}
//               onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })} />
//             <button className="adm-btn" style={{ width: "100%", marginTop: "4px" }} onClick={addAdmin}>
//               Create Admin
//             </button>
//           </AdminModal>
//         )}

//         {/* DELETE ADMIN MODAL */}
//         {showDeleteAdminModal && role === "superadmin" && (
//           <AdminModal title="Delete Admin" onClose={() => setShowDeleteAdminModal(false)}>
//             {admins.length === 0 ? <p style={{ color: "var(--muted)", textAlign: "center", padding: "20px 0" }}>No other admins found.</p> : (
//               admins.map((a: any) => (
//                 <div key={a._id} className="adm-bank-list-item" style={{ cursor: "default" }}>
//                   <div>
//                     <div className="adm-bank-list-name">{a.username}</div>
//                     <div className="adm-bank-list-sub">{a.role}</div>
//                   </div>
//                   <button className="adm-btn-danger" disabled={deletingAdminId === a._id} onClick={() => deleteAdmin(a._id)}>
//                     {deletingAdminId === a._id ? "Deleting…" : "Delete"}
//                   </button>
//                 </div>
//               ))
//             )}
//             <div className="adm-modal-footer">
//               <button className="adm-btn-outline" onClick={() => setShowDeleteAdminModal(false)}>Close</button>
//             </div>
//           </AdminModal>
//         )}

//         {/* CHANGE CREDENTIALS MODAL */}
//         {showSettingsModal && (
//           <AdminModal title="Account Settings" onClose={() => setShowSettingsModal(false)}>
//             <p style={{ fontSize: "12px", color: "var(--muted)", margin: "0 0 20px" }}>
//               Leave a field blank to keep it unchanged.
//             </p>
//             <label className="adm-label">New Username</label>
//             <input
//               className="adm-modal-input"
//               placeholder="Leave blank to keep unchanged"
//               value={settingsForm.username}
//               onChange={(e) => setSettingsForm({ ...settingsForm, username: e.target.value })}
//             />
//             <label className="adm-label">New Password</label>
//             <input
//               className="adm-modal-input"
//               type="password"
//               placeholder="Leave blank to keep unchanged"
//               value={settingsForm.password}
//               onChange={(e) => setSettingsForm({ ...settingsForm, password: e.target.value })}
//             />
//             <p style={{ fontSize: "11px", color: "var(--muted)", margin: "-8px 0 0" }}>
//               You will be logged out after saving so the new credentials take effect.
//             </p>
//             <div className="adm-modal-footer">
//               <button className="adm-btn-outline" onClick={() => setShowSettingsModal(false)}>Cancel</button>
//               <button className="adm-btn" disabled={savingSettings} onClick={editSelf}>
//                 {savingSettings ? "Saving…" : "Save Changes"}
//               </button>
//             </div>
//           </AdminModal>
//         )}

//         {/* EDIT SPREADSHEET ID MODAL */}
//         {showSpreadsheetModal && (
//           <AdminModal title="Edit Spreadsheet ID" onClose={() => setShowSpreadsheetModal(false)}>
//             <p style={{ fontSize: "12px", color: "var(--muted)", margin: "0 0 20px" }}>
//               Enter the new Google Spreadsheet ID below.
//             </p>
//             <label className="adm-label">Spreadsheet ID</label>
//             <input
//               className="adm-modal-input"
//               placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
//               value={spreadsheetId}
//               onChange={(e) => setSpreadsheetId(e.target.value)}
//             />
//             <div className="adm-modal-footer">
//               <button className="adm-btn-outline" onClick={() => setShowSpreadsheetModal(false)}>Cancel</button>
//               <button className="adm-btn" disabled={savingSpreadsheet} onClick={saveSpreadsheetId}>
//                 {savingSpreadsheet ? "Saving…" : "Save"}
//               </button>
//             </div>
//           </AdminModal>
//         )}

//       </div>
//     </>
//   );
// }

// function AdminModal({ title, children, onClose }: any) {
//   return (
//     <div className="adm-modal-overlay">
//       <div className="adm-modal">
//         <div className="adm-modal-header">
//           <h4 className="adm-modal-title">{title}</h4>
//           <button className="adm-modal-close" onClick={onClose}>×</button>
//         </div>
//         <div className="adm-modal-body">{children}</div>
//       </div>
//     </div>
//   );
// }

















































// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// const adminStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Lato:wght@300;400;600&display=swap');

//   :root {
//     --navy:    #1C2B3A;
//     --navy2:   #243447;
//     --navy3:   #1a2535;
//     --cream:   #F5F0E8;
//     --cream2:  #EDE7D9;
//     --orange:  #C0622F;
//     --white:   #FFFFFF;
//     --muted:   rgba(255,255,255,0.5);
//     --border:  rgba(255,255,255,0.1);
//     --border2: rgba(255,255,255,0.07);
//   }

//   /* ---- BASE ---- */
//   .adm-root {
//     background: var(--navy);
//     min-height: 100vh;
//     font-family: 'Lato', sans-serif;
//     color: var(--white);
//   }

//   /* ---- LOGIN ---- */
//   .adm-login-page {
//     background: var(--navy);
//     min-height: 100vh;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-family: 'Lato', sans-serif;
//   }
//   .adm-login-card {
//     background: var(--navy2);
//     border: 1px solid var(--border);
//     border-radius: 6px;
//     padding: 48px 40px;
//     width: 380px;
//     box-shadow: 0 8px 48px rgba(0,0,0,0.4);
//   }
//   .adm-login-eyebrow {
//     font-size: 10px;
//     font-weight: 700;
//     letter-spacing: 0.16em;
//     text-transform: uppercase;
//     color: var(--orange);
//     margin-bottom: 6px;
//     display: block;
//   }
//   .adm-login-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 24px;
//     font-weight: 600;
//     color: var(--white);
//     margin: 0 0 6px;
//   }
//   .adm-login-sub {
//     font-size: 13px;
//     color: var(--muted);
//     margin-bottom: 28px;
//   }
//   .adm-input {
//     width: 100%;
//     padding: 11px 14px;
//     background: rgba(0,0,0,0.25);
//     border: 1px solid var(--border);
//     border-radius: 3px;
//     color: var(--white);
//     font-family: 'Lato', sans-serif;
//     font-size: 14px;
//     margin-bottom: 12px;
//     outline: none;
//     transition: border-color 0.2s;
//     box-sizing: border-box;
//   }
//   .adm-input::placeholder { color: var(--muted); }
//   .adm-input:focus { border-color: var(--orange); }

//   /* ---- TOPBAR ---- */
//   .adm-topbar {
//     background: var(--cream);
//     border-bottom: 1px solid var(--cream2);
//     padding: 14px 32px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     flex-wrap: wrap;
//     gap: 10px;
//   }
//   .adm-topbar-brand {
//     font-family: 'Playfair Display', serif;
//     font-size: 18px;
//     font-weight: 600;
//     color: var(--navy);
//     letter-spacing: 0.04em;
//   }
//   .adm-topbar-sub {
//     font-size: 12px;
//     color: #9a8e7e;
//     margin-left: 8px;
//     font-weight: 400;
//     font-family: 'Lato', sans-serif;
//   }
//   .adm-topbar-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

//   /* ---- TABBAR ---- */
//   .adm-tabbar {
//     background: var(--navy2);
//     border-bottom: 1px solid var(--border);
//     padding: 0 32px;
//     display: flex;
//     gap: 0;
//   }
//   .adm-tab {
//     background: none;
//     border: none;
//     border-bottom: 2px solid transparent;
//     padding: 14px 20px;
//     font-family: 'Lato', sans-serif;
//     font-size: 13px;
//     font-weight: 600;
//     letter-spacing: 0.06em;
//     text-transform: uppercase;
//     color: var(--muted);
//     cursor: pointer;
//     transition: color 0.2s, border-color 0.2s;
//   }
//   .adm-tab:hover { color: var(--white); }
//   .adm-tab-active { color: var(--white) !important; border-bottom-color: var(--orange) !important; }

//   /* ---- CONTENT ---- */
//   .adm-content { padding: 32px; }

//   .adm-page-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 22px;
//     font-weight: 600;
//     color: var(--white);
//     margin: 0 0 4px;
//   }
//   .adm-page-sub { font-size: 13px; color: var(--muted); margin: 0; }

//   /* ---- TABLE ---- */
//   .adm-table-wrap {
//     background: var(--navy2);
//     border: 1px solid var(--border);
//     border-radius: 6px;
//     overflow: hidden;
//   }
//   .adm-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-family: 'Lato', sans-serif;
//   }
//   .adm-table thead tr {
//     background: rgba(0,0,0,0.25);
//     border-bottom: 1px solid var(--border);
//   }
//   .adm-table th {
//     padding: 12px 16px;
//     font-size: 10px;
//     font-weight: 700;
//     letter-spacing: 0.12em;
//     text-transform: uppercase;
//     color: var(--muted);
//     text-align: left;
//     white-space: nowrap;
//   }
//   .adm-table td {
//     padding: 13px 16px;
//     font-size: 13px;
//     color: rgba(255,255,255,0.85);
//     border-bottom: 1px solid var(--border2);
//   }
//   .adm-table tbody tr:last-child td { border-bottom: none; }
//   .adm-table tbody tr:hover { background: rgba(255,255,255,0.03); }
//   .adm-empty { text-align: center; padding: 40px !important; color: var(--muted) !important; }

//   /* ---- BUTTONS ---- */
//   .adm-btn {
//     background: var(--orange);
//     color: #fff;
//     border: none;
//     border-radius: 3px;
//     padding: 10px 20px;
//     font-family: 'Lato', sans-serif;
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 0.12em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: background 0.2s;
//     white-space: nowrap;
//   }
//   .adm-btn:hover:not(:disabled) { background: #a8531f; }
//   .adm-btn:disabled { opacity: 0.5; cursor: not-allowed; }

//   .adm-btn-outline {
//     background: none;
//     color: var(--white);
//     border: 1px solid var(--border);
//     border-radius: 3px;
//     padding: 9px 16px;
//     font-family: 'Lato', sans-serif;
//     font-size: 11px;
//     font-weight: 600;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: border-color 0.2s, color 0.2s;
//     white-space: nowrap;
//   }
//   .adm-btn-outline:hover { border-color: rgba(255,255,255,0.4); }

//   .adm-btn-danger {
//     background: rgba(220,53,69,0.15);
//     color: #ff6b7a;
//     border: 1px solid rgba(220,53,69,0.3);
//     border-radius: 3px;
//     padding: 6px 14px;
//     font-family: 'Lato', sans-serif;
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 0.08em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: background 0.2s;
//     white-space: nowrap;
//   }
//   .adm-btn-danger:hover:not(:disabled) { background: rgba(220,53,69,0.3); }
//   .adm-btn-danger:disabled { opacity: 0.4; cursor: not-allowed; }

//   .adm-btn-success {
//     background: rgba(25,135,84,0.2);
//     color: #5dd99b;
//     border: 1px solid rgba(25,135,84,0.35);
//     border-radius: 3px;
//     padding: 6px 14px;
//     font-family: 'Lato', sans-serif;
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 0.08em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: background 0.2s;
//     white-space: nowrap;
//   }
//   .adm-btn-success:hover { background: rgba(25,135,84,0.35); }

//   .adm-btn-view {
//     background: none;
//     color: var(--muted);
//     border: 1px solid var(--border);
//     border-radius: 3px;
//     padding: 5px 12px;
//     font-family: 'Lato', sans-serif;
//     font-size: 11px;
//     cursor: pointer;
//     transition: all 0.15s;
//   }
//   .adm-btn-view:hover { border-color: rgba(255,255,255,0.35); color: var(--white); }

//   /* Status badge */
//   .adm-status-on {
//     background: rgba(25,135,84,0.2);
//     color: #5dd99b;
//     border: 1px solid rgba(25,135,84,0.35);
//     border-radius: 3px;
//     padding: 4px 12px;
//     font-size: 10px;
//     font-weight: 700;
//     letter-spacing: 0.1em;
//     cursor: pointer;
//     transition: background 0.2s;
//     font-family: 'Lato', sans-serif;
//   }
//   .adm-status-off {
//     background: rgba(255,255,255,0.07);
//     color: var(--muted);
//     border: 1px solid var(--border);
//     border-radius: 3px;
//     padding: 4px 12px;
//     font-size: 10px;
//     font-weight: 700;
//     letter-spacing: 0.1em;
//     cursor: pointer;
//     transition: background 0.2s;
//     font-family: 'Lato', sans-serif;
//   }

//   /* ---- DROPDOWN ---- */
//   .adm-dropdown-wrap { position: relative; }
//   .adm-dropdown-menu {
//     position: absolute;
//     right: 0;
//     top: calc(100% + 6px);
//     background: var(--navy2);
//     border: 1px solid var(--border);
//     border-radius: 4px;
//     box-shadow: 0 8px 32px rgba(0,0,0,0.5);
//     min-width: 170px;
//     z-index: 2000;
//     overflow: hidden;
//   }
//   .adm-dropdown-item {
//     display: block;
//     width: 100%;
//     background: none;
//     border: none;
//     padding: 11px 16px;
//     font-family: 'Lato', sans-serif;
//     font-size: 13px;
//     color: rgba(255,255,255,0.85);
//     text-align: left;
//     cursor: pointer;
//     transition: background 0.15s;
//   }
//   .adm-dropdown-item:hover { background: rgba(255,255,255,0.06); }
//   .adm-dropdown-item-danger { color: #ff6b7a !important; }
//   .adm-dropdown-divider { border: none; border-top: 1px solid var(--border); margin: 0; }

//   /* ---- MODAL ---- */
//   .adm-modal-overlay {
//     position: fixed;
//     top: 0; left: 0;
//     width: 100%; height: 100%;
//     background: rgba(0,0,0,0.7);
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     z-index: 1050;
//     padding: 16px;
//     box-sizing: border-box;
//   }
//   .adm-modal {
//     background: var(--navy2);
//     border: 1px solid var(--border);
//     border-radius: 6px;
//     width: 440px;
//     max-width: 100%;
//     max-height: 90vh;
//     overflow-y: auto;
//     box-shadow: 0 16px 64px rgba(0,0,0,0.6);
//   }
//   .adm-modal-header {
//     background: var(--cream);
//     padding: 20px 24px 18px;
//     border-bottom: 1px solid var(--cream2);
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }
//   .adm-modal-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 17px;
//     font-weight: 600;
//     color: var(--navy);
//     margin: 0;
//   }
//   .adm-modal-close {
//     background: none;
//     border: none;
//     font-size: 20px;
//     color: #9a8e7e;
//     cursor: pointer;
//     padding: 0;
//     line-height: 1;
//     transition: color 0.15s;
//   }
//   .adm-modal-close:hover { color: var(--navy); }
//   .adm-modal-body { padding: 24px; }

//   /* Modal form elements */
//   .adm-label {
//     display: block;
//     font-size: 10px;
//     font-weight: 700;
//     letter-spacing: 0.12em;
//     text-transform: uppercase;
//     color: var(--muted);
//     margin-bottom: 6px;
//   }
//   .adm-modal-input {
//     width: 100%;
//     padding: 10px 13px;
//     background: rgba(0,0,0,0.3);
//     border: 1px solid var(--border);
//     border-radius: 3px;
//     color: var(--white);
//     font-family: 'Lato', sans-serif;
//     font-size: 13px;
//     outline: none;
//     transition: border-color 0.2s;
//     box-sizing: border-box;
//     margin-bottom: 14px;
//   }
//   .adm-modal-input::placeholder { color: var(--muted); }
//   .adm-modal-input:focus { border-color: var(--orange); }

//   .adm-range-box {
//     background: rgba(0,0,0,0.2);
//     border: 1px solid var(--border);
//     border-radius: 4px;
//     padding: 16px;
//     margin-bottom: 16px;
//   }
//   .adm-range-title {
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     color: var(--orange);
//     margin-bottom: 12px;
//   }

//   /* Modal bank list item */
//   .adm-bank-list-item {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     border: 1px solid var(--border);
//     border-radius: 4px;
//     padding: 12px 14px;
//     margin-bottom: 8px;
//     background: rgba(0,0,0,0.15);
//     cursor: pointer;
//     transition: border-color 0.15s;
//   }
//   .adm-bank-list-item:hover { border-color: rgba(255,255,255,0.25); }
//   .adm-bank-list-name { font-size: 13px; font-weight: 600; color: var(--white); margin-bottom: 2px; }
//   .adm-bank-list-sub { font-size: 11px; color: var(--muted); }

//   .adm-modal-footer {
//     display: flex;
//     justify-content: flex-end;
//     gap: 8px;
//     margin-top: 20px;
//   }

//   /* Logout button in topbar */
//   .adm-logout-btn {
//     background: rgba(220,53,69,0.15);
//     color: #ff6b7a;
//     border: 1px solid rgba(220,53,69,0.3);
//     border-radius: 3px;
//     padding: 7px 16px;
//     font-family: 'Lato', sans-serif;
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: background 0.2s;
//   }
//   .adm-logout-btn:hover { background: rgba(220,53,69,0.28); }

//   /* Login btn */
//   .adm-login-btn {
//     width: 100%;
//     background: var(--orange);
//     color: #fff;
//     border: none;
//     border-radius: 3px;
//     padding: 13px;
//     font-family: 'Lato', sans-serif;
//     font-size: 12px;
//     font-weight: 700;
//     letter-spacing: 0.14em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: background 0.2s;
//     margin-top: 4px;
//   }
//   .adm-login-btn:hover:not(:disabled) { background: #a8531f; }
//   .adm-login-btn:disabled { opacity: 0.5; cursor: not-allowed; }

//   /* Topbar manage admin btn */
//   .adm-manage-btn {
//     background: none;
//     border: 1px solid rgba(28,43,58,0.25);
//     border-radius: 3px;
//     padding: 7px 14px;
//     font-family: 'Lato', sans-serif;
//     font-size: 11px;
//     font-weight: 700;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     color: var(--navy);
//     cursor: pointer;
//     transition: border-color 0.2s;
//     white-space: nowrap;
//   }
//   .adm-manage-btn:hover { border-color: var(--navy); }

//   /* Topbar manage dropdown (on cream bg) */
//   .adm-topbar-dropdown {
//     position: absolute;
//     right: 0;
//     top: calc(100% + 6px);
//     background: var(--white);
//     border: 1px solid var(--cream2);
//     border-radius: 4px;
//     box-shadow: 0 8px 32px rgba(28,43,58,0.15);
//     min-width: 160px;
//     z-index: 2000;
//     overflow: hidden;
//   }
//   .adm-topbar-dropdown-item {
//     display: block;
//     width: 100%;
//     background: none;
//     border: none;
//     padding: 11px 16px;
//     font-family: 'Lato', sans-serif;
//     font-size: 13px;
//     color: var(--navy);
//     text-align: left;
//     cursor: pointer;
//     transition: background 0.15s;
//   }
//   .adm-topbar-dropdown-item:hover { background: var(--cream); }
//   .adm-topbar-dropdown-item-danger { color: #c0392b !important; }
//   .adm-topbar-divider { border: none; border-top: 1px solid var(--cream2); margin: 0; }

//   /* ---- RESPONSIVE ---- */
//   @media (max-width: 480px) {
//     .adm-topbar {
//       padding: 12px 16px;
//     }
//     .adm-topbar-brand {
//       font-size: 15px;
//     }
//     .adm-manage-btn {
//       padding: 6px 10px;
//       font-size: 10px;
//       letter-spacing: 0.06em;
//     }
//     .adm-logout-btn {
//       padding: 6px 10px;
//       font-size: 10px;
//       letter-spacing: 0.06em;
//     }
//     .adm-tabbar {
//       padding: 0 16px;
//     }
//     .adm-tab {
//       padding: 12px 12px;
//       font-size: 11px;
//     }
//     .adm-content {
//       padding: 16px;
//     }
//     .adm-login-card {
//       width: 100%;
//       padding: 36px 24px;
//     }
//   }
// `;


// export default function AdminPage() {
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   const [savingAdminEdit, setSavingAdminEdit] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [role, setRole] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [activeTab, setActiveTab] = useState<"banks" | "submission">("banks");
//   const [banks, setBanks] = useState<any[]>([]);
//   const [customers, setCustomers] = useState<any[]>([]);
//   const [showBankModal, setShowBankModal] = useState(false);
//   const [showAdminModal, setShowAdminModal] = useState(false);
//   const [showDeleteAdminModal, setShowDeleteAdminModal] = useState(false);
//   const [showManageDropdown, setShowManageDropdown] = useState(false);
//   const [showManageBanksDropdown, setShowManageBanksDropdown] = useState(false);
//   const [showDeleteBankModal, setShowDeleteBankModal] = useState(false);
//   const [showEditBankModal, setShowEditBankModal] = useState(false);
//   const [deletingBankId, setDeletingBankId] = useState<string | null>(null);
//   const [editingBank, setEditingBank] = useState<any | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [admins, setAdmins] = useState<any[]>([]);
//   const [deletingAdminId, setDeletingAdminId] = useState<string | null>(null);
//   const [togglingBankId, setTogglingBankId] = useState<string | null>(null);
//   const [savingEdit, setSavingEdit] = useState(false);

//   // Settings state
//   const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
//   const [showSettingsModal, setShowSettingsModal] = useState(false);
//   const [settingsForm, setSettingsForm] = useState({ username: "", password: "" });
//   const [savingSettings, setSavingSettings] = useState(false);

//   // Spreadsheet state
//   const [showSpreadsheetModal, setShowSpreadsheetModal] = useState(false);
//   const [spreadsheetId, setSpreadsheetId] = useState("");
//   const [savingSpreadsheet, setSavingSpreadsheet] = useState(false);

//   const [bankForm, setBankForm] = useState({
//     accountLabel: "", accountName: "", maxLimit: "", minLimit: "", sortCode: "", accountNumber: "",
//   });

//   const [editForm, setEditForm] = useState({
//     accountLabel: "", accountName: "", maxLimit: "", minLimit: "",
//     sortCode: "", accountNumber: "", totalReceived: "", totalPending: "", status: "on",
//   });

//   const [adminForm, setAdminForm] = useState({ username: "", password: "" });

//   const getToken = () => localStorage.getItem("token");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const savedRole = localStorage.getItem("adminRole");
//     if (token) { setLoggedIn(true); setRole(savedRole || "admin"); fetchBanks(); fetchCustomers(); }
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = () => {
//       setShowManageDropdown(false);
//       setShowManageBanksDropdown(false);
//       setShowSettingsDropdown(false);
//     };
//     if (showManageDropdown || showManageBanksDropdown || showSettingsDropdown)
//       document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [showManageDropdown, showManageBanksDropdown, showSettingsDropdown]);

//   const handleLogin = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.post(`${API_URL}/admin/login`, { username, password });
//       if (res.data.success) {
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("adminRole", res.data.role);
//         setLoggedIn(true); setRole(res.data.role); fetchBanks(); fetchCustomers();
//       }
//     } catch (error: any) {
//       alert(error?.response?.data?.message || "Invalid username or password");
//       setUsername(""); setPassword("");
//     } finally { setLoading(false); }
//   };

//   const handleKeyDown = (e: any) => { if (e.key === "Enter") handleLogin(); };

//   const logout = () => {
//     localStorage.removeItem("token"); localStorage.removeItem("adminRole");
//     setLoggedIn(false); setRole(""); setUsername(""); setPassword("");
//   };

//   const fetchBanks = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/banks/view-banks`, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setBanks(res.data.data || []);
//     } catch (error: any) { console.log(error); if (error?.response?.status === 401) logout(); }
//   };

//   const fetchCustomers = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/customer/all`, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setCustomers(res.data.data || []);
//     } catch (error: any) { console.log(error); if (error?.response?.status === 401) logout(); }
//   };

//   const fetchAdmins = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/admin/all`, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setAdmins(res.data.data || []);
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to fetch admins"); }
//   };

//   const deleteAdmin = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this admin? This cannot be undone.")) return;
//     try {
//       setDeletingAdminId(id);
//       await axios.delete(`${API_URL}/admin/delete/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setAdmins((prev) => prev.filter((a) => a._id !== id));
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to delete admin"); }
//     finally { setDeletingAdminId(null); }
//   };

//   const toggleBankStatus = async (id: string) => {
//     try {
//       setTogglingBankId(id);
//       const res = await axios.patch(`${API_URL}/banks/toggle-status/${id}`, {}, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setBanks((prev) => prev.map((b) => b._id === id ? { ...b, status: res.data.data.status } : b));
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to toggle bank status"); }
//     finally { setTogglingBankId(null); }
//   };

//   const deleteBank = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this bank?")) return;
//     try {
//       setDeletingBankId(id);
//       await axios.delete(`${API_URL}/banks/remove/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setBanks((prev) => prev.filter((b) => b._id !== id));
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to delete bank"); }
//     finally { setDeletingBankId(null); }
//   };

//   const openEditBank = (bank: any) => {
//     setEditingBank(bank);
//     setEditForm({
//       accountLabel: bank.accountLabel,
//       accountName: bank.accountName,
//       maxLimit: String(bank.maxLimit),
//       minLimit: String(bank.minLimit),
//       sortCode: bank.sortCode,
//       accountNumber: bank.accountNumber,
//       totalReceived: String(bank.totalReceived ?? 0),
//       totalPending: String(bank.totalPending ?? 0),
//       status: bank.status ?? "on",
//     });
//     setShowEditBankModal(true);
//   };

//   const saveEditBank = async () => {
//     if (!editingBank) return;
//     try {
//       setSavingEdit(true);
//       const res = await axios.put(
//         `${API_URL}/banks/edit/${editingBank._id}`,
//         {
//           ...editForm,
//           maxLimit: Number(editForm.maxLimit),
//           minLimit: Number(editForm.minLimit),
//           totalReceived: Number(editForm.totalReceived),
//           totalPending: Number(editForm.totalPending),
//         },
//         { headers: { Authorization: `Bearer ${getToken()}` } }
//       );
//       setBanks((prev) => prev.map((b) => b._id === editingBank._id ? res.data.data : b));
//       setShowEditBankModal(false); setEditingBank(null);
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to update bank"); }
//     finally { setSavingEdit(false); }
//   };

//   const approveAllCustomers = async () => {
//     if (!confirm("Approve all customers? This cannot be undone.")) return;
//     try {
//       await axios.post(`${API_URL}/customer/approve-all`, {}, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setCustomers([]);
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to approve all customers"); }
//   };

//   const approveCustomer = async (id: string) => {
//     if (!confirm("Approve this customer?")) return;
//     try {
//       await axios.post(`${API_URL}/customer/approve/${id}`, {}, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setCustomers((prev) => prev.filter((c) => c._id !== id));
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to approve customer"); }
//   };

//   const deleteCustomer = async (id: string) => {
//     if (!confirm("Are you sure you want to reject and delete this customer?")) return;
//     try {
//       await axios.delete(`${API_URL}/customer/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setCustomers((prev) => prev.filter((c) => c._id !== id));
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to delete customer"); }
//   };

//   const addBank = async () => {
//     try {
//       await axios.post(`${API_URL}/banks/add`, { ...bankForm, maxLimit: Number(bankForm.maxLimit), minLimit: Number(bankForm.minLimit) }, { headers: { Authorization: `Bearer ${getToken()}` } });
//       setShowBankModal(false);
//       setBankForm({ accountLabel: "", accountName: "", maxLimit: "", minLimit: "", sortCode: "", accountNumber: "" });
//       fetchBanks();
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to add bank"); }
//   };

//   const addAdmin = async () => {
//     try {
//       await axios.post(`${API_URL}/admin/create-new`, adminForm, { headers: { Authorization: `Bearer ${getToken()}` } });
//       alert("Admin created successfully");
//       setShowAdminModal(false); setAdminForm({ username: "", password: "" });
//     } catch (error: any) { alert(error?.response?.data?.message || "Failed to create admin"); }
//   };

//   const editSelf = async () => {
//     if (!settingsForm.username && !settingsForm.password) {
//       alert("Provide at least a new username or password.");
//       return;
//     }
//     try {
//       setSavingSettings(true);
//       const payload: any = {};
//       if (settingsForm.username) payload.username = settingsForm.username;
//       if (settingsForm.password) payload.password = settingsForm.password;
//       await axios.patch(`${API_URL}/admin/edit-self`, payload, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       alert("Account updated. Please log in again.");
//       logout();
//     } catch (error: any) {
//       alert(error?.response?.data?.message || "Failed to update account");
//     } finally {
//       setSavingSettings(false);
//     }
//   };

//   const saveSpreadsheetId = async () => {
//     if (!spreadsheetId.trim()) { alert("Please enter a spreadsheet ID."); return; }
//     try {
//       setSavingSpreadsheet(true);
//       await axios.post(`${API_URL}/spreadsheet/change`, { googleSheetId: spreadsheetId.trim() }, {
//         headers: { Authorization: `Bearer ${getToken()}` },
//       });
//       alert("Spreadsheet ID updated successfully.");
//       setShowSpreadsheetModal(false);
//       setSpreadsheetId("");
//     } catch (error: any) {
//       alert(error?.response?.data?.message || "Failed to update spreadsheet ID");
//     } finally {
//       setSavingSpreadsheet(false);
//     }
//   };

//   // ---- LOGIN SCREEN ----
//   if (!loggedIn) {
//     return (
//       <>
//         <style>{adminStyles}</style>
//         <div className="adm-login-page">
//           <div className="adm-login-card">
//             <span className="adm-login-eyebrow">Admin Portal</span>
//             <h2 className="adm-login-title">Junior Layer</h2>
//             <p className="adm-login-sub">Sign in to your dashboard</p>
//             <input className="adm-input" placeholder="Username" value={username}
//               onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} />
//             <input className="adm-input" type="password" placeholder="Password" value={password}
//               onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
//             <button className="adm-login-btn" onClick={handleLogin} disabled={loading}>
//               {loading ? "Signing in…" : "Sign In"}
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   // ---- MAIN DASHBOARD ----
//   return (
//     <>
//       <style>{adminStyles}</style>
//       <div className="adm-root">

//         {/* TOPBAR */}
//         <div className="adm-topbar">
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <span className="adm-topbar-brand">ADMIN PORTAL</span>
//           </div>
//           <div className="adm-topbar-actions">

//             {/* MANAGE ADMIN — superadmin only (unchanged) */}
//             {role === "superadmin" && (
//               <div className="adm-dropdown-wrap">
//                 <button className="adm-manage-btn" onClick={(e) => { e.stopPropagation(); setShowManageDropdown((p) => !p); }}>
//                   Manage Admin ▾
//                 </button>
//                 {showManageDropdown && (
//                   <div className="adm-topbar-dropdown" onClick={(e) => e.stopPropagation()}>
//                     <button className="adm-topbar-dropdown-item" onClick={() => { setShowAdminModal(true); setShowManageDropdown(false); }}>
//                       ➕ Add Admin
//                     </button>
//                     <hr className="adm-topbar-divider" />
//                     <button className="adm-topbar-dropdown-item adm-topbar-dropdown-item-danger" onClick={() => { fetchAdmins(); setShowDeleteAdminModal(true); setShowManageDropdown(false); }}>
//                       🗑️ Delete Admin
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* SETTINGS DROPDOWN
//                 - superadmin: Change Credentials + Edit Spreadsheet ID
//                 - normal admin: Change Credentials only
//             */}
//             <div className="adm-dropdown-wrap">
//               <button className="adm-manage-btn" onClick={(e) => { e.stopPropagation(); setShowSettingsDropdown((p) => !p); }}>
//                 ⚙️ Settings ▾
//               </button>
//               {showSettingsDropdown && (
//                 <div className="adm-topbar-dropdown" onClick={(e) => e.stopPropagation()}>
//                   <button className="adm-topbar-dropdown-item" onClick={() => { setSettingsForm({ username: "", password: "" }); setShowSettingsModal(true); setShowSettingsDropdown(false); }}>
//                     🔑 Change Credentials
//                   </button>
//                   {role === "superadmin" && (
//                     <>
//                       <hr className="adm-topbar-divider" />
//                       <button className="adm-topbar-dropdown-item" onClick={() => { setSpreadsheetId(""); setShowSpreadsheetModal(true); setShowSettingsDropdown(false); }}>
//                         📊 Edit Spreadsheet ID
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>

//             <button className="adm-logout-btn" onClick={logout}>Logout</button>
//           </div>
//         </div>

//         {/* TABBAR */}
//         <div className="adm-tabbar">
//           <button className={`adm-tab ${activeTab === "banks" ? "adm-tab-active" : ""}`}
//             onClick={() => { setActiveTab("banks"); fetchBanks(); }}>Banks</button>
//           <button className={`adm-tab ${activeTab === "submission" ? "adm-tab-active" : ""}`}
//             onClick={() => { setActiveTab("submission"); fetchCustomers(); }}>Submissions</button>
//         </div>

//         {/* CONTENT */}
//         <div className="adm-content">

//           {/* BANKS TAB */}
//           {activeTab === "banks" && (
//             <>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
//                 <div>
//                   <h3 className="adm-page-title">Banks</h3>
//                   <p className="adm-page-sub">Manage all linked bank accounts</p>
//                 </div>

//                 {/* MANAGE BANKS DROPDOWN — superadmin only */}
//                 {role === "superadmin" && (
//                   <div className="adm-dropdown-wrap">
//                     <button className="adm-btn" onClick={(e) => { e.stopPropagation(); setShowManageBanksDropdown((p) => !p); }}>
//                       Manage Banks ▾
//                     </button>
//                     {showManageBanksDropdown && (
//                       <div className="adm-dropdown-menu" onClick={(e) => e.stopPropagation()}>
//                         <button className="adm-dropdown-item" onClick={() => { setShowBankModal(true); setShowManageBanksDropdown(false); }}>
//                           ➕ Add Bank
//                         </button>
//                         <hr className="adm-dropdown-divider" />
//                         <button className="adm-dropdown-item" onClick={() => { setShowEditBankModal(true); setEditingBank(null); setShowManageBanksDropdown(false); }}>
//                           ✏️ Edit Bank
//                         </button>
//                         <hr className="adm-dropdown-divider" />
//                         <button className="adm-dropdown-item adm-dropdown-item-danger" onClick={() => { setShowDeleteBankModal(true); setShowManageBanksDropdown(false); }}>
//                           🗑️ Delete Bank
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               <div className="adm-table-wrap">
//                 <div style={{ overflowX: "auto" }}>
//                   <table className="adm-table">
//                     <thead>
//                       <tr>
//                         {["Label","Name","Min","Max","Sort Code","Account","Total Received","Total Pending","Status"].map(h => (
//                           <th key={h}>{h}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {banks.length > 0 ? banks.map((b: any) => (
//                         <tr key={b._id}>
//                           <td>{b.accountLabel}</td>
//                           <td>{b.accountName}</td>
//                           <td>{b.minLimit}</td>
//                           <td>{b.maxLimit}</td>
//                           <td>{b.sortCode}</td>
//                           <td>{b.accountNumber}</td>
//                           <td>{b.totalReceived}</td>
//                           <td>{b.totalPending}</td>
//                           <td>
//                             <button
//                               className={b.status === "on" ? "adm-status-on" : "adm-status-off"}
//                               disabled={togglingBankId === b._id}
//                               onClick={() => toggleBankStatus(b._id)}
//                             >
//                               {togglingBankId === b._id ? "…" : b.status === "on" ? "ON" : "OFF"}
//                             </button>
//                           </td>
//                         </tr>
//                       )) : (
//                         <tr><td colSpan={9} className="adm-empty">No banks found</td></tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </>
//           )}

//           {/* SUBMISSIONS TAB */}
//           {activeTab === "submission" && (
//             <>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
//                 <div>
//                   <h3 className="adm-page-title">Submissions</h3>
//                   <p className="adm-page-sub">Review and manage customer payment submissions</p>
//                 </div>
//                 {customers.length > 0 && (
//                   <button className="adm-btn-success" style={{ padding: "10px 20px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }} onClick={approveAllCustomers}>
//                     ✓ Approve All
//                   </button>
//                 )}
//               </div>

//               <div className="adm-table-wrap">
//                 <div style={{ overflowX: "auto" }}>
//                   <table className="adm-table">
//                     <thead>
//                       <tr>
//                         {["Reference ID","Full Name","Email","Currency","Amount","Bank","Screenshot","Submitted At","Actions"].map(h => (
//                           <th key={h}>{h}</th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {customers.length > 0 ? customers.map((c: any) => (
//                         <tr key={c._id}>
//                           <td>{c.referenceId}</td>
//                           <td>{c.fullName}</td>
//                           <td>{c.email}</td>
//                           <td>{c.paymentCurrency}</td>
//                           <td>{c.amount}</td>
//                           <td>{c.bank?.accountLabel || c.bank?.accountName || "—"}</td>
//                           <td>
//                             <button className="adm-btn-view" onClick={() => window.open(c.screenshotUrl, "_blank")}>
//                               View
//                             </button>
//                           </td>
//                           <td style={{ whiteSpace: "nowrap" }}>
//                             {new Date(c.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
//                           </td>
//                           <td>
//                             <div style={{ display: "flex", gap: "6px" }}>
//                               <button className="adm-btn-success" onClick={() => approveCustomer(c._id)}>Approve</button>
//                               <button className="adm-btn-danger" onClick={() => deleteCustomer(c._id)}>Reject</button>
//                             </div>
//                           </td>
//                         </tr>
//                       )) : (
//                         <tr><td colSpan={9} className="adm-empty">No submissions found</td></tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         {/* ADD BANK MODAL */}
//         {showBankModal && (
//           <AdminModal title="Add Bank Account" onClose={() => setShowBankModal(false)}>
//             <label className="adm-label">Bank / Account Label</label>
//             <input className="adm-modal-input" placeholder="e.g. Tide Bank — GBP" value={bankForm.accountLabel}
//               onChange={(e) => setBankForm({ ...bankForm, accountLabel: e.target.value })} />
//             <label className="adm-label">Account Name</label>
//             <input className="adm-modal-input" placeholder="e.g. Global Traders Ltd" value={bankForm.accountName}
//               onChange={(e) => setBankForm({ ...bankForm, accountName: e.target.value })} />
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//               <div>
//                 <label className="adm-label">Sort Code</label>
//                 <input className="adm-modal-input" placeholder="XX-XX-XX" value={bankForm.sortCode}
//                   onChange={(e) => setBankForm({ ...bankForm, sortCode: e.target.value })} />
//               </div>
//               <div>
//                 <label className="adm-label">Account Number</label>
//                 <input className="adm-modal-input" placeholder="XXXXXXXX" value={bankForm.accountNumber}
//                   onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })} />
//               </div>
//             </div>
//             <div className="adm-range-box">
//               <div className="adm-range-title">💡 Payment Range (optional)</div>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//                 <div>
//                   <label className="adm-label">Min Amount (£)</label>
//                   <input className="adm-modal-input" placeholder="0" value={bankForm.minLimit}
//                     onChange={(e) => setBankForm({ ...bankForm, minLimit: e.target.value })} />
//                 </div>
//                 <div>
//                   <label className="adm-label">Max Amount (£)</label>
//                   <input className="adm-modal-input" placeholder="9999" value={bankForm.maxLimit}
//                     onChange={(e) => setBankForm({ ...bankForm, maxLimit: e.target.value })} />
//                 </div>
//               </div>
//             </div>
//             <div className="adm-modal-footer">
//               <button className="adm-btn-outline" onClick={() => setShowBankModal(false)}>Cancel</button>
//               <button className="adm-btn" onClick={addBank}>Add Account</button>
//             </div>
//           </AdminModal>
//         )}

//         {/* DELETE BANK MODAL */}
//         {showDeleteBankModal && (
//           <AdminModal title="Delete Bank" onClose={() => setShowDeleteBankModal(false)}>
//             {banks.length === 0 ? <p style={{ color: "var(--muted)", textAlign: "center", padding: "20px 0" }}>No banks found.</p> : (
//               banks.map((b: any) => (
//                 <div key={b._id} className="adm-bank-list-item" style={{ cursor: "default" }}>
//                   <div>
//                     <div className="adm-bank-list-name">{b.accountLabel}</div>
//                     <div className="adm-bank-list-sub">{b.accountName} — {b.accountNumber}</div>
//                   </div>
//                   <button className="adm-btn-danger" disabled={deletingBankId === b._id} onClick={() => deleteBank(b._id)}>
//                     {deletingBankId === b._id ? "Deleting…" : "Delete"}
//                   </button>
//                 </div>
//               ))
//             )}
//             <div className="adm-modal-footer">
//               <button className="adm-btn-outline" onClick={() => setShowDeleteBankModal(false)}>Close</button>
//             </div>
//           </AdminModal>
//         )}

//         {/* EDIT BANK — step 1: select */}
//         {showEditBankModal && !editingBank && (
//           <AdminModal title="Edit Bank — Select" onClose={() => setShowEditBankModal(false)}>
//             {banks.length === 0 ? <p style={{ color: "var(--muted)", textAlign: "center", padding: "20px 0" }}>No banks found.</p> : (
//               banks.map((b: any) => (
//                 <div key={b._id} className="adm-bank-list-item" onClick={() => openEditBank(b)}>
//                   <div>
//                     <div className="adm-bank-list-name">{b.accountLabel}</div>
//                     <div className="adm-bank-list-sub">{b.accountName} — {b.accountNumber}</div>
//                   </div>
//                   <span style={{ fontSize: "12px", color: "var(--muted)" }}>Edit ›</span>
//                 </div>
//               ))
//             )}
//             <div className="adm-modal-footer">
//               <button className="adm-btn-outline" onClick={() => setShowEditBankModal(false)}>Close</button>
//             </div>
//           </AdminModal>
//         )}

//         {/* EDIT BANK — step 2: form */}
//         {showEditBankModal && editingBank && (
//           <AdminModal title={`Edit — ${editingBank.accountLabel}`} onClose={() => { setShowEditBankModal(false); setEditingBank(null); }}>
//             <label className="adm-label">Bank / Account Label</label>
//             <input className="adm-modal-input" value={editForm.accountLabel}
//               onChange={(e) => setEditForm({ ...editForm, accountLabel: e.target.value })} />
//             <label className="adm-label">Account Name</label>
//             <input className="adm-modal-input" value={editForm.accountName}
//               onChange={(e) => setEditForm({ ...editForm, accountName: e.target.value })} />
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//               <div>
//                 <label className="adm-label">Sort Code</label>
//                 <input className="adm-modal-input" value={editForm.sortCode}
//                   onChange={(e) => setEditForm({ ...editForm, sortCode: e.target.value })} />
//               </div>
//               <div>
//                 <label className="adm-label">Account Number</label>
//                 <input className="adm-modal-input" value={editForm.accountNumber}
//                   onChange={(e) => setEditForm({ ...editForm, accountNumber: e.target.value })} />
//               </div>
//             </div>
//             <div className="adm-range-box">
//               <div className="adm-range-title">💡 Payment Range</div>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//                 <div>
//                   <label className="adm-label">Min Amount (£)</label>
//                   <input className="adm-modal-input" value={editForm.minLimit}
//                     onChange={(e) => setEditForm({ ...editForm, minLimit: e.target.value })} />
//                 </div>
//                 <div>
//                   <label className="adm-label">Max Amount (£)</label>
//                   <input className="adm-modal-input" value={editForm.maxLimit}
//                     onChange={(e) => setEditForm({ ...editForm, maxLimit: e.target.value })} />
//                 </div>
//               </div>
//             </div>
//             <div className="adm-range-box">
//               <div className="adm-range-title">📊 Totals</div>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
//                 <div>
//                   <label className="adm-label">Total Received (£)</label>
//                   <input className="adm-modal-input" type="number" min="0" value={editForm.totalReceived}
//                     onChange={(e) => setEditForm({ ...editForm, totalReceived: e.target.value })} />
//                 </div>
//                 <div>
//                   <label className="adm-label">Total Pending (£)</label>
//                   <input className="adm-modal-input" type="number" min="0" value={editForm.totalPending}
//                     onChange={(e) => setEditForm({ ...editForm, totalPending: e.target.value })} />
//                 </div>
//               </div>
//             </div>
//             <label className="adm-label">Status</label>
//             <select
//               className="adm-modal-input"
//               value={editForm.status}
//               onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
//             >
//               <option value="on">ON</option>
//               <option value="off">OFF</option>
//             </select>
//             <div className="adm-modal-footer">
//               <button className="adm-btn-outline" onClick={() => setEditingBank(null)}>← Back</button>
//               <button className="adm-btn" disabled={savingEdit} onClick={saveEditBank}>
//                 {savingEdit ? "Saving…" : "Save Changes"}
//               </button>
//             </div>
//           </AdminModal>
//         )}

//         {/* ADD ADMIN MODAL */}
//         {showAdminModal && role === "superadmin" && (
//           <AdminModal title="Add Admin" onClose={() => setShowAdminModal(false)}>
//             <label className="adm-label">Username</label>
//             <input className="adm-modal-input" placeholder="Username" value={adminForm.username}
//               onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })} />
//             <label className="adm-label">Password</label>
//             <input className="adm-modal-input" type="password" minLength={8} placeholder="Password" value={adminForm.password}
//               onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })} />
//             <button className="adm-btn" style={{ width: "100%", marginTop: "4px" }} onClick={addAdmin}>
//               Create Admin
//             </button>
//           </AdminModal>
//         )}

//         {/* DELETE ADMIN MODAL */}
//         {showDeleteAdminModal && role === "superadmin" && (
//           <AdminModal title="Delete Admin" onClose={() => setShowDeleteAdminModal(false)}>
//             {admins.length === 0 ? <p style={{ color: "var(--muted)", textAlign: "center", padding: "20px 0" }}>No other admins found.</p> : (
//               admins.map((a: any) => (
//                 <div key={a._id} className="adm-bank-list-item" style={{ cursor: "default" }}>
//                   <div>
//                     <div className="adm-bank-list-name">{a.username}</div>
//                     <div className="adm-bank-list-sub">{a.role}</div>
//                   </div>
//                   <button className="adm-btn-danger" disabled={deletingAdminId === a._id} onClick={() => deleteAdmin(a._id)}>
//                     {deletingAdminId === a._id ? "Deleting…" : "Delete"}
//                   </button>
//                 </div>
//               ))
//             )}
//             <div className="adm-modal-footer">
//               <button className="adm-btn-outline" onClick={() => setShowDeleteAdminModal(false)}>Close</button>
//             </div>
//           </AdminModal>
//         )}

//         {/* CHANGE CREDENTIALS MODAL */}
//         {showSettingsModal && (
//           <AdminModal title="Account Settings" onClose={() => setShowSettingsModal(false)}>
//             <p style={{ fontSize: "12px", color: "var(--muted)", margin: "0 0 20px" }}>
//               Leave a field blank to keep it unchanged.
//             </p>
//             <label className="adm-label">New Username</label>
//             <input
//               className="adm-modal-input"
//               placeholder="Leave blank to keep unchanged"
//               value={settingsForm.username}
//               onChange={(e) => setSettingsForm({ ...settingsForm, username: e.target.value })}
//             />
//             <label className="adm-label">New Password</label>
//             <input
//               className="adm-modal-input"
//               type="password"
//               placeholder="Leave blank to keep unchanged"
//               value={settingsForm.password}
//               onChange={(e) => setSettingsForm({ ...settingsForm, password: e.target.value })}
//             />
//             <p style={{ fontSize: "11px", color: "var(--muted)", margin: "-8px 0 0" }}>
//               You will be logged out after saving so the new credentials take effect.
//             </p>
//             <div className="adm-modal-footer">
//               <button className="adm-btn-outline" onClick={() => setShowSettingsModal(false)}>Cancel</button>
//               <button className="adm-btn" disabled={savingSettings} onClick={editSelf}>
//                 {savingSettings ? "Saving…" : "Save Changes"}
//               </button>
//             </div>
//           </AdminModal>
//         )}

//         {/* EDIT SPREADSHEET ID MODAL */}
//         {showSpreadsheetModal && (
//           <AdminModal title="Edit Spreadsheet ID" onClose={() => setShowSpreadsheetModal(false)}>
//             <p style={{ fontSize: "12px", color: "var(--muted)", margin: "0 0 20px" }}>
//               Enter the new Google Spreadsheet ID below.
//             </p>
//             <label className="adm-label">Spreadsheet ID</label>
//             <input
//               className="adm-modal-input"
//               placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
//               value={spreadsheetId}
//               onChange={(e) => setSpreadsheetId(e.target.value)}
//             />
//             <div className="adm-modal-footer">
//               <button className="adm-btn-outline" onClick={() => setShowSpreadsheetModal(false)}>Cancel</button>
//               <button className="adm-btn" disabled={savingSpreadsheet} onClick={saveSpreadsheetId}>
//                 {savingSpreadsheet ? "Saving…" : "Save"}
//               </button>
//             </div>
//           </AdminModal>
//         )}

//       </div>
//     </>
//   );
// }

// function AdminModal({ title, children, onClose }: any) {
//   return (
//     <div className="adm-modal-overlay">
//       <div className="adm-modal">
//         <div className="adm-modal-header">
//           <h4 className="adm-modal-title">{title}</h4>
//           <button className="adm-modal-close" onClick={onClose}>×</button>
//         </div>
//         <div className="adm-modal-body">{children}</div>
//       </div>
//     </div>
//   );
// }





















"use client";

import { useEffect, useState } from "react";
import axios from "axios";
const adminStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Lato:wght@300;400;600&display=swap');

  :root {
    --navy:    #1C2B3A;
    --navy2:   #243447;
    --navy3:   #1a2535;
    --cream:   #F5F0E8;
    --cream2:  #EDE7D9;
    --orange:  #C0622F;
    --white:   #FFFFFF;
    --muted:   rgba(255,255,255,0.5);
    --border:  rgba(255,255,255,0.1);
    --border2: rgba(255,255,255,0.07);
  }

  /* ---- BASE ---- */
  .adm-root {
    background: var(--navy);
    min-height: 100vh;
    font-family: 'Lato', sans-serif;
    color: var(--white);
  }

  /* ---- LOGIN ---- */
  .adm-login-page {
    background: var(--navy);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lato', sans-serif;
  }
  .adm-login-card {
    background: var(--navy2);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 48px 40px;
    width: 380px;
    box-shadow: 0 8px 48px rgba(0,0,0,0.4);
  }
  .adm-login-eyebrow {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 6px;
    display: block;
  }
  .adm-login-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 600;
    color: var(--white);
    margin: 0 0 6px;
  }
  .adm-login-sub {
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 28px;
  }
  .adm-input {
    width: 100%;
    padding: 11px 14px;
    background: rgba(0,0,0,0.25);
    border: 1px solid var(--border);
    border-radius: 3px;
    color: var(--white);
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    margin-bottom: 12px;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }
  .adm-input::placeholder { color: var(--muted); }
  .adm-input:focus { border-color: var(--orange); }

  /* ---- TOPBAR ---- */
  .adm-topbar {
    background: var(--cream);
    border-bottom: 1px solid var(--cream2);
    padding: 14px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }
  .adm-topbar-brand {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--navy);
    letter-spacing: 0.04em;
  }
  .adm-topbar-sub {
    font-size: 12px;
    color: #9a8e7e;
    margin-left: 8px;
    font-weight: 400;
    font-family: 'Lato', sans-serif;
  }
  .adm-topbar-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

  /* ---- TABBAR ---- */
  .adm-tabbar {
    background: var(--navy2);
    border-bottom: 1px solid var(--border);
    padding: 0 32px;
    display: flex;
    gap: 0;
  }
  .adm-tab {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 14px 20px;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
  }
  .adm-tab:hover { color: var(--white); }
  .adm-tab-active { color: var(--white) !important; border-bottom-color: var(--orange) !important; }

  /* ---- CONTENT ---- */
  .adm-content { padding: 32px; }

  .adm-page-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 600;
    color: var(--white);
    margin: 0 0 4px;
  }
  .adm-page-sub { font-size: 13px; color: var(--muted); margin: 0; }

  /* ---- TABLE ---- */
  .adm-table-wrap {
    background: var(--navy2);
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
  }
  .adm-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Lato', sans-serif;
  }
  .adm-table thead tr {
    background: rgba(0,0,0,0.25);
    border-bottom: 1px solid var(--border);
  }
  .adm-table th {
    padding: 12px 16px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    text-align: left;
    white-space: nowrap;
  }
  .adm-table td {
    padding: 13px 16px;
    font-size: 13px;
    color: rgba(255,255,255,0.85);
    border-bottom: 1px solid var(--border2);
  }
  .adm-table tbody tr:last-child td { border-bottom: none; }
  .adm-table tbody tr:hover { background: rgba(255,255,255,0.03); }
  .adm-empty { text-align: center; padding: 40px !important; color: var(--muted) !important; }

  /* ---- BUTTONS ---- */
  .adm-btn {
    background: var(--orange);
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 10px 20px;
    font-family: 'Lato', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }
  .adm-btn:hover:not(:disabled) { background: #a8531f; }
  .adm-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .adm-btn-outline {
    background: none;
    color: var(--white);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 9px 16px;
    font-family: 'Lato', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
    white-space: nowrap;
  }
  .adm-btn-outline:hover { border-color: rgba(255,255,255,0.4); }

  .adm-btn-danger {
    background: rgba(220,53,69,0.15);
    color: #ff6b7a;
    border: 1px solid rgba(220,53,69,0.3);
    border-radius: 3px;
    padding: 6px 14px;
    font-family: 'Lato', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }
  .adm-btn-danger:hover:not(:disabled) { background: rgba(220,53,69,0.3); }
  .adm-btn-danger:disabled { opacity: 0.4; cursor: not-allowed; }

  .adm-btn-success {
    background: rgba(25,135,84,0.2);
    color: #5dd99b;
    border: 1px solid rgba(25,135,84,0.35);
    border-radius: 3px;
    padding: 6px 14px;
    font-family: 'Lato', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }
  .adm-btn-success:hover { background: rgba(25,135,84,0.35); }

  .adm-btn-view {
    background: none;
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 5px 12px;
    font-family: 'Lato', sans-serif;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .adm-btn-view:hover { border-color: rgba(255,255,255,0.35); color: var(--white); }

  /* Status badge */
  .adm-status-on {
    background: rgba(25,135,84,0.2);
    color: #5dd99b;
    border: 1px solid rgba(25,135,84,0.35);
    border-radius: 3px;
    padding: 4px 12px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: background 0.2s;
    font-family: 'Lato', sans-serif;
  }
  .adm-status-off {
    background: rgba(255,255,255,0.07);
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 4px 12px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: background 0.2s;
    font-family: 'Lato', sans-serif;
  }

  /* ---- DROPDOWN ---- */
  .adm-dropdown-wrap { position: relative; }
  .adm-dropdown-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 6px);
    background: var(--navy2);
    border: 1px solid var(--border);
    border-radius: 4px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    min-width: 170px;
    z-index: 2000;
    overflow: hidden;
  }
  .adm-dropdown-item {
    display: block;
    width: 100%;
    background: none;
    border: none;
    padding: 11px 16px;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    color: rgba(255,255,255,0.85);
    text-align: left;
    cursor: pointer;
    transition: background 0.15s;
  }
  .adm-dropdown-item:hover { background: rgba(255,255,255,0.06); }
  .adm-dropdown-item-danger { color: #ff6b7a !important; }
  .adm-dropdown-divider { border: none; border-top: 1px solid var(--border); margin: 0; }

  /* ---- MODAL ---- */
  .adm-modal-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050;
    padding: 16px;
    box-sizing: border-box;
  }
  .adm-modal {
    background: var(--navy2);
    border: 1px solid var(--border);
    border-radius: 6px;
    width: 440px;
    max-width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 16px 64px rgba(0,0,0,0.6);
  }
  .adm-modal-header {
    background: var(--cream);
    padding: 20px 24px 18px;
    border-bottom: 1px solid var(--cream2);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .adm-modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 600;
    color: var(--navy);
    margin: 0;
  }
  .adm-modal-close {
    background: none;
    border: none;
    font-size: 20px;
    color: #9a8e7e;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    transition: color 0.15s;
  }
  .adm-modal-close:hover { color: var(--navy); }
  .adm-modal-body { padding: 24px; }

  /* Modal form elements */
  .adm-label {
    display: block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 6px;
  }
  .adm-modal-input {
    width: 100%;
    padding: 10px 13px;
    background: rgba(0,0,0,0.3);
    border: 1px solid var(--border);
    border-radius: 3px;
    color: var(--white);
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
    margin-bottom: 14px;
  }
  .adm-modal-input::placeholder { color: var(--muted); }
  .adm-modal-input:focus { border-color: var(--orange); }

  .adm-range-box {
    background: rgba(0,0,0,0.2);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 16px;
    margin-bottom: 16px;
  }
  .adm-range-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 12px;
  }

  /* Modal bank list item */
  .adm-bank-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 12px 14px;
    margin-bottom: 8px;
    background: rgba(0,0,0,0.15);
    cursor: pointer;
    transition: border-color 0.15s;
  }
  .adm-bank-list-item:hover { border-color: rgba(255,255,255,0.25); }
  .adm-bank-list-name { font-size: 13px; font-weight: 600; color: var(--white); margin-bottom: 2px; }
  .adm-bank-list-sub { font-size: 11px; color: var(--muted); }

  .adm-modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 20px;
  }

  /* Logout button in topbar */
  .adm-logout-btn {
    background: rgba(220,53,69,0.15);
    color: #ff6b7a;
    border: 1px solid rgba(220,53,69,0.3);
    border-radius: 3px;
    padding: 7px 16px;
    font-family: 'Lato', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
  }
  .adm-logout-btn:hover { background: rgba(220,53,69,0.28); }

  /* Login btn */
  .adm-login-btn {
    width: 100%;
    background: var(--orange);
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 13px;
    font-family: 'Lato', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 4px;
  }
  .adm-login-btn:hover:not(:disabled) { background: #a8531f; }
  .adm-login-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* Topbar manage admin btn */
  .adm-manage-btn {
    background: none;
    border: 1px solid rgba(28,43,58,0.25);
    border-radius: 3px;
    padding: 7px 14px;
    font-family: 'Lato', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--navy);
    cursor: pointer;
    transition: border-color 0.2s;
    white-space: nowrap;
  }
  .adm-manage-btn:hover { border-color: var(--navy); }

  /* Topbar manage dropdown (on cream bg) */
  .adm-topbar-dropdown {
    position: absolute;
    right: 0;
    top: calc(100% + 6px);
    background: var(--white);
    border: 1px solid var(--cream2);
    border-radius: 4px;
    box-shadow: 0 8px 32px rgba(28,43,58,0.15);
    min-width: 160px;
    z-index: 2000;
    overflow: hidden;
  }
  .adm-topbar-dropdown-item {
    display: block;
    width: 100%;
    background: none;
    border: none;
    padding: 11px 16px;
    font-family: 'Lato', sans-serif;
    font-size: 13px;
    color: var(--navy);
    text-align: left;
    cursor: pointer;
    transition: background 0.15s;
  }
  .adm-topbar-dropdown-item:hover { background: var(--cream); }
  .adm-topbar-dropdown-item-danger { color: #c0392b !important; }
  .adm-topbar-divider { border: none; border-top: 1px solid var(--cream2); margin: 0; }

  /* ---- RESPONSIVE ---- */
  @media (max-width: 480px) {
    .adm-topbar {
      padding: 12px 16px;
    }
    .adm-topbar-brand {
      font-size: 15px;
    }
    .adm-manage-btn {
      padding: 6px 10px;
      font-size: 10px;
      letter-spacing: 0.06em;
    }
    .adm-logout-btn {
      padding: 6px 10px;
      font-size: 10px;
      letter-spacing: 0.06em;
    }
    .adm-tabbar {
      padding: 0 16px;
    }
    .adm-tab {
      padding: 12px 12px;
      font-size: 11px;
    }
    .adm-content {
      padding: 16px;
    }
    .adm-login-card {
      width: 100%;
      padding: 36px 24px;
    }
  }
`;


export default function AdminPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [savingAdminEdit, setSavingAdminEdit] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"banks" | "submission">("submission");
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

  // Settings state
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsForm, setSettingsForm] = useState({ username: "", password: "" });
  const [savingSettings, setSavingSettings] = useState(false);

  // Spreadsheet state
  const [showSpreadsheetModal, setShowSpreadsheetModal] = useState(false);
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [savingSpreadsheet, setSavingSpreadsheet] = useState(false);

  const [bankForm, setBankForm] = useState({
    accountLabel: "", accountName: "", maxLimit: "", minLimit: "", sortCode: "", accountNumber: "",
  });

  const [editForm, setEditForm] = useState({
    accountLabel: "", accountName: "", maxLimit: "", minLimit: "",
    sortCode: "", accountNumber: "", totalReceived: "", totalPending: "", status: "on",
  });

  const [adminForm, setAdminForm] = useState({ username: "", password: "" });

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("adminRole");
    if (token) {
      const restoredRole = savedRole || "admin";
      setLoggedIn(true);
      setRole(restoredRole);
      if (restoredRole === "superadmin") {
        setActiveTab("banks");
        fetchBanks();
      } else {
        setActiveTab("submission");
      }
      fetchCustomers();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowManageDropdown(false);
      setShowManageBanksDropdown(false);
      setShowSettingsDropdown(false);
    };
    if (showManageDropdown || showManageBanksDropdown || showSettingsDropdown)
      document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showManageDropdown, showManageBanksDropdown, showSettingsDropdown]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/admin/login`, { username, password });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("adminRole", res.data.role);
        setLoggedIn(true);
        setRole(res.data.role);
        if (res.data.role === "superadmin") {
          setActiveTab("banks");
          fetchBanks();
        } else {
          setActiveTab("submission");
        }
        fetchCustomers();
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "Invalid username or password");
      setUsername(""); setPassword("");
    } finally { setLoading(false); }
  };

  const handleKeyDown = (e: any) => { if (e.key === "Enter") handleLogin(); };

  const logout = () => {
    localStorage.removeItem("token"); localStorage.removeItem("adminRole");
    setLoggedIn(false); setRole(""); setUsername(""); setPassword("");
  };

  const fetchBanks = async () => {
    try {
      const res = await axios.get(`${API_URL}/banks/view-banks`, { headers: { Authorization: `Bearer ${getToken()}` } });
      setBanks(res.data.data || []);
    } catch (error: any) { console.log(error); if (error?.response?.status === 401) logout(); }
  };

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${API_URL}/customer/all`, { headers: { Authorization: `Bearer ${getToken()}` } });
      setCustomers(res.data.data || []);
    } catch (error: any) { console.log(error); if (error?.response?.status === 401) logout(); }
  };

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/all`, { headers: { Authorization: `Bearer ${getToken()}` } });
      setAdmins(res.data.data || []);
    } catch (error: any) { alert(error?.response?.data?.message || "Failed to fetch admins"); }
  };

  const deleteAdmin = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin? This cannot be undone.")) return;
    try {
      setDeletingAdminId(id);
      await axios.delete(`${API_URL}/admin/delete/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
      setAdmins((prev) => prev.filter((a) => a._id !== id));
    } catch (error: any) { alert(error?.response?.data?.message || "Failed to delete admin"); }
    finally { setDeletingAdminId(null); }
  };

  const toggleBankStatus = async (id: string) => {
    try {
      setTogglingBankId(id);
      const res = await axios.patch(`${API_URL}/banks/toggle-status/${id}`, {}, { headers: { Authorization: `Bearer ${getToken()}` } });
      setBanks((prev) => prev.map((b) => b._id === id ? { ...b, status: res.data.data.status } : b));
    } catch (error: any) { alert(error?.response?.data?.message || "Failed to toggle bank status"); }
    finally { setTogglingBankId(null); }
  };

  const deleteBank = async (id: string) => {
    if (!confirm("Are you sure you want to delete this bank?")) return;
    try {
      setDeletingBankId(id);
      await axios.delete(`${API_URL}/banks/remove/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
      setBanks((prev) => prev.filter((b) => b._id !== id));
    } catch (error: any) { alert(error?.response?.data?.message || "Failed to delete bank"); }
    finally { setDeletingBankId(null); }
  };

  const openEditBank = (bank: any) => {
    setEditingBank(bank);
    setEditForm({
      accountLabel: bank.accountLabel,
      accountName: bank.accountName,
      maxLimit: String(bank.maxLimit),
      minLimit: String(bank.minLimit),
      sortCode: bank.sortCode,
      accountNumber: bank.accountNumber,
      totalReceived: String(bank.totalReceived ?? 0),
      totalPending: String(bank.totalPending ?? 0),
      status: bank.status ?? "on",
    });
    setShowEditBankModal(true);
  };

  const saveEditBank = async () => {
    if (!editingBank) return;
    try {
      setSavingEdit(true);
      const res = await axios.put(
        `${API_URL}/banks/edit/${editingBank._id}`,
        {
          ...editForm,
          maxLimit: Number(editForm.maxLimit),
          minLimit: Number(editForm.minLimit),
          totalReceived: Number(editForm.totalReceived),
          totalPending: Number(editForm.totalPending),
        },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setBanks((prev) => prev.map((b) => b._id === editingBank._id ? res.data.data : b));
      setShowEditBankModal(false); setEditingBank(null);
    } catch (error: any) { alert(error?.response?.data?.message || "Failed to update bank"); }
    finally { setSavingEdit(false); }
  };

  const approveAllCustomers = async () => {
    if (!confirm("Approve all customers? This cannot be undone.")) return;
    try {
      await axios.post(`${API_URL}/customer/approve-all`, {}, { headers: { Authorization: `Bearer ${getToken()}` } });
      setCustomers([]);
    } catch (error: any) { alert(error?.response?.data?.message || "Failed to approve all customers"); }
  };

  const approveCustomer = async (id: string) => {
    if (!confirm("Approve this customer?")) return;
    try {
      await axios.post(`${API_URL}/customer/approve/${id}`, {}, { headers: { Authorization: `Bearer ${getToken()}` } });
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (error: any) { alert(error?.response?.data?.message || "Failed to approve customer"); }
  };

  const deleteCustomer = async (id: string) => {
    if (!confirm("Are you sure you want to reject and delete this customer?")) return;
    try {
      await axios.delete(`${API_URL}/customer/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
      setCustomers((prev) => prev.filter((c) => c._id !== id));
    } catch (error: any) { alert(error?.response?.data?.message || "Failed to delete customer"); }
  };

  const addBank = async () => {
    try {
      await axios.post(`${API_URL}/banks/add`, { ...bankForm, maxLimit: Number(bankForm.maxLimit), minLimit: Number(bankForm.minLimit) }, { headers: { Authorization: `Bearer ${getToken()}` } });
      setShowBankModal(false);
      setBankForm({ accountLabel: "", accountName: "", maxLimit: "", minLimit: "", sortCode: "", accountNumber: "" });
      fetchBanks();
    } catch (error: any) { alert(error?.response?.data?.message || "Failed to add bank"); }
  };

  const addAdmin = async () => {
    try {
      await axios.post(`${API_URL}/admin/create-new`, adminForm, { headers: { Authorization: `Bearer ${getToken()}` } });
      alert("Admin created successfully");
      setShowAdminModal(false); setAdminForm({ username: "", password: "" });
    } catch (error: any) { alert(error?.response?.data?.message || "Failed to create admin"); }
  };

  const editSelf = async () => {
    if (!settingsForm.username && !settingsForm.password) {
      alert("Provide at least a new username or password.");
      return;
    }
    try {
      setSavingSettings(true);
      const payload: any = {};
      if (settingsForm.username) payload.username = settingsForm.username;
      if (settingsForm.password) payload.password = settingsForm.password;
      await axios.patch(`${API_URL}/admin/edit-self`, payload, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      alert("Account updated. Please log in again.");
      logout();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to update account");
    } finally {
      setSavingSettings(false);
    }
  };

  const saveSpreadsheetId = async () => {
    if (!spreadsheetId.trim()) { alert("Please enter a spreadsheet ID."); return; }
    try {
      setSavingSpreadsheet(true);
      await axios.post(`${API_URL}/spreadsheet/change`, { googleSheetId: spreadsheetId.trim() }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      alert("Spreadsheet ID updated successfully.");
      setShowSpreadsheetModal(false);
      setSpreadsheetId("");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to update spreadsheet ID");
    } finally {
      setSavingSpreadsheet(false);
    }
  };

  // ---- LOGIN SCREEN ----
  if (!loggedIn) {
    return (
      <>
        <style>{adminStyles}</style>
        <div className="adm-login-page">
          <div className="adm-login-card">
            <span className="adm-login-eyebrow">Admin Portal</span>
            <h2 className="adm-login-title">Junior Layer</h2>
            <p className="adm-login-sub">Sign in to your dashboard</p>
            <input className="adm-input" placeholder="Username" value={username}
              onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} />
            <input className="adm-input" type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
            <button className="adm-login-btn" onClick={handleLogin} disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </div>
        </div>
      </>
    );
  }

  // ---- MAIN DASHBOARD ----
  return (
    <>
      <style>{adminStyles}</style>
      <div className="adm-root">

        {/* TOPBAR */}
        <div className="adm-topbar">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="adm-topbar-brand">ADMIN PORTAL</span>
          </div>
          <div className="adm-topbar-actions">

            {/* MANAGE ADMIN — superadmin only */}
            {role === "superadmin" && (
              <div className="adm-dropdown-wrap">
                <button className="adm-manage-btn" onClick={(e) => { e.stopPropagation(); setShowManageDropdown((p) => !p); }}>
                  Manage Admin ▾
                </button>
                {showManageDropdown && (
                  <div className="adm-topbar-dropdown" onClick={(e) => e.stopPropagation()}>
                    <button className="adm-topbar-dropdown-item" onClick={() => { setShowAdminModal(true); setShowManageDropdown(false); }}>
                      ➕ Add Admin
                    </button>
                    <hr className="adm-topbar-divider" />
                    <button className="adm-topbar-dropdown-item adm-topbar-dropdown-item-danger" onClick={() => { fetchAdmins(); setShowDeleteAdminModal(true); setShowManageDropdown(false); }}>
                      🗑️ Delete Admin
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS DROPDOWN */}
            <div className="adm-dropdown-wrap">
              <button className="adm-manage-btn" onClick={(e) => { e.stopPropagation(); setShowSettingsDropdown((p) => !p); }}>
                ⚙️ Settings ▾
              </button>
              {showSettingsDropdown && (
                <div className="adm-topbar-dropdown" onClick={(e) => e.stopPropagation()}>
                  <button className="adm-topbar-dropdown-item" onClick={() => { setSettingsForm({ username: "", password: "" }); setShowSettingsModal(true); setShowSettingsDropdown(false); }}>
                    🔑 Change Credentials
                  </button>
                  {role === "superadmin" && (
                    <>
                      <hr className="adm-topbar-divider" />
                      <button className="adm-topbar-dropdown-item" onClick={() => { setSpreadsheetId(""); setShowSpreadsheetModal(true); setShowSettingsDropdown(false); }}>
                        📊 Edit Spreadsheet ID
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            <button className="adm-logout-btn" onClick={logout}>Logout</button>
          </div>
        </div>

        {/* TABBAR — superadmin sees both tabs, normal admin sees only Submissions */}
        <div className="adm-tabbar">
          {role === "superadmin" && (
            <button
              className={`adm-tab ${activeTab === "banks" ? "adm-tab-active" : ""}`}
              onClick={() => { setActiveTab("banks"); fetchBanks(); }}
            >
              Banks
            </button>
          )}
          <button
            className={`adm-tab ${activeTab === "submission" ? "adm-tab-active" : ""}`}
            onClick={() => { setActiveTab("submission"); fetchCustomers(); }}
          >
            Submissions
          </button>
        </div>

        {/* CONTENT */}
        <div className="adm-content">

          {/* BANKS TAB — only reachable by superadmin */}
          {activeTab === "banks" && role === "superadmin" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                <div>
                  <h3 className="adm-page-title">Banks</h3>
                  <p className="adm-page-sub">Manage all linked bank accounts</p>
                </div>

                {/* MANAGE BANKS DROPDOWN — superadmin only */}
                <div className="adm-dropdown-wrap">
                  <button className="adm-btn" onClick={(e) => { e.stopPropagation(); setShowManageBanksDropdown((p) => !p); }}>
                    Manage Banks ▾
                  </button>
                  {showManageBanksDropdown && (
                    <div className="adm-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                      <button className="adm-dropdown-item" onClick={() => { setShowBankModal(true); setShowManageBanksDropdown(false); }}>
                        ➕ Add Bank
                      </button>
                      <hr className="adm-dropdown-divider" />
                      <button className="adm-dropdown-item" onClick={() => { setShowEditBankModal(true); setEditingBank(null); setShowManageBanksDropdown(false); }}>
                        ✏️ Edit Bank
                      </button>
                      <hr className="adm-dropdown-divider" />
                      <button className="adm-dropdown-item adm-dropdown-item-danger" onClick={() => { setShowDeleteBankModal(true); setShowManageBanksDropdown(false); }}>
                        🗑️ Delete Bank
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="adm-table-wrap">
                <div style={{ overflowX: "auto" }}>
                  <table className="adm-table">
                    <thead>
                      <tr>
                        {["Label","Name","Min","Max","Sort Code","Account","Total Received","Total Pending","Status"].map(h => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {banks.length > 0 ? banks.map((b: any) => (
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
                              className={b.status === "on" ? "adm-status-on" : "adm-status-off"}
                              disabled={togglingBankId === b._id}
                              onClick={() => toggleBankStatus(b._id)}
                            >
                              {togglingBankId === b._id ? "…" : b.status === "on" ? "ON" : "OFF"}
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan={9} className="adm-empty">No banks found</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* SUBMISSIONS TAB */}
          {activeTab === "submission" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                <div>
                  <h3 className="adm-page-title">Submissions</h3>
                  <p className="adm-page-sub">Review and manage customer payment submissions</p>
                </div>
                {customers.length > 0 && (
                  <button className="adm-btn-success" style={{ padding: "10px 20px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }} onClick={approveAllCustomers}>
                    ✓ Approve All
                  </button>
                )}
              </div>

              <div className="adm-table-wrap">
                <div style={{ overflowX: "auto" }}>
                  <table className="adm-table">
                    <thead>
                      <tr>
                        {["Reference ID","Full Name","Email","Currency","Amount","Bank","Screenshot","Submitted At","Actions"].map(h => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {customers.length > 0 ? customers.map((c: any) => (
                        <tr key={c._id}>
                          <td>{c.referenceId}</td>
                          <td>{c.fullName}</td>
                          <td>{c.email}</td>
                          <td>{c.paymentCurrency}</td>
                          <td>{c.amount}</td>
                          <td>{c.bank?.accountLabel || c.bank?.accountName || "—"}</td>
                          <td>
                            <button className="adm-btn-view" onClick={() => window.open(c.screenshotUrl, "_blank")}>
                              View
                            </button>
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {new Date(c.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "6px" }}>
                              <button className="adm-btn-success" onClick={() => approveCustomer(c._id)}>Approve</button>
                              <button className="adm-btn-danger" onClick={() => deleteCustomer(c._id)}>Reject</button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan={9} className="adm-empty">No submissions found</td></tr>
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
          <AdminModal title="Add Bank Account" onClose={() => setShowBankModal(false)}>
            <label className="adm-label">Bank / Account Label</label>
            <input className="adm-modal-input" placeholder="e.g. Tide Bank — GBP" value={bankForm.accountLabel}
              onChange={(e) => setBankForm({ ...bankForm, accountLabel: e.target.value })} />
            <label className="adm-label">Account Name</label>
            <input className="adm-modal-input" placeholder="e.g. Global Traders Ltd" value={bankForm.accountName}
              onChange={(e) => setBankForm({ ...bankForm, accountName: e.target.value })} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label className="adm-label">Sort Code</label>
                <input className="adm-modal-input" placeholder="XX-XX-XX" value={bankForm.sortCode}
                  onChange={(e) => setBankForm({ ...bankForm, sortCode: e.target.value })} />
              </div>
              <div>
                <label className="adm-label">Account Number</label>
                <input className="adm-modal-input" placeholder="XXXXXXXX" value={bankForm.accountNumber}
                  onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })} />
              </div>
            </div>
            <div className="adm-range-box">
              <div className="adm-range-title">💡 Payment Range (optional)</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="adm-label">Min Amount (£)</label>
                  <input className="adm-modal-input" placeholder="0" value={bankForm.minLimit}
                    onChange={(e) => setBankForm({ ...bankForm, minLimit: e.target.value })} />
                </div>
                <div>
                  <label className="adm-label">Max Amount (£)</label>
                  <input className="adm-modal-input" placeholder="9999" value={bankForm.maxLimit}
                    onChange={(e) => setBankForm({ ...bankForm, maxLimit: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn-outline" onClick={() => setShowBankModal(false)}>Cancel</button>
              <button className="adm-btn" onClick={addBank}>Add Account</button>
            </div>
          </AdminModal>
        )}

        {/* DELETE BANK MODAL */}
        {showDeleteBankModal && (
          <AdminModal title="Delete Bank" onClose={() => setShowDeleteBankModal(false)}>
            {banks.length === 0 ? <p style={{ color: "var(--muted)", textAlign: "center", padding: "20px 0" }}>No banks found.</p> : (
              banks.map((b: any) => (
                <div key={b._id} className="adm-bank-list-item" style={{ cursor: "default" }}>
                  <div>
                    <div className="adm-bank-list-name">{b.accountLabel}</div>
                    <div className="adm-bank-list-sub">{b.accountName} — {b.accountNumber}</div>
                  </div>
                  <button className="adm-btn-danger" disabled={deletingBankId === b._id} onClick={() => deleteBank(b._id)}>
                    {deletingBankId === b._id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              ))
            )}
            <div className="adm-modal-footer">
              <button className="adm-btn-outline" onClick={() => setShowDeleteBankModal(false)}>Close</button>
            </div>
          </AdminModal>
        )}

        {/* EDIT BANK — step 1: select */}
        {showEditBankModal && !editingBank && (
          <AdminModal title="Edit Bank — Select" onClose={() => setShowEditBankModal(false)}>
            {banks.length === 0 ? <p style={{ color: "var(--muted)", textAlign: "center", padding: "20px 0" }}>No banks found.</p> : (
              banks.map((b: any) => (
                <div key={b._id} className="adm-bank-list-item" onClick={() => openEditBank(b)}>
                  <div>
                    <div className="adm-bank-list-name">{b.accountLabel}</div>
                    <div className="adm-bank-list-sub">{b.accountName} — {b.accountNumber}</div>
                  </div>
                  <span style={{ fontSize: "12px", color: "var(--muted)" }}>Edit ›</span>
                </div>
              ))
            )}
            <div className="adm-modal-footer">
              <button className="adm-btn-outline" onClick={() => setShowEditBankModal(false)}>Close</button>
            </div>
          </AdminModal>
        )}

        {/* EDIT BANK — step 2: form */}
        {showEditBankModal && editingBank && (
          <AdminModal title={`Edit — ${editingBank.accountLabel}`} onClose={() => { setShowEditBankModal(false); setEditingBank(null); }}>
            <label className="adm-label">Bank / Account Label</label>
            <input className="adm-modal-input" value={editForm.accountLabel}
              onChange={(e) => setEditForm({ ...editForm, accountLabel: e.target.value })} />
            <label className="adm-label">Account Name</label>
            <input className="adm-modal-input" value={editForm.accountName}
              onChange={(e) => setEditForm({ ...editForm, accountName: e.target.value })} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label className="adm-label">Sort Code</label>
                <input className="adm-modal-input" value={editForm.sortCode}
                  onChange={(e) => setEditForm({ ...editForm, sortCode: e.target.value })} />
              </div>
              <div>
                <label className="adm-label">Account Number</label>
                <input className="adm-modal-input" value={editForm.accountNumber}
                  onChange={(e) => setEditForm({ ...editForm, accountNumber: e.target.value })} />
              </div>
            </div>
            <div className="adm-range-box">
              <div className="adm-range-title">💡 Payment Range</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="adm-label">Min Amount (£)</label>
                  <input className="adm-modal-input" value={editForm.minLimit}
                    onChange={(e) => setEditForm({ ...editForm, minLimit: e.target.value })} />
                </div>
                <div>
                  <label className="adm-label">Max Amount (£)</label>
                  <input className="adm-modal-input" value={editForm.maxLimit}
                    onChange={(e) => setEditForm({ ...editForm, maxLimit: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="adm-range-box">
              <div className="adm-range-title">📊 Totals</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="adm-label">Total Received (£)</label>
                  <input className="adm-modal-input" type="number" min="0" value={editForm.totalReceived}
                    onChange={(e) => setEditForm({ ...editForm, totalReceived: e.target.value })} />
                </div>
                <div>
                  <label className="adm-label">Total Pending (£)</label>
                  <input className="adm-modal-input" type="number" min="0" value={editForm.totalPending}
                    onChange={(e) => setEditForm({ ...editForm, totalPending: e.target.value })} />
                </div>
              </div>
            </div>
            <label className="adm-label">Status</label>
            <select
              className="adm-modal-input"
              value={editForm.status}
              onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
            >
              <option value="on">ON</option>
              <option value="off">OFF</option>
            </select>
            <div className="adm-modal-footer">
              <button className="adm-btn-outline" onClick={() => setEditingBank(null)}>← Back</button>
              <button className="adm-btn" disabled={savingEdit} onClick={saveEditBank}>
                {savingEdit ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </AdminModal>
        )}

        {/* ADD ADMIN MODAL */}
        {showAdminModal && role === "superadmin" && (
          <AdminModal title="Add Admin" onClose={() => setShowAdminModal(false)}>
            <label className="adm-label">Username</label>
            <input className="adm-modal-input" placeholder="Username" value={adminForm.username}
              onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })} />
            <label className="adm-label">Password</label>
            <input className="adm-modal-input" type="password" minLength={8} placeholder="Password" value={adminForm.password}
              onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })} />
            <button className="adm-btn" style={{ width: "100%", marginTop: "4px" }} onClick={addAdmin}>
              Create Admin
            </button>
          </AdminModal>
        )}

        {/* DELETE ADMIN MODAL */}
        {showDeleteAdminModal && role === "superadmin" && (
          <AdminModal title="Delete Admin" onClose={() => setShowDeleteAdminModal(false)}>
            {admins.length === 0 ? <p style={{ color: "var(--muted)", textAlign: "center", padding: "20px 0" }}>No other admins found.</p> : (
              admins.map((a: any) => (
                <div key={a._id} className="adm-bank-list-item" style={{ cursor: "default" }}>
                  <div>
                    <div className="adm-bank-list-name">{a.username}</div>
                    <div className="adm-bank-list-sub">{a.role}</div>
                  </div>
                  <button className="adm-btn-danger" disabled={deletingAdminId === a._id} onClick={() => deleteAdmin(a._id)}>
                    {deletingAdminId === a._id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              ))
            )}
            <div className="adm-modal-footer">
              <button className="adm-btn-outline" onClick={() => setShowDeleteAdminModal(false)}>Close</button>
            </div>
          </AdminModal>
        )}

        {/* CHANGE CREDENTIALS MODAL */}
        {showSettingsModal && (
          <AdminModal title="Account Settings" onClose={() => setShowSettingsModal(false)}>
            <p style={{ fontSize: "12px", color: "var(--muted)", margin: "0 0 20px" }}>
              Leave a field blank to keep it unchanged.
            </p>
            <label className="adm-label">New Username</label>
            <input
              className="adm-modal-input"
              placeholder="Leave blank to keep unchanged"
              value={settingsForm.username}
              onChange={(e) => setSettingsForm({ ...settingsForm, username: e.target.value })}
            />
            <label className="adm-label">New Password</label>
            <input
              className="adm-modal-input"
              type="password"
              placeholder="Leave blank to keep unchanged"
              value={settingsForm.password}
              onChange={(e) => setSettingsForm({ ...settingsForm, password: e.target.value })}
            />
            <p style={{ fontSize: "11px", color: "var(--muted)", margin: "-8px 0 0" }}>
              You will be logged out after saving so the new credentials take effect.
            </p>
            <div className="adm-modal-footer">
              <button className="adm-btn-outline" onClick={() => setShowSettingsModal(false)}>Cancel</button>
              <button className="adm-btn" disabled={savingSettings} onClick={editSelf}>
                {savingSettings ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </AdminModal>
        )}

        {/* EDIT SPREADSHEET ID MODAL */}
        {showSpreadsheetModal && (
          <AdminModal title="Edit Spreadsheet ID" onClose={() => setShowSpreadsheetModal(false)}>
            <p style={{ fontSize: "12px", color: "var(--muted)", margin: "0 0 20px" }}>
              Enter the new Google Spreadsheet ID below.
            </p>
            <label className="adm-label">Spreadsheet ID</label>
            <input
              className="adm-modal-input"
              placeholder="e.g. 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
              value={spreadsheetId}
              onChange={(e) => setSpreadsheetId(e.target.value)}
            />
            <div className="adm-modal-footer">
              <button className="adm-btn-outline" onClick={() => setShowSpreadsheetModal(false)}>Cancel</button>
              <button className="adm-btn" disabled={savingSpreadsheet} onClick={saveSpreadsheetId}>
                {savingSpreadsheet ? "Saving…" : "Save"}
              </button>
            </div>
          </AdminModal>
        )}

      </div>
    </>
  );
}

function AdminModal({ title, children, onClose }: any) {
  return (
    <div className="adm-modal-overlay">
      <div className="adm-modal">
        <div className="adm-modal-header">
          <h4 className="adm-modal-title">{title}</h4>
          <button className="adm-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="adm-modal-body">{children}</div>
      </div>
    </div>
  );
}