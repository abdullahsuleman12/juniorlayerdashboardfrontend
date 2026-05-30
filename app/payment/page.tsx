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
//     const fetchBanks = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/banks/view-banks`);
//         const data = (res.data.data || []).filter((b: any) => b.status !== "off");
//         setBanks(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchBanks();
//   }, []);

//   useEffect(() => {
//     const amount = Number(form.amount);

//     if (!amount) {
//       setFilteredBanks([]);
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

//     if (!form.fullName || !form.email || !form.amount || !form.bank || !screenshotFile) {
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
//           <p className="text-muted">We'll verify your payment shortly.</p>
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
//           {["Your Details", "Pick Bank", "Upload Proof", "Submit"].map((s, i) => (
//             <div key={i} className="flex-fill">
//               <div
//                 className="rounded-circle bg-dark text-white mx-auto d-flex align-items-center justify-content-center"
//                 style={{ width: 30, height: 30, fontSize: "14px" }}
//               >
//                 {i + 1}
//               </div>
//               <small className="d-block mt-1">{s}</small>
//             </div>
//           ))}
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

//         <div className="d-flex gap-2 mb-3">
//           <select
//             className="form-select"
//             value={form.paymentCurrency}
//             onChange={(e) => setForm({ ...form, paymentCurrency: e.target.value })}
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

//         {/* STEP 2
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
//             <div className="text-muted small">
//               {form.amount
//                 ? "No banks available for this amount"
//                 : "Enter an amount above to see available banks"}
//             </div>
//           )}
//         </div> */}
//         {/* STEP 2 */}
//       <h6 className="fw-bold mb-2 mt-3">Step 2 — Select Bank</h6>

//       <div className="d-flex flex-column gap-2 mb-3">
//         {filteredBanks.length > 0 ? (
//           filteredBanks.map((b) => (
//             <label
//               key={b._id}
//               className={`border rounded p-3 d-flex justify-content-between align-items-start ${
//                 form.bank === b._id ? "border-dark" : ""
//               }`}
//               style={{ cursor: "pointer" }}
//             >
//               <div className="flex-grow-1">
//                 {/* Bank Label */}
//                 <div className="fw-semibold mb-2">{b.accountLabel}</div>

//                 {/* Account Name */}
//                 <div className="d-flex align-items-center gap-2 mb-1">
//                   <small className="text-muted" style={{ width: "100px" }}>Account Name</small>
//                   <small className="fw-medium">{b.accountName}</small>
//                   <button
//                     type="button"
//                     className="btn btn-sm btn-outline-secondary py-0 px-1 ms-1"
//                     style={{ fontSize: "11px" }}
//                     onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(b.accountName); }}
//                   >
//                     Copy
//                   </button>
//                 </div>

//                 {/* Account Number */}
//                 <div className="d-flex align-items-center gap-2 mb-1">
//                   <small className="text-muted" style={{ width: "100px" }}>Account No.</small>
//                   <small className="fw-medium">{b.accountNumber}</small>
//                   <button
//                     type="button"
//                     className="btn btn-sm btn-outline-secondary py-0 px-1 ms-1"
//                     style={{ fontSize: "11px" }}
//                     onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(b.accountNumber); }}
//                   >
//                     Copy
//                   </button>
//                 </div>

//                 {/* Sort Code */}
//                 <div className="d-flex align-items-center gap-2">
//                   <small className="text-muted" style={{ width: "100px" }}>Sort Code</small>
//                   <small className="fw-medium">{b.sortCode}</small>
//                   <button
//                     type="button"
//                     className="btn btn-sm btn-outline-secondary py-0 px-1 ms-1"
//                     style={{ fontSize: "11px" }}
//                     onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(b.sortCode); }}
//                   >
//                     Copy
//                   </button>
//                 </div>
//               </div>

//               <input
//                 type="radio"
//                 name="bank"
//                 className="mt-1 ms-3"
//                 checked={form.bank === b._id}
//                 onChange={() => setForm({ ...form, bank: b._id })}
//               />
//             </label>
//           ))
//         ) : (
//           <div className="text-muted small">
//             {form.amount
//               ? "No banks available for this amount"
//               : "Enter an amount above to see available banks"}
//           </div>
//         )}
//       </div>

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





































// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function PaymentPage() {
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   const currencies = ["GBP"];

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
//     const fetchBanks = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/banks/view-banks`);
//         const data = (res.data.data || []).filter((b: any) => b.status !== "off");
//         setBanks(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchBanks();
//   }, []);

//   useEffect(() => {
//     const amount = Number(form.amount);
//     if (!amount) { setFilteredBanks([]); return; }
//     setFilteredBanks(banks.filter((b) => amount >= b.minLimit && amount <= b.maxLimit));
//   }, [form.amount, banks]);

//   const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleFile = (e: any) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setScreenshotFile(file);
//     setPreviewUrl(URL.createObjectURL(file));
//   };

//   const handleSubmit = async () => {
//     if (loading) return;
//     setError("");
//     if (!form.fullName || !form.email || !form.amount || !form.bank || !screenshotFile) {
//       setError("Please fill all fields and upload a screenshot.");
//       return;
//     }
//     if (!isValidEmail(form.email)) { setError("Invalid email address."); return; }
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
//     setForm({ fullName: "", email: "", paymentCurrency: "USD", amount: "", bank: "" });
//     setScreenshotFile(null);
//     setPreviewUrl("");
//     setSubmitted(false);
//     setError("");
//   };

