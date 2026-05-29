

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function PaymentPage() {
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   const currencies = ["USD", "PKR", "EUR", "GBP", "AED", "INR", "SAR", "CNY"];

//   const [banks, setBanks] = useState<any[]>([]);
//   const [filteredBanks, setFilteredBanks] = useState<any[]>([]);

//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState("");

//   const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState("");

//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     paymentCurrency: "USD",
//     amount: "",
//     bank: "",
//   });

//   useEffect(() => {
//       const fetchBanks = async () => {
//         try {
//           const res = await axios.get(`${API_URL}/banks/view-banks`);
//           const data = (res.data.data || []).filter((b: any) => b.status !== "off");
//           setBanks(data);
//           setFilteredBanks(data);
//         } catch (err) {
//           console.log(err);
//         }
//       };

//       fetchBanks();
//     }, []);

//   useEffect(() => {
//     const amount = Number(form.amount);

//     if (!amount) {
//       setFilteredBanks(banks);
//       return;
//     }

//     const filtered = banks.filter(
//       (b) => amount >= b.minLimit && amount <= b.maxLimit
//     );
//     setFilteredBanks(filtered);
//   }, [form.amount, banks]);

//   const isValidEmail = (email: string) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleFile = (e: any) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setScreenshotFile(file);
//     setPreviewUrl(URL.createObjectURL(file));
//   };

//   const handleSubmit = async () => {
//     if (loading) return;

//     setError("");

//     if (
//       !form.fullName ||
//       !form.email ||
//       !form.amount ||
//       !form.bank ||
//       !screenshotFile
//     ) {
//       setError("⚠️ Please fill all fields");
//       return;
//     }

//     if (!isValidEmail(form.email)) {
//       setError("⚠️ Invalid email address");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("fullName", form.fullName);
//       formData.append("email", form.email);
//       formData.append("paymentCurrency", form.paymentCurrency);
//       formData.append("amount", String(form.amount));
//       formData.append("bank", form.bank);
//       formData.append("screenshot", screenshotFile);

//       await axios.post(`${API_URL}/customer/create`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setSubmitted(true);
//     } catch (err: any) {
//       setError(err?.response?.data?.message || "Submission failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setForm({
//       fullName: "",
//       email: "",
//       paymentCurrency: "USD",
//       amount: "",
//       bank: "",
//     });
//     setScreenshotFile(null);
//     setPreviewUrl("");
//     setSubmitted(false);
//     setError("");
//   };

//   if (submitted) {
//     return (
//       <div className="min-vh-100 d-flex justify-content-center align-items-center bg-white text-dark">
//         <div className="text-center">
//           <div style={{ fontSize: "60px" }}>✅</div>
//           <h3 className="fw-bold mt-3">Submitted!</h3>
//           <p className="text-muted">We’ll verify your payment shortly.</p>
//           <button className="btn btn-dark mt-3" onClick={resetForm}>
//             Submit Another
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-light d-flex justify-content-center py-5">
//       <div
//         className="bg-white shadow-lg p-4 text-dark"
//         style={{ width: "600px", borderRadius: "16px" }}
//       >
//         {/* STEP INDICATOR */}
//         <div className="d-flex justify-content-between mb-4 text-center">
//           {["Your Details", "Pick Bank", "Upload Proof", "Submit"].map(
//             (s, i) => (
//               <div key={i} className="flex-fill">
//                 <div
//                   className="rounded-circle bg-dark text-white mx-auto d-flex align-items-center justify-content-center"
//                   style={{ width: 30, height: 30, fontSize: "14px" }}
//                 >
//                   {i + 1}
//                 </div>
//                 <small className="d-block mt-1">{s}</small>
//               </div>
//             )
//           )}
//         </div>

//         {/* STEP 1 */}
//         <h6 className="fw-bold mb-2">Step 1 — Your Details</h6>

//         <input
//           className="form-control mb-2"
//           placeholder="Full Name"
//           value={form.fullName}
//           onChange={(e) => setForm({ ...form, fullName: e.target.value })}
//         />

//         <input
//           className="form-control mb-3"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         {/* AMOUNT */}
//         <div className="d-flex gap-2 mb-3">
//           <select
//             className="form-select"
//             value={form.paymentCurrency}
//             onChange={(e) =>
//               setForm({ ...form, paymentCurrency: e.target.value })
//             }
//           >
//             {currencies.map((c) => (
//               <option key={c}>{c}</option>
//             ))}
//           </select>

//           <input
//             className="form-control"
//             placeholder="Amount"
//             value={form.amount}
//             onChange={(e) => setForm({ ...form, amount: e.target.value })}
//           />
//         </div>

//         {/* STEP 2 */}
//         <h6 className="fw-bold mb-2 mt-3">Step 2 — Select Bank</h6>

//         <div className="d-flex flex-column gap-2 mb-3">
//           {filteredBanks.length > 0 ? (
//             filteredBanks.map((b) => (
//               <label
//                 key={b._id}
//                 className={`border rounded p-2 d-flex justify-content-between align-items-center ${
//                   form.bank === b._id ? "border-dark" : ""
//                 }`}
//                 style={{ cursor: "pointer" }}
//               >
//                 <div>
//                   <div className="fw-semibold">{b.accountLabel}</div>
//                   <small className="text-muted">{b.accountName}</small>
//                 </div>

//                 <input
//                   type="radio"
//                   name="bank"
//                   checked={form.bank === b._id}
//                   onChange={() => setForm({ ...form, bank: b._id })}
//                 />
//               </label>
//             ))
//           ) : (
//             <div className="text-muted">No banks available</div>
//           )}
//         </div>

//         {/* STEP 3 */}
//         <h6 className="fw-bold mb-2">Step 3 — Upload Proof</h6>

//         <input
//           type="file"
//           accept="image/*"
//           className="form-control mb-2"
//           onChange={handleFile}
//         />

//         {previewUrl && (
//           <img
//             src={previewUrl}
//             className="w-100 mb-3"
//             style={{ borderRadius: "10px" }}
//           />
//         )}

//         {/* ERROR */}
//         {error && <div className="alert alert-danger py-2">{error}</div>}

//         {/* STEP 4 */}
//         <h6 className="fw-bold mb-2">Step 4 — Submit</h6>

//         <button
//           className="btn btn-dark w-100"
//           onClick={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit Payment"}
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const currencies = ["USD", "PKR", "EUR", "GBP", "AED", "INR", "SAR", "CNY"];

  const [banks, setBanks] = useState<any[]>([]);
  const [filteredBanks, setFilteredBanks] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    paymentCurrency: "USD",
    amount: "",
    bank: "",
  });

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await axios.get(`${API_URL}/banks/view-banks`);
        const data = (res.data.data || []).filter((b: any) => b.status !== "off");
        setBanks(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBanks();
  }, []);

  useEffect(() => {
    const amount = Number(form.amount);

    if (!amount) {
      setFilteredBanks([]);
      return;
    }

    const filtered = banks.filter(
      (b) => amount >= b.minLimit && amount <= b.maxLimit
    );
    setFilteredBanks(filtered);
  }, [form.amount, banks]);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setScreenshotFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (loading) return;

    setError("");

    if (!form.fullName || !form.email || !form.amount || !form.bank || !screenshotFile) {
      setError("⚠️ Please fill all fields");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("⚠️ Invalid email address");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("paymentCurrency", form.paymentCurrency);
      formData.append("amount", String(form.amount));
      formData.append("bank", form.bank);
      formData.append("screenshot", screenshotFile);

      await axios.post(`${API_URL}/customer/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSubmitted(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      email: "",
      paymentCurrency: "USD",
      amount: "",
      bank: "",
    });
    setScreenshotFile(null);
    setPreviewUrl("");
    setSubmitted(false);
    setError("");
  };

  if (submitted) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-white text-dark">
        <div className="text-center">
          <div style={{ fontSize: "60px" }}>✅</div>
          <h3 className="fw-bold mt-3">Submitted!</h3>
          <p className="text-muted">We'll verify your payment shortly.</p>
          <button className="btn btn-dark mt-3" onClick={resetForm}>
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light d-flex justify-content-center py-5">
      <div
        className="bg-white shadow-lg p-4 text-dark"
        style={{ width: "600px", borderRadius: "16px" }}
      >
        {/* STEP INDICATOR */}
        <div className="d-flex justify-content-between mb-4 text-center">
          {["Your Details", "Pick Bank", "Upload Proof", "Submit"].map((s, i) => (
            <div key={i} className="flex-fill">
              <div
                className="rounded-circle bg-dark text-white mx-auto d-flex align-items-center justify-content-center"
                style={{ width: 30, height: 30, fontSize: "14px" }}
              >
                {i + 1}
              </div>
              <small className="d-block mt-1">{s}</small>
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        <h6 className="fw-bold mb-2">Step 1 — Your Details</h6>

        <input
          className="form-control mb-2"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div className="d-flex gap-2 mb-3">
          <select
            className="form-select"
            value={form.paymentCurrency}
            onChange={(e) => setForm({ ...form, paymentCurrency: e.target.value })}
          >
            {currencies.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <input
            className="form-control"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </div>

        {/* STEP 2
        <h6 className="fw-bold mb-2 mt-3">Step 2 — Select Bank</h6>

        <div className="d-flex flex-column gap-2 mb-3">
          {filteredBanks.length > 0 ? (
            filteredBanks.map((b) => (
              <label
                key={b._id}
                className={`border rounded p-2 d-flex justify-content-between align-items-center ${
                  form.bank === b._id ? "border-dark" : ""
                }`}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <div className="fw-semibold">{b.accountLabel}</div>
                  <small className="text-muted">{b.accountName}</small>
                </div>
                <input
                  type="radio"
                  name="bank"
                  checked={form.bank === b._id}
                  onChange={() => setForm({ ...form, bank: b._id })}
                />
              </label>
            ))
          ) : (
            <div className="text-muted small">
              {form.amount
                ? "No banks available for this amount"
                : "Enter an amount above to see available banks"}
            </div>
          )}
        </div> */}
        {/* STEP 2 */}
      <h6 className="fw-bold mb-2 mt-3">Step 2 — Select Bank</h6>

      <div className="d-flex flex-column gap-2 mb-3">
        {filteredBanks.length > 0 ? (
          filteredBanks.map((b) => (
            <label
              key={b._id}
              className={`border rounded p-3 d-flex justify-content-between align-items-start ${
                form.bank === b._id ? "border-dark" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              <div className="flex-grow-1">
                {/* Bank Label */}
                <div className="fw-semibold mb-2">{b.accountLabel}</div>

                {/* Account Name */}
                <div className="d-flex align-items-center gap-2 mb-1">
                  <small className="text-muted" style={{ width: "100px" }}>Account Name</small>
                  <small className="fw-medium">{b.accountName}</small>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary py-0 px-1 ms-1"
                    style={{ fontSize: "11px" }}
                    onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(b.accountName); }}
                  >
                    Copy
                  </button>
                </div>

                {/* Account Number */}
                <div className="d-flex align-items-center gap-2 mb-1">
                  <small className="text-muted" style={{ width: "100px" }}>Account No.</small>
                  <small className="fw-medium">{b.accountNumber}</small>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary py-0 px-1 ms-1"
                    style={{ fontSize: "11px" }}
                    onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(b.accountNumber); }}
                  >
                    Copy
                  </button>
                </div>

                {/* Sort Code */}
                <div className="d-flex align-items-center gap-2">
                  <small className="text-muted" style={{ width: "100px" }}>Sort Code</small>
                  <small className="fw-medium">{b.sortCode}</small>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary py-0 px-1 ms-1"
                    style={{ fontSize: "11px" }}
                    onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(b.sortCode); }}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <input
                type="radio"
                name="bank"
                className="mt-1 ms-3"
                checked={form.bank === b._id}
                onChange={() => setForm({ ...form, bank: b._id })}
              />
            </label>
          ))
        ) : (
          <div className="text-muted small">
            {form.amount
              ? "No banks available for this amount"
              : "Enter an amount above to see available banks"}
          </div>
        )}
      </div>

        {/* STEP 3 */}
        <h6 className="fw-bold mb-2">Step 3 — Upload Proof</h6>

        <input
          type="file"
          accept="image/*"
          className="form-control mb-2"
          onChange={handleFile}
        />

        {previewUrl && (
          <img
            src={previewUrl}
            className="w-100 mb-3"
            style={{ borderRadius: "10px" }}
          />
        )}

        {/* ERROR */}
        {error && <div className="alert alert-danger py-2">{error}</div>}

        {/* STEP 4 */}
        <h6 className="fw-bold mb-2">Step 4 — Submit</h6>

        <button
          className="btn btn-dark w-100"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Payment"}
        </button>
      </div>
    </div>
  );
}