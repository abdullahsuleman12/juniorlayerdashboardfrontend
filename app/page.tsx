// "use client";

// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <div className="min-vh-100 bg-white text-dark">

//       {/* HERO SECTION */}
//       <div className="container py-5">

//         <div className="text-center py-5">
//           <h1 className="fw-bold display-5">
//             Secure Payment Verification System
//           </h1>

//           <p className="text-muted mt-3 fs-5">
//             PayProof helps users submit payment proofs and get them verified
//             securely by admins in a fast and structured workflow.
//           </p>

//           <div className="mt-4">
//             <Link href="/payment">
//               <button className="btn btn-dark btn-lg px-4">
//                 Start Payment
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* FEATURES */}
//         <div className="row mt-5 text-center">

//           <div className="col-md-4 mb-4">
//             <div className="p-4 border rounded-3 h-100">
//               <h5 className="fw-bold">📤 Submit Proof</h5>
//               <p className="text-muted mt-2">
//                 Users can upload payment screenshots with details like email,
//                 amount, and selected bank.
//               </p>
//             </div>
//           </div>

//           <div className="col-md-4 mb-4">
//             <div className="p-4 border rounded-3 h-100">
//               <h5 className="fw-bold">🏦 Smart Bank Routing</h5>
//               <p className="text-muted mt-2">
//                 Banks are automatically filtered based on amount limits for
//                 accurate processing.
//               </p>
//             </div>
//           </div>

//           <div className="col-md-4 mb-4">
//             <div className="p-4 border rounded-3 h-100">
//               <h5 className="fw-bold">🛡 Admin Verification</h5>
//               <p className="text-muted mt-2">
//                 Super admins can manage banks, approve submissions, and create
//                 new admins securely.
//               </p>
//             </div>
//           </div>

//         </div>

//         {/* HOW IT WORKS */}
//         <div className="mt-5 p-4 border rounded-3">

//           <h4 className="fw-bold text-center mb-4">
//             How It Works
//           </h4>

//           <div className="row text-center">

//             <div className="col-md-3 mb-3">
//               <h6 className="fw-bold">1. Enter Details</h6>
//               <p className="text-muted small">
//                 User fills payment form
//               </p>
//             </div>

//             <div className="col-md-3 mb-3">
//               <h6 className="fw-bold">2. Select Bank</h6>
//               <p className="text-muted small">
//                 System filters valid banks
//               </p>
//             </div>

//             <div className="col-md-3 mb-3">
//               <h6 className="fw-bold">3. Upload Proof</h6>
//               <p className="text-muted small">
//                 Screenshot is submitted
//               </p>
//             </div>

//             <div className="col-md-3 mb-3">
//               <h6 className="fw-bold">4. Verification</h6>
//               <p className="text-muted small">
//                 Admin reviews & approves
//               </p>
//             </div>

//           </div>

//         </div>

//       </div>

//       {/* FOOTER */}
//       <div className="text-center py-4 border-top text-muted">
//         © {new Date().getFullYear()} PayProof. All rights reserved.
//       </div>

//     </div>
//   );
// }





"use client";

