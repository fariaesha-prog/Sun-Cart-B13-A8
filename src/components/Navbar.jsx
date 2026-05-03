"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", name: "Home" },
    { href: "/products", name: "Products" },
    { href: "/my-profile", name: "My Profile" },
  ];

  return (
    <nav style={{ background: "#fff", borderBottom: "1px solid #eee", position: "sticky", top: 0 }}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          padding: "0 20px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#D85A30" }}>
            Sun<span style={{ color: "#EF9F27" }}>Cart</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="desktop-links" style={{ display: "flex", gap: "25px" }}>
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                textDecoration: "none",
                fontSize: "14px",
                color: path === item.href ? "#D85A30" : "#555",
                borderBottom: path === item.href ? "2px solid #D85A30" : "none",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right buttons */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            href="/login"
            style={{
              padding: "6px 14px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "13px",
              textDecoration: "none",
              color: "#111",
            }}
          >
            Login
          </Link>

          <Link
            href="/register"
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              background: "#D85A30",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Register
          </Link>

          {/* hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="hamburger"
            style={{ background: "none", border: "none", display: "none" }}
          >
            <div style={{ width: "20px", height: "2px", background: "#111", margin: "4px 0" }} />
            <div style={{ width: "20px", height: "2px", background: "#111", margin: "4px 0" }} />
            <div style={{ width: "20px", height: "2px", background: "#111" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ padding: "10px 20px", borderTop: "1px solid #eee" }}>
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "8px 0",
                textDecoration: "none",
                color: path === item.href ? "#D85A30" : "#111",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-links { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}