//   if (submitted) {
//     return (
//       <>
//         <style>{styles}</style>
//         <div className="jl-page d-flex justify-content-center align-items-center">
//           <div className="jl-success-card text-center">
//             <div className="jl-check">✓</div>
//             <h2 className="jl-serif mt-4">Payment Submitted</h2>
//             <p className="jl-muted mt-2">We'll verify your payment and get back to you shortly.</p>
//             <button className="jl-btn mt-4" onClick={resetForm}>Submit Another</button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="jl-page">
//         <div className="jl-card mx-auto">

//           {/* Header */}
//           <div className="jl-card-top">
//             <span className="jl-eyebrow">Secure Payment</span>
//             <h2 className="jl-serif jl-card-title">Complete Your Order</h2>
//           </div>

//           {/* Step Bar */}
//           <div className="jl-stepbar">
//             {["Your Details", "Pick Bank", "Upload Proof", "Submit"].map((s, i) => (
//               <div key={i} className="jl-step">
//                 <div className="jl-step-dot">{i + 1}</div>
//                 <span className="jl-step-text">{s}</span>
//               </div>
//             ))}
//           </div>

//           <div className="jl-body">

//             {/* Step 1 */}
//             <div className="jl-section">
//               <div className="jl-section-title">
//                 <span className="jl-num">01</span> Your Details
//               </div>
//               <input className="jl-input" placeholder="Full Name" value={form.fullName}
//                 onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
//               <input className="jl-input" placeholder="Email Address" value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })} />
//               <div className="jl-row">
//                 <select className="jl-select" value={form.paymentCurrency}
//                   onChange={(e) => setForm({ ...form, paymentCurrency: e.target.value })}>
//                   {currencies.map((c) => <option key={c}>{c}</option>)}
//                 </select>
//                 <input className="jl-input jl-flex1" placeholder="Amount" value={form.amount}
//                   onChange={(e) => setForm({ ...form, amount: e.target.value })} />
//               </div>
//             </div>

//             {/* Step 2 */}
//             <div className="jl-section">
//               <div className="jl-section-title">
//                 <span className="jl-num">02</span> Select Bank
//               </div>
//               {filteredBanks.length > 0 ? filteredBanks.map((b) => (
//                 <label key={b._id} className={`jl-bank ${form.bank === b._id ? "jl-bank-on" : ""}`}>
//                   <div className="jl-bank-info">
//                     <div className="jl-bank-name">{b.accountLabel}</div>
//                     {[
//                       { k: "Account Name", v: b.accountName },
//                       { k: "Account No.", v: b.accountNumber },
//                       { k: "Sort Code", v: b.sortCode },
//                     ].map(({ k, v }) => (
//                       <div key={k} className="jl-bank-row">
//                         <span className="jl-bank-key">{k}</span>
//                         <span className="jl-bank-val">{v}</span>
//                         <button type="button" className="jl-copy"
//                           onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(v); }}>
//                           Copy
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                   <input type="radio" name="bank" className="jl-radio"
//                     checked={form.bank === b._id}
//                     onChange={() => setForm({ ...form, bank: b._id })} />
//                 </label>
//               )) : (
//                 <p className="jl-hint">
//                   {form.amount ? "No banks available for this amount" : "Enter an amount above to see available banks"}
//                 </p>
//               )}
//             </div>

//             {/* Step 3 */}
//             <div className="jl-section">
//               <div className="jl-section-title">
//                 <span className="jl-num">03</span> Upload Proof of Payment
//               </div>
//               <label className="jl-upload">
//                 <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
//                 <span className="jl-upload-icon">↑</span>
//                 <span>{screenshotFile ? screenshotFile.name : "Choose screenshot"}</span>
//               </label>
//               {previewUrl && <img src={previewUrl} className="jl-preview" alt="Preview" />}
//             </div>

//             {/* Error */}
//             {error && <div className="jl-error">{error}</div>}

//             {/* Step 4 */}
//             <div className="jl-section" style={{ borderBottom: "none", paddingBottom: 0 }}>
//               <div className="jl-section-title">
//                 <span className="jl-num">04</span> Submit
//               </div>
//               <button className="jl-btn" onClick={handleSubmit} disabled={loading}>
//                 {loading ? "Submitting…" : "Submit Payment"}
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Lato:wght@300;400;600&display=swap');

//   :root {
//     --navy:    #1C2B3A;
//     --navy2:   #243447;
//     --cream:   #F5F0E8;
//     --cream2:  #EDE7D9;
//     --orange:  #C0622F;
//     --white:   #FFFFFF;
//     --muted:   rgba(255,255,255,0.55);
//     --border:  rgba(255,255,255,0.12);
//   }

//   .jl-page {
//     background: var(--navy);
//     min-height: 100vh;
//     padding: 80px 16px 48px;
//     font-family: 'Lato', sans-serif;
//     display: flex;
//     justify-content: center;
//     align-items: flex-start;
//   }

//   .jl-card {
//     width: 100%;
//     max-width: 600px;
//     background: var(--navy2);
//     border: 1px solid var(--border);
//     border-radius: 6px;
//     overflow: hidden;
//     box-shadow: 0 8px 48px rgba(0,0,0,0.4);
//   }

//   /* Card top banner */
//   .jl-card-top {
//     background: var(--cream);
//     padding: 32px 40px 28px;
//     border-bottom: 1px solid var(--cream2);
//   }
//   .jl-eyebrow {
//     display: block;
//     font-size: 10px;
//     font-weight: 600;
//     letter-spacing: 0.16em;
//     text-transform: uppercase;
//     color: var(--orange);
//     margin-bottom: 6px;
//   }
//   .jl-serif { font-family: 'Playfair Display', serif; }
//   .jl-card-title {
//     font-size: 26px;
//     font-weight: 600;
//     color: var(--navy);
//     margin: 0;
//   }

