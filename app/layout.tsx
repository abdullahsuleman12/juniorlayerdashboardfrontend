import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import BootstrapClient from "./components/BootstrapClient";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BootstrapClient />

        {/* GLOBAL NAVBAR (stays on all pages) */}
        <Navbar />

        {/* page content */}
        <div style={{ paddingTop: "70px" }}>
          {children}
        </div>
      </body>
    </html>
  );
} 