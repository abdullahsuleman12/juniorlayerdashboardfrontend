"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-vh-100 bg-white text-dark">

      {/* HERO SECTION */}
      <div className="container py-5">

        <div className="text-center py-5">
          <h1 className="fw-bold display-5">
            Secure Payment Verification System
          </h1>

          <p className="text-muted mt-3 fs-5">
            PayProof helps users submit payment proofs and get them verified
            securely by admins in a fast and structured workflow.
          </p>

          <div className="mt-4">
            <Link href="/payment">
              <button className="btn btn-dark btn-lg px-4">
                Start Payment
              </button>
            </Link>
          </div>
        </div>

        {/* FEATURES */}
        <div className="row mt-5 text-center">

          <div className="col-md-4 mb-4">
            <div className="p-4 border rounded-3 h-100">
              <h5 className="fw-bold">📤 Submit Proof</h5>
              <p className="text-muted mt-2">
                Users can upload payment screenshots with details like email,
                amount, and selected bank.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="p-4 border rounded-3 h-100">
              <h5 className="fw-bold">🏦 Smart Bank Routing</h5>
              <p className="text-muted mt-2">
                Banks are automatically filtered based on amount limits for
                accurate processing.
              </p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="p-4 border rounded-3 h-100">
              <h5 className="fw-bold">🛡 Admin Verification</h5>
              <p className="text-muted mt-2">
                Super admins can manage banks, approve submissions, and create
                new admins securely.
              </p>
            </div>
          </div>

        </div>

        {/* HOW IT WORKS */}
        <div className="mt-5 p-4 border rounded-3">

          <h4 className="fw-bold text-center mb-4">
            How It Works
          </h4>

          <div className="row text-center">

            <div className="col-md-3 mb-3">
              <h6 className="fw-bold">1. Enter Details</h6>
              <p className="text-muted small">
                User fills payment form
              </p>
            </div>

            <div className="col-md-3 mb-3">
              <h6 className="fw-bold">2. Select Bank</h6>
              <p className="text-muted small">
                System filters valid banks
              </p>
            </div>

            <div className="col-md-3 mb-3">
              <h6 className="fw-bold">3. Upload Proof</h6>
              <p className="text-muted small">
                Screenshot is submitted
              </p>
            </div>

            <div className="col-md-3 mb-3">
              <h6 className="fw-bold">4. Verification</h6>
              <p className="text-muted small">
                Admin reviews & approves
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <div className="text-center py-4 border-top text-muted">
        © {new Date().getFullYear()} PayProof. All rights reserved.
      </div>

    </div>
  );
}