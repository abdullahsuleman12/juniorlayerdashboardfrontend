// // "use client"; import Link from "next/link"; export default function Navbar() { return ( <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top"> <div className="container"> {/* LEFT SIDE BRAND */} <Link className="navbar-brand fw-bold" href="/"> PayProof </Link> {/* RIGHT SIDE LINKS */} <div className="ms-auto d-flex gap-3"> <Link className="btn btn-outline-light btn-sm" href="/"> Home </Link> <Link className="btn btn-outline-light btn-sm" href="/admin"> Admin </Link> <Link className="btn btn-outline-light btn-sm" href="/payment"> Payment </Link> </div> </div> </nav> ); }

// "use client";

// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
//       <div className="container">
//         <Link className="navbar-brand fw-bold" href="/">
//           Junior Layer
//         </Link>
//       </div>
//     </nav>
//   );
// }



"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Lato:wght@400;600&display=swap');
        .jl-nav {
          background: #F5F0E8;
          border-bottom: 1px solid #D9D0BF;
          padding: 16px 0;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
        }
        .jl-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
        }
        .jl-nav-brand {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 600;
          color: #1C2B3A;
          text-decoration: none;
          letter-spacing: 0.04em;
        }
        .jl-nav-brand:hover { color: #1C2B3A; }
      `}</style>
      <nav className="jl-nav">
        <div className="jl-nav-inner">
          <Link className="jl-nav-brand" href="/">
            JUNIOR LAYER
          </Link>
        </div>
      </nav>
    </>
  );
}