//   /* Step bar */
//   .jl-stepbar {
//     display: flex;
//     background: rgba(0,0,0,0.25);
//     border-bottom: 1px solid var(--border);
//     padding: 16px 40px;
//     gap: 0;
//     justify-content: space-between;
//     position: relative;
//   }
//   .jl-stepbar::before {
//     content: '';
//     position: absolute;
//     top: 26px; left: 70px; right: 70px;
//     height: 1px;
//     background: var(--border);
//   }
//   .jl-step {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 6px;
//     position: relative;
//     z-index: 1;
//   }
//   .jl-step-dot {
//     width: 28px; height: 28px;
//     border-radius: 50%;
//     background: var(--orange);
//     color: #fff;
//     font-size: 12px;
//     font-weight: 700;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   .jl-step-text {
//     font-size: 10px;
//     color: var(--muted);
//     letter-spacing: 0.04em;
//     white-space: nowrap;
//   }

//   /* Body */
//   .jl-body { padding: 0 40px 40px; }

//   .jl-section {
//     padding: 28px 0;
//     border-bottom: 1px solid var(--border);
//   }
//   .jl-section-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 15px;
//     font-weight: 600;
//     color: var(--white);
//     margin-bottom: 18px;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }
//   .jl-num {
//     font-family: 'Lato', sans-serif;
//     font-size: 10px;
//     font-weight: 700;
//     color: var(--orange);
//     letter-spacing: 0.1em;
//   }

//   /* Inputs */
//   .jl-input, .jl-select {
//     width: 100%;
//     padding: 11px 14px;
//     background: rgba(0,0,0,0.25);
//     border: 1px solid var(--border);
//     border-radius: 3px;
//     color: var(--white);
//     font-family: 'Lato', sans-serif;
//     font-size: 14px;
//     margin-bottom: 10px;
//     outline: none;
//     transition: border-color 0.2s;
//     -webkit-appearance: none;
//     appearance: none;
//   }
//   .jl-input::placeholder { color: var(--muted); }
//   .jl-input:focus, .jl-select:focus { border-color: var(--orange); }
//   .jl-select option { background: var(--navy); color: #fff; }
//   .jl-row { display: flex; gap: 10px; }
//   .jl-row .jl-select { width: 130px; flex-shrink: 0; margin-bottom: 0; }
//   .jl-flex1 { flex: 1; margin-bottom: 0; }

//   /* Bank cards */
//   .jl-bank {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     border: 1px solid var(--border);
//     border-radius: 4px;
//     padding: 16px;
//     cursor: pointer;
//     margin-bottom: 10px;
//     background: rgba(0,0,0,0.15);
//     transition: border-color 0.2s, background 0.2s;
//   }
//   .jl-bank:hover { border-color: rgba(255,255,255,0.3); }
//   .jl-bank-on { border-color: var(--orange) !important; background: rgba(192,98,47,0.1) !important; }
//   .jl-bank-info { flex: 1; }
//   .jl-bank-name {
//     font-family: 'Playfair Display', serif;
//     font-size: 14px;
//     color: var(--white);
//     margin-bottom: 10px;
//   }
//   .jl-bank-row {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     margin-bottom: 5px;
//   }
//   .jl-bank-key { font-size: 11px; color: var(--muted); width: 88px; flex-shrink: 0; }
//   .jl-bank-val { font-size: 12px; color: var(--white); font-weight: 600; }
//   .jl-copy {
//     background: none;
//     border: 1px solid var(--border);
//     border-radius: 2px;
//     padding: 1px 7px;
//     font-size: 10px;
//     color: var(--muted);
//     cursor: pointer;
//     font-family: 'Lato', sans-serif;
//     letter-spacing: 0.04em;
//     transition: all 0.15s;
//   }
//   .jl-copy:hover { border-color: var(--orange); color: var(--orange); }
//   .jl-radio { width: 16px; height: 16px; margin-top: 2px; flex-shrink: 0; accent-color: var(--orange); }

//   /* Upload */
//   .jl-upload {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     border: 1px dashed var(--border);
//     border-radius: 3px;
//     padding: 14px 16px;
//     cursor: pointer;
//     color: var(--muted);
//     font-size: 13px;
//     transition: border-color 0.2s;
//   }
//   .jl-upload:hover { border-color: var(--orange); color: var(--white); }
//   .jl-upload-icon {
//     width: 28px; height: 28px;
//     border-radius: 50%;
//     background: var(--orange);
//     color: #fff;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 14px; flex-shrink: 0;
//   }
//   .jl-preview {
//     width: 100%; margin-top: 14px;
//     border-radius: 4px;
//     border: 1px solid var(--border);
//   }

//   /* Error */
//   .jl-error {
//     background: rgba(192,98,47,0.15);
//     border: 1px solid rgba(192,98,47,0.4);
//     color: #e8956a;
//     padding: 12px 16px;
//     border-radius: 3px;
//     font-size: 13px;
//     margin-bottom: 8px;
//   }

//   /* Hint */
//   .jl-hint { color: var(--muted); font-size: 13px; margin: 4px 0; }

//   /* Button */
//   .jl-btn {
//     background: var(--orange);
//     color: #fff;
//     border: none;
//     border-radius: 3px;
//     padding: 14px 28px;
//     font-family: 'Lato', sans-serif;
//     font-size: 12px;
//     font-weight: 700;
//     letter-spacing: 0.14em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: background 0.2s, transform 0.1s;
//     width: 100%;
//     display: block;
//   }
//   .jl-btn:hover:not(:disabled) { background: #a8531f; }
//   .jl-btn:active:not(:disabled) { transform: scale(0.99); }
//   .jl-btn:disabled { opacity: 0.5; cursor: not-allowed; }