import Link from "next/link";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600&display=swap');

  :root {
    --navy:   #1C2B3A;
    --navy2:  #243447;
    --cream:  #F5F0E8;
    --cream2: #EDE7D9;
    --orange: #C0622F;
    --white:  #FFFFFF;
    --muted:  rgba(255,255,255,0.5);
    --border: rgba(255,255,255,0.1);
  }

  .hp-root {
    background: var(--navy);
    min-height: 100vh;
    font-family: 'Lato', sans-serif;
    color: var(--white);
  }

  /* HERO */
  .hp-hero {
    background: var(--cream);
    padding: 100px 24px 80px;
    text-align: center;
  }
  .hp-eyebrow {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 16px;
  }
  .hp-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 700;
    color: var(--navy);
    line-height: 1.15;
    max-width: 680px;
    margin: 0 auto 20px;
  }
  .hp-hero-sub {
    font-size: 16px;
    color: #7A7060;
    max-width: 520px;
    margin: 0 auto 36px;
    line-height: 1.7;
    font-weight: 300;
  }
  .hp-cta {
    display: inline-block;
    background: var(--navy);
    color: var(--white);
    text-decoration: none;
    border: none;
    border-radius: 3px;
    padding: 15px 36px;
    font-family: 'Lato', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
  }
  .hp-cta:hover { background: var(--orange); color: var(--white); }

  /* FEATURES */
  .hp-features {
    padding: 80px 24px;
    max-width: 1000px;
    margin: 0 auto;
  }
  .hp-section-eyebrow {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--orange);
    text-align: center;
    margin-bottom: 12px;
  }
  .hp-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 600;
    color: var(--white);
    text-align: center;
    margin: 0 0 48px;
  }
  .hp-features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
  }
  .hp-feature-card {
    background: var(--navy2);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 32px 28px;
    transition: border-color 0.2s;
  }
  .hp-feature-card:hover { border-color: rgba(192,98,47,0.5); }
  .hp-feature-icon {
    font-size: 24px;
    margin-bottom: 14px;
    display: block;
  }
  .hp-feature-title {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--white);
    margin: 0 0 10px;
  }
  .hp-feature-text {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.7;
    margin: 0;
  }

  /* HOW IT WORKS */
  .hp-how {
    padding: 0 24px 80px;
    max-width: 1000px;
    margin: 0 auto;
  }
  .hp-how-box {
    background: var(--navy2);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 48px 40px;
  }
  .hp-steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 32px;
    margin-top: 8px;
  }
  .hp-step {
    text-align: center;
    position: relative;
  }
  .hp-step-num {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: var(--orange);
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 14px;
    font-family: 'Lato', sans-serif;
  }
  .hp-step-title {
    font-family: 'Playfair Display', serif;
    font-size: 14px;
    font-weight: 600;
    color: var(--white);
    margin: 0 0 6px;
  }
  .hp-step-text {
    font-size: 12px;
    color: var(--muted);
    margin: 0;
    line-height: 1.6;
  }

  /* FOOTER */
  .hp-footer {
    border-top: 1px solid var(--border);
    padding: 24px;
    text-align: center;
    font-size: 12px;
    color: var(--muted);
    font-family: 'Lato', sans-serif;
    letter-spacing: 0.04em;
  }
`;

export default function HomePage() {
  return (
    <>
      <style>{styles}</style>
      <div className="hp-root">

        {/* HERO */}
        <div className="hp-hero">
          <span className="hp-eyebrow">Secure Payment Verification</span>
          <h1 className="hp-hero-title">
            Secure Payment Verification System
          </h1>
          <p className="hp-hero-sub">
            PayProof helps users submit payment proofs and get them verified
            securely by admins in a fast and structured workflow.
          </p>
          <Link href="/payment" className="hp-cta">
            Start Payment
          </Link>
        </div>

        {/* FEATURES */}
        <div className="hp-features">
          <p className="hp-section-eyebrow">What We Offer</p>
          <h2 className="hp-section-title">Everything You Need</h2>
          <div className="hp-features-grid">
            <div className="hp-feature-card">
              <span className="hp-feature-icon">📤</span>
              <h5 className="hp-feature-title">Submit Proof</h5>
              <p className="hp-feature-text">
                Users can upload payment screenshots with details like email,
                amount, and selected bank.
              </p>
            </div>
            <div className="hp-feature-card">
              <span className="hp-feature-icon">🏦</span>
              <h5 className="hp-feature-title">Smart Bank Routing</h5>
              <p className="hp-feature-text">
                Banks are automatically filtered based on amount limits for
                accurate processing.
              </p>
            </div>
            <div className="hp-feature-card">
              <span className="hp-feature-icon">🛡</span>
              <h5 className="hp-feature-title">Admin Verification</h5>
              <p className="hp-feature-text">
                Super admins can manage banks, approve submissions, and create
                new admins securely.
              </p>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="hp-how">
          <div className="hp-how-box">
            <p className="hp-section-eyebrow">The Process</p>
            <h2 className="hp-section-title" style={{ marginBottom: "36px" }}>How It Works</h2>
            <div className="hp-steps-grid">
              {[
                { n: 1, title: "Enter Details", text: "User fills payment form" },
                { n: 2, title: "Select Bank", text: "System filters valid banks" },
                { n: 3, title: "Upload Proof", text: "Screenshot is submitted" },
                { n: 4, title: "Verification", text: "Admin reviews & approves" },
              ].map(({ n, title, text }) => (
                <div key={n} className="hp-step">
                  <div className="hp-step-num">{n}</div>
                  <h6 className="hp-step-title">{title}</h6>
                  <p className="hp-step-text">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="hp-footer">
          © {new Date().getFullYear()} PayProof. All rights reserved.
        </div>

      </div>
    </>
  );
}