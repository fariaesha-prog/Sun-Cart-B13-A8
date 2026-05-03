import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#2C2C2A", color: "#D3D1C7", padding: "48px 24px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, marginBottom: 36 }}>

          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#EF9F27", marginBottom: 10 }}>SunCart</div>
            <p style={{ fontSize: 13, color: "#B4B2A9", lineHeight: 1.7 }}>Your one-stop shop for summer essentials. Stay cool, stay stylish all season long.</p>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#D3D1C7", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Quick Links</div>
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
              { href: "/my-profile", label: "My Profile" },
              { href: "/privacy-policy", label: "Privacy Policy" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ display: "block", fontSize: 13, color: "#B4B2A9", marginBottom: 8, textDecoration: "none" }}>
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#D3D1C7", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Contact</div>
            <p style={{ fontSize: 13, color: "#B4B2A9", marginBottom: 8 }}>support@suncart.shop</p>
            <p style={{ fontSize: 13, color: "#B4B2A9", marginBottom: 8 }}>+1 (800) 786-2278</p>
            <p style={{ fontSize: 13, color: "#B4B2A9" }}>123 Manhattan, NYC NY 10001</p>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#D3D1C7", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Follow Us</div>
            <div style={{ display: "flex", gap: 10 }}>
              {["F", "Ig", "Tw"].map((s) => (
                <div key={s} style={{ width: 36, height: 36, borderRadius: 8, background: "#444441", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#D3D1C7", cursor: "pointer" }}>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "0.5px solid #444441", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontSize: 12, color: "#888780" }}>© 2025 SunCart. All rights reserved.</p>
          <Link href="/privacy-policy" style={{ fontSize: 12, color: "#888780", textDecoration: "none" }}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