//   /* Success */
//   .jl-success-card {
//     background: var(--navy2);
//     border: 1px solid var(--border);
//     border-radius: 6px;
//     padding: 60px 48px;
//     max-width: 380px;
//   }
//   .jl-check {
//     width: 60px; height: 60px;
//     border-radius: 50%;
//     background: var(--orange);
//     color: #fff;
//     font-size: 26px;
//     display: flex; align-items: center; justify-content: center;
//     margin: 0 auto;
//   }
//   .jl-muted { color: var(--muted); font-size: 14px; }
// `;















// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function PaymentPage() {
//   const API_URL = process.env.NEXT_PUBLIC_API_URL;
//   const currencies = ["GBP"];

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
//     paymentCurrency: "GBP",
//     amount: "",
//     bank: "",
//   });

//   useEffect(() => {
//     const fetchBanks = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/banks/view-banks`);
//         const data = (res.data.data || []).filter((b: any) => b.status !== "off");
//         setBanks(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchBanks();
//   }, []);

//   // useEffect(() => {
//   //   const amount = Number(form.amount);
//   //   if (!amount) { setFilteredBanks([]); return; }
//   //   setFilteredBanks(banks.filter((b) => amount >= b.minLimit && amount <= b.maxLimit));
//   // }, [form.amount, banks]);
//   useEffect(() => {
//     const amount = Number(form.amount);
//     if (!amount) {
//       setFilteredBanks([]);
//       setForm((prev) => ({ ...prev, bank: "" }));
//       return;
//     }
//     const filtered = banks.filter((b) => amount >= b.minLimit && amount <= b.maxLimit);
//     setFilteredBanks(filtered);
//     if (filtered.length > 0) {
//       setForm((prev) => ({ ...prev, bank: filtered[0]._id }));
//     } else {
//       setForm((prev) => ({ ...prev, bank: "" }));
//     }
//   }, [form.amount, banks]);

//   const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleFile = (e: any) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setScreenshotFile(file);
//     setPreviewUrl(URL.createObjectURL(file));
//   };

//   const handleSubmit = async () => {
//     if (loading) return;
//     setError("");
//     if (!form.fullName || !form.email || !form.amount || !form.bank || !screenshotFile) {
//       setError("Please fill all fields and upload a screenshot.");
//       return;
//     }
//     if (!isValidEmail(form.email)) { setError("Invalid email address."); return; }
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
//     setForm({ fullName: "", email: "", paymentCurrency: "USD", amount: "", bank: "" });
//     setScreenshotFile(null);
//     setPreviewUrl("");
//     setSubmitted(false);
//     setError("");
//   };

//   if (submitted) {
//     return (
//       <>
//         <style>{styles}</style>
//         <div className="jl-page d-flex justify-content-center align-items-center">
//           <div className="jl-success-card text-center">
//             <div className="jl-check">✓</div>
//             <h2 className="jl-serif mt-4">Payment Submitted</h2>
//             <p className="jl-muted mt-2">We'll verify your payment and get back to you shortly.</p>
//             <button className="jl-btn mt-4" onClick={resetForm}>Submit Another</button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="jl-page">
//         <div className="jl-card mx-auto">

//           {/* Header */}
//           <div className="jl-card-top">
//             <span className="jl-eyebrow">Secure Payment</span>
//             <h2 className="jl-serif jl-card-title">Complete Your Order</h2>
//           </div>

//           {/* Step Bar */}
//           <div className="jl-stepbar">
//             {["Your Details", "Pick Bank", "Upload Proof", "Submit"].map((s, i) => (
//               <div key={i} className="jl-step">
//                 <div className="jl-step-dot">{i + 1}</div>
//                 <span className="jl-step-text">{s}</span>
//               </div>
//             ))}
//           </div>

//           <div className="jl-body">

//             {/* Step 1 */}
//             <div className="jl-section">
//               <div className="jl-section-title">
//                 <span className="jl-num">01</span> Your Details
//               </div>
//               <input className="jl-input" placeholder="Full Name" value={form.fullName}
//                 onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
//               <input className="jl-input" placeholder="Email Address" value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })} />
//               <div className="jl-row">
//                 <select className="jl-select" value={form.paymentCurrency}
//                   onChange={(e) => setForm({ ...form, paymentCurrency: e.target.value })}>
//                   {currencies.map((c) => <option key={c}>{c}</option>)}
//                 </select>
//                 <input className="jl-input jl-flex1" placeholder="Amount" value={form.amount}
//                   onChange={(e) => setForm({ ...form, amount: e.target.value })} />
//               </div>
//             </div>

//             {/* Step 2 */}
//             <div className="jl-section">
//               <div className="jl-section-title">
//                 <span className="jl-num">02</span> Select Bank
//               </div>
//               {filteredBanks.length > 0 ? filteredBanks.map((b) => (
//                 <label key={b._id} className={`jl-bank ${form.bank === b._id ? "jl-bank-on" : ""}`}>
//                   <div className="jl-bank-info">
//                     <div className="jl-bank-name">{b.accountLabel}</div>
//                     {[
//                       { k: "Account Name", v: b.accountName },
//                       { k: "Account No.", v: b.accountNumber },
//                       { k: "Sort Code", v: b.sortCode },
//                     ].map(({ k, v }) => (
//                       <div key={k} className="jl-bank-row">
//                         <span className="jl-bank-key">{k}</span>
//                         <span className="jl-bank-val">{v}</span>
//                         <button type="button" className="jl-copy"
//                           title="Copy"
//                           onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(v); }}>
//                           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                             <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
//                             <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
//                           </svg>
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                   <input type="radio" name="bank" className="jl-radio"
//                     checked={form.bank === b._id}
//                     onChange={() => setForm({ ...form, bank: b._id })} />
//                 </label>
//               )) : (
//                 <p className="jl-hint">
//                   {form.amount ? "No banks available for this amount" : "Enter an amount above to see available banks"}
//                 </p>
//               )}
//             </div>

//             {/* Step 3 */}
//             {/* Step 3 */}
//             <div className="jl-section">
//               <div className="jl-section-title">
//                 <span className="jl-num">03</span> Upload Proof of Payment
//               </div>
//               <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                 <label className="jl-upload" style={{ flex: 1 }}>
//                   <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
//                   <span className="jl-upload-icon">↑</span>
//                   <span>{screenshotFile ? screenshotFile.name : "Choose screenshot"}</span>
//                 </label>
//                 {screenshotFile && (
//                   <button
//                     type="button"
//                     onClick={() => { setScreenshotFile(null); setPreviewUrl(""); }}
//                     style={{
//                       background: "none",
//                       border: "1px solid var(--border)",
//                       borderRadius: "50%",
//                       width: "28px",
//                       height: "28px",
//                       color: "var(--muted)",
//                       cursor: "pointer",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "14px",
//                       flexShrink: 0,
//                       transition: "all 0.15s",
//                     }}
//                     onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--orange)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--orange)"; }}
//                     onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)"; }}
//                     title="Remove file"
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//               {previewUrl && <img src={previewUrl} className="jl-preview" alt="Preview" />}
//             </div>
//             {/* <div className="jl-section">
//               <div className="jl-section-title">
//                 <span className="jl-num">03</span> Upload Proof of Payment
//               </div>
//               <label className="jl-upload">
//                 <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
//                 <span className="jl-upload-icon">↑</span>
//                 <span>{screenshotFile ? screenshotFile.name : "Choose screenshot"}</span>
//               </label>
//               {previewUrl && <img src={previewUrl} className="jl-preview" alt="Preview" />}
//             </div> */}

//             {/* Error */}
//             {error && <div className="jl-error">{error}</div>}

//             {/* Step 4 */}
//             <div className="jl-section" style={{ borderBottom: "none", paddingBottom: 0 }}>
//               <div className="jl-section-title">
//                 <span className="jl-num">04</span> Submit
//               </div>
//               <button className="jl-btn" onClick={handleSubmit} disabled={loading}>
//                 {loading ? "Submitting…" : "Submit Payment"}
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Lato:wght@300;400;600&display=swap');

//   :root {
//     --navy:    #1C2B3A;
//     --navy2:   #243447;
//     --cream:   #F5F0E8;
//     --cream2:  #EDE7D9;
//     --orange:  #C0622F;
//     --white:   #FFFFFF;
//     --muted:   rgba(255,255,255,0.55);
//     --border:  rgba(255,255,255,0.12);
//   }

//   .jl-page {
//     background: var(--navy);
//     min-height: 100vh;
//     padding: 80px 16px 48px;
//     font-family: 'Lato', sans-serif;
//     display: flex;
//     justify-content: center;
//     align-items: flex-start;
//   }

//   .jl-card {
//     width: 100%;
//     max-width: 600px;
//     background: var(--navy2);
//     border: 1px solid var(--border);
//     border-radius: 6px;
//     overflow: hidden;
//     box-shadow: 0 8px 48px rgba(0,0,0,0.4);
//   }

//   /* Card top banner */
//   .jl-card-top {
//     background: var(--cream);
//     padding: 32px 40px 28px;
//     border-bottom: 1px solid var(--cream2);
//   }
//   .jl-eyebrow {
//     display: block;
//     font-size: 10px;
//     font-weight: 600;
//     letter-spacing: 0.16em;
//     text-transform: uppercase;
//     color: var(--orange);
//     margin-bottom: 6px;
//   }
//   .jl-serif { font-family: 'Playfair Display', serif; }
//   .jl-card-title {
//     font-size: 26px;
//     font-weight: 600;
//     color: var(--navy);
//     margin: 0;
//   }

//   /* Step bar */
//   .jl-stepbar {
//     display: flex;
//     background: rgba(0,0,0,0.25);
//     border-bottom: 1px solid var(--border);
//     padding: 16px 40px;
//     gap: 0;
//     justify-content: space-between;
//     position: relative;
//   }
//   .jl-stepbar::before {
//     content: '';
//     position: absolute;
//     top: 26px; left: 70px; right: 70px;
//     height: 1px;
//     background: var(--border);
//   }
//   .jl-step {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 6px;
//     position: relative;
//     z-index: 1;
//   }
//   .jl-step-dot {
//     width: 28px; height: 28px;
//     border-radius: 50%;
//     background: var(--orange);
//     color: #fff;
//     font-size: 12px;
//     font-weight: 700;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   .jl-step-text {
//     font-size: 10px;
//     color: var(--muted);
//     letter-spacing: 0.04em;
//     white-space: nowrap;
//   }

//   /* Body */
//   .jl-body { padding: 0 40px 40px; }

//   .jl-section {
//     padding: 28px 0;
//     border-bottom: 1px solid var(--border);
//   }
//   .jl-section-title {
//     font-family: 'Playfair Display', serif;
//     font-size: 15px;
//     font-weight: 600;
//     color: var(--white);
//     margin-bottom: 18px;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }
//   .jl-num {
//     font-family: 'Lato', sans-serif;
//     font-size: 10px;
//     font-weight: 700;
//     color: var(--orange);
//     letter-spacing: 0.1em;
//   }

//   /* Inputs */
//   .jl-input, .jl-select {
//     width: 100%;
//     padding: 11px 14px;
//     background: rgba(0,0,0,0.25);
//     border: 1px solid var(--border);
//     border-radius: 3px;
//     color: var(--white);
//     font-family: 'Lato', sans-serif;
//     font-size: 14px;
//     margin-bottom: 10px;
//     outline: none;
//     transition: border-color 0.2s;
//     -webkit-appearance: none;
//     appearance: none;
//   }
//   .jl-input::placeholder { color: var(--muted); }
//   .jl-input:focus, .jl-select:focus { border-color: var(--orange); }
//   .jl-select option { background: var(--navy); color: #fff; }
//   .jl-row { display: flex; gap: 10px; }
//   .jl-row .jl-select { width: 130px; flex-shrink: 0; margin-bottom: 0; }
//   .jl-flex1 { flex: 1; margin-bottom: 0; }

//   /* Bank cards */
//   .jl-bank {
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     border: 1px solid var(--border);
//     border-radius: 4px;
//     padding: 16px;
//     cursor: pointer;
//     margin-bottom: 10px;
//     background: rgba(0,0,0,0.15);
//     transition: border-color 0.2s, background 0.2s;
//   }
//   .jl-bank:hover { border-color: rgba(255,255,255,0.3); }
//   .jl-bank-on { border-color: var(--orange) !important; background: rgba(192,98,47,0.1) !important; }
//   .jl-bank-info { flex: 1; }
//   .jl-bank-name {
//     font-family: 'Playfair Display', serif;
//     font-size: 14px;
//     color: var(--white);
//     margin-bottom: 10px;
//   }
//   .jl-bank-row {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     margin-bottom: 5px;
//   }
//   .jl-bank-key { font-size: 11px; color: var(--muted); width: 88px; flex-shrink: 0; }
//   .jl-bank-val { font-size: 12px; color: var(--white); font-weight: 600; }
//   .jl-copy {
//     background: none;
//     border: 1px solid var(--border);
//     border-radius: 3px;
//     padding: 3px 5px;
//     color: var(--muted);
//     cursor: pointer;
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     transition: all 0.15s;
//     flex-shrink: 0;
//     line-height: 1;
//   }
//   .jl-copy:hover { border-color: var(--orange); color: var(--orange); }
//   .jl-radio { width: 16px; height: 16px; margin-top: 2px; flex-shrink: 0; accent-color: var(--orange); }

//   /* Upload */
//   .jl-upload {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     border: 1px dashed var(--border);
//     border-radius: 3px;
//     padding: 14px 16px;
//     cursor: pointer;
//     color: var(--muted);
//     font-size: 13px;
//     transition: border-color 0.2s;
//   }
//   .jl-upload:hover { border-color: var(--orange); color: var(--white); }
//   .jl-upload-icon {
//     width: 28px; height: 28px;
//     border-radius: 50%;
//     background: var(--orange);
//     color: #fff;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 14px; flex-shrink: 0;
//   }
//   .jl-preview {
//     width: 100%; margin-top: 14px;
//     border-radius: 4px;
//     border: 1px solid var(--border);
//   }

//   /* Error */
//   .jl-error {
//     background: rgba(192,98,47,0.15);
//     border: 1px solid rgba(192,98,47,0.4);
//     color: #e8956a;
//     padding: 12px 16px;
//     border-radius: 3px;
//     font-size: 13px;
//     margin-bottom: 8px;
//   }

//   /* Hint */
//   .jl-hint { color: var(--muted); font-size: 13px; margin: 4px 0; }

//   /* Button */
//   .jl-btn {
//     background: var(--orange);
//     color: #fff;
//     border: none;
//     border-radius: 3px;
//     padding: 14px 28px;
//     font-family: 'Lato', sans-serif;
//     font-size: 12px;
//     font-weight: 700;
//     letter-spacing: 0.14em;
//     text-transform: uppercase;
//     cursor: pointer;
//     transition: background 0.2s, transform 0.1s;
//     width: 100%;
//     display: block;
//   }
//   .jl-btn:hover:not(:disabled) { background: #a8531f; }
//   .jl-btn:active:not(:disabled) { transform: scale(0.99); }
//   .jl-btn:disabled { opacity: 0.5; cursor: not-allowed; }

//   /* Success */
//   .jl-success-card {
//     background: var(--navy2);
//     border: 1px solid var(--border);
//     border-radius: 6px;
//     padding: 60px 48px;
//     max-width: 380px;
//   }
//   .jl-check {
//     width: 60px; height: 60px;
//     border-radius: 50%;
//     background: var(--orange);
//     color: #fff;
//     font-size: 26px;
//     display: flex; align-items: center; justify-content: center;
//     margin: 0 auto;
//   }
//   .jl-muted { color: var(--muted); font-size: 14px; }
// `;












"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const currencies = ["GBP"];

  const [banks, setBanks] = useState<any[]>([]);
  const [filteredBanks, setFilteredBanks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    paymentCurrency: "GBP",
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
    const fetchRef = async () => {
      try {
        const res = await axios.get(`${API_URL}/counter/current`);
        setReferenceId(res.data.referenceId);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRef();
  }, []);

  useEffect(() => {
    const amount = Number(form.amount);
    if (!amount) {
      setFilteredBanks([]);
      setForm((prev) => ({ ...prev, bank: "" }));
      return;
    }
    const filtered = banks.filter((b) => amount >= b.minLimit && amount <= b.maxLimit);
    setFilteredBanks(filtered);
    if (filtered.length > 0) {
      setForm((prev) => ({ ...prev, bank: filtered[0]._id }));
    } else {
      setForm((prev) => ({ ...prev, bank: "" }));
    }
  }, [form.amount, banks]);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
      setError("Please fill all fields and upload a screenshot.");
      return;
    }
    if (!isValidEmail(form.email)) { setError("Invalid email address."); return; }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("paymentCurrency", form.paymentCurrency);
      formData.append("amount", String(form.amount));
      formData.append("bank", form.bank);
      formData.append("referenceId", referenceId)
      formData.append("screenshot", screenshotFile);
      await axios.post(`${API_URL}/customer/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await axios.post(`${API_URL}/counter/increment`);
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ fullName: "", email: "", paymentCurrency: "GBP", amount: "", bank: "" });
    setScreenshotFile(null);
    setPreviewUrl("");
    setSubmitted(false);
    setError("");
  };

  if (submitted) {
    return (
      <>
        <style>{styles}</style>
        <div className="jl-page d-flex justify-content-center align-items-center">
          <div className="jl-success-card text-center">
            <div className="jl-check">✓</div>
            <h2 className="jl-serif mt-4">Payment Submitted</h2>
            <p className="jl-muted mt-2">We'll verify your payment and get back to you shortly.</p>
            <button className="jl-btn mt-4" onClick={resetForm}>Submit Another</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="jl-page">
        <div className="jl-card mx-auto">

          {/* Header */}
          <div className="jl-card-top">
            <span className="jl-eyebrow">Secure Payment</span>
            <h2 className="jl-serif jl-card-title">Complete Your Order</h2>
          </div>

          {/* Step Bar */}
          <div className="jl-stepbar">
            {["Your Details", "Pick Bank", "Reference", "Upload Proof", "Submit"].map((s, i) => (
              <div key={i} className="jl-step">
                <div className="jl-step-dot">{i + 1}</div>
                <span className="jl-step-text">{s}</span>
              </div>
            ))}
          </div>

          <div className="jl-body">

            {/* Step 1 */}
            <div className="jl-section">
              <div className="jl-section-title">
                <span className="jl-num">01</span> Your Details
              </div>
              <input className="jl-input" placeholder="Full Name" value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              <input className="jl-input" placeholder="Email Address" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <div className="jl-row">
                <select className="jl-select" value={form.paymentCurrency}
                  onChange={(e) => setForm({ ...form, paymentCurrency: e.target.value })}>
                  {currencies.map((c) => <option key={c}>{c}</option>)}
                </select>
                <input className="jl-input jl-flex1" placeholder="Amount" value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              </div>
            </div>

            {/* Step 2 */}
            <div className="jl-section">
              <div className="jl-section-title">
                <span className="jl-num">02</span> Select Bank
              </div>
              {filteredBanks.length > 0 ? filteredBanks.map((b) => (
                <label key={b._id} className={`jl-bank ${form.bank === b._id ? "jl-bank-on" : ""}`}>
                  <div className="jl-bank-info">
                    <div className="jl-bank-name">{b.accountLabel}</div>
                    {[
                      { k: "Account Name", v: b.accountName },
                      { k: "Account No.", v: b.accountNumber },
                      { k: "Sort Code", v: b.sortCode },
                    ].map(({ k, v }) => (
                      <div key={k} className="jl-bank-row">
                        <span className="jl-bank-key">{k}</span>
                        <span className="jl-bank-val">{v}</span>
                        <button type="button" className="jl-copy"
                          title="Copy"
                          onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(v); }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <input type="radio" name="bank" className="jl-radio"
                    checked={form.bank === b._id}
                    onChange={() => setForm({ ...form, bank: b._id })} />
                </label>
              )) : (
                <p className="jl-hint">
                  {form.amount ? "No banks available for this amount" : "Enter an amount above to see available banks"}
                </p>
              )}
            </div>

            {/* Reference ID */}
            <div className="jl-section">
              <div className="jl-section-title">
                <span className="jl-num">03</span> Reference ID
              </div>
              <div style={{
                background: "rgba(0,0,0,0.25)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                padding: "16px",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "22px", fontWeight: 700, color: "var(--orange)", letterSpacing: "0.1em" }}>
                    {referenceId || "Loading..."}
                  </span>
                  <button
                    type="button"
                    className="jl-copy"
                    title="Copy"
                    onClick={() => navigator.clipboard.writeText(referenceId)}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
                <p style={{ margin: "10px 0 0", fontSize: "12px", color: "var(--muted)" }}>
                  ⚠️ Please include this Reference ID in your transaction remarks/description when making the payment.
                </p>
              </div>
            </div>

            {/* Step 4 - Upload */}
            <div className="jl-section">
              <div className="jl-section-title">
                <span className="jl-num">04</span> Upload Proof of Payment
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label className="jl-upload" style={{ flex: 1 }}>
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
                  <span className="jl-upload-icon">↑</span>
                  <span>{screenshotFile ? screenshotFile.name : "Choose screenshot"}</span>
                </label>
                {screenshotFile && (
                  <button
                    type="button"
                    onClick={() => { setScreenshotFile(null); setPreviewUrl(""); }}
                    style={{
                      background: "none",
                      border: "1px solid var(--border)",
                      borderRadius: "50%",
                      width: "28px",
                      height: "28px",
                      color: "var(--muted)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      flexShrink: 0,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--orange)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--orange)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)"; }}
                    title="Remove file"
                  >
                    ✕
                  </button>
                )}
              </div>
              {previewUrl && <img src={previewUrl} className="jl-preview" alt="Preview" />}
            </div>

            {/* Error */}
            {error && <div className="jl-error">{error}</div>}

            {/* Step 5 - Submit */}
            <div className="jl-section" style={{ borderBottom: "none", paddingBottom: 0 }}>
              <div className="jl-section-title">
                <span className="jl-num">05</span> Submit
              </div>
              <button className="jl-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting…" : "Submit Payment"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Lato:wght@300;400;600&display=swap');

  :root {
    --navy:    #1C2B3A;
    --navy2:   #243447;
    --cream:   #F5F0E8;
    --cream2:  #EDE7D9;
    --orange:  #C0622F;
    --white:   #FFFFFF;
    --muted:   rgba(255,255,255,0.55);
    --border:  rgba(255,255,255,0.12);
  }

  .jl-page {
    background: var(--navy);
    min-height: 100vh;
    padding: 80px 16px 48px;
    font-family: 'Lato', sans-serif;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .jl-card {
    width: 100%;
    max-width: 600px;
    background: var(--navy2);
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 8px 48px rgba(0,0,0,0.4);
  }

  .jl-card-top {
    background: var(--cream);
    padding: 32px 40px 28px;
    border-bottom: 1px solid var(--cream2);
  }
  .jl-eyebrow {
    display: block;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 6px;
  }
  .jl-serif { font-family: 'Playfair Display', serif; }
  .jl-card-title {
    font-size: 26px;
    font-weight: 600;
    color: var(--navy);
    margin: 0;
  }

  .jl-stepbar {
    display: flex;
    background: rgba(0,0,0,0.25);
    border-bottom: 1px solid var(--border);
    padding: 16px 40px;
    gap: 0;
    justify-content: space-between;
    position: relative;
  }
  .jl-stepbar::before {
    content: '';
    position: absolute;
    top: 26px; left: 70px; right: 70px;
    height: 1px;
    background: var(--border);
  }
  .jl-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    position: relative;
    z-index: 1;
  }
  .jl-step-dot {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: var(--orange);
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .jl-step-text {
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  .jl-body { padding: 0 40px 40px; }

  .jl-section {
    padding: 28px 0;
    border-bottom: 1px solid var(--border);
  }
  .jl-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .jl-num {
    font-family: 'Lato', sans-serif;
    font-size: 10px;
    font-weight: 700;
    color: var(--orange);
    letter-spacing: 0.1em;
  }

  .jl-input, .jl-select {
    width: 100%;
    padding: 11px 14px;
    background: rgba(0,0,0,0.25);
    border: 1px solid var(--border);
    border-radius: 3px;
    color: var(--white);
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    margin-bottom: 10px;
    outline: none;
    transition: border-color 0.2s;
    -webkit-appearance: none;
    appearance: none;
  }
  .jl-input::placeholder { color: var(--muted); }
  .jl-input:focus, .jl-select:focus { border-color: var(--orange); }
  .jl-select option { background: var(--navy); color: #fff; }
  .jl-row { display: flex; gap: 10px; }
  .jl-row .jl-select { width: 130px; flex-shrink: 0; margin-bottom: 0; }
  .jl-flex1 { flex: 1; margin-bottom: 0; }

  .jl-bank {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 16px;
    cursor: pointer;
    margin-bottom: 10px;
    background: rgba(0,0,0,0.15);
    transition: border-color 0.2s, background 0.2s;
  }
  .jl-bank:hover { border-color: rgba(255,255,255,0.3); }
  .jl-bank-on { border-color: var(--orange) !important; background: rgba(192,98,47,0.1) !important; }
  .jl-bank-info { flex: 1; }
  .jl-bank-name {
    font-family: 'Playfair Display', serif;
    font-size: 14px;
    color: var(--white);
    margin-bottom: 10px;
  }
  .jl-bank-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 5px;
  }
  .jl-bank-key { font-size: 11px; color: var(--muted); width: 88px; flex-shrink: 0; }
  .jl-bank-val { font-size: 12px; color: var(--white); font-weight: 600; }
  .jl-copy {
    background: none;
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 3px 5px;
    color: var(--muted);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
    flex-shrink: 0;
    line-height: 1;
  }
  .jl-copy:hover { border-color: var(--orange); color: var(--orange); }
  .jl-radio { width: 16px; height: 16px; margin-top: 2px; flex-shrink: 0; accent-color: var(--orange); }

  .jl-upload {
    display: flex;
    align-items: center;
    gap: 12px;
    border: 1px dashed var(--border);
    border-radius: 3px;
    padding: 14px 16px;
    cursor: pointer;
    color: var(--muted);
    font-size: 13px;
    transition: border-color 0.2s;
  }
  .jl-upload:hover { border-color: var(--orange); color: var(--white); }
  .jl-upload-icon {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: var(--orange);
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0;
  }
  .jl-preview {
    width: 100%; margin-top: 14px;
    border-radius: 4px;
    border: 1px solid var(--border);
  }

  .jl-error {
    background: rgba(192,98,47,0.15);
    border: 1px solid rgba(192,98,47,0.4);
    color: #e8956a;
    padding: 12px 16px;
    border-radius: 3px;
    font-size: 13px;
    margin-bottom: 8px;
  }

  .jl-hint { color: var(--muted); font-size: 13px; margin: 4px 0; }

  .jl-btn {
    background: var(--orange);
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 14px 28px;
    font-family: 'Lato', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    width: 100%;
    display: block;
  }
  .jl-btn:hover:not(:disabled) { background: #a8531f; }
  .jl-btn:active:not(:disabled) { transform: scale(0.99); }
  .jl-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .jl-success-card {
    background: var(--navy2);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 60px 48px;
    max-width: 380px;
  }
  .jl-check {
    width: 60px; height: 60px;
    border-radius: 50%;
    background: var(--orange);
    color: #fff;
    font-size: 26px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto;
  }
  .jl-muted { color: var(--muted); font-size: 14px; }
`;