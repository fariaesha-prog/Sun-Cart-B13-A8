"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import products from "../data/products.json";

const slides = [
  { badge: "Summer Sale 2025", title: "Hot Deals", highlight: "50% OFF", sub: "Shop the latest summer essentials — sunglasses, skincare, beach gear and more.", emoji: "🕶️", bg: "#FAEEDA", accent: "#D85A30" },
  { badge: "New Arrivals 🔥", title: "Fresh Styles", highlight: "Just Dropped", sub: "Discover trending summer outfits and accessories for the season.", emoji: "👙", bg: "#E1F5EE", accent: "#1D9E75" },
  { badge: "Top Skincare", title: "Protect Your Skin", highlight: "SPF Collection", sub: "Premium sunscreens and skincare to keep you glowing all summer.", emoji: "🧴", bg: "#E6F1FB", accent: "#1A5FA8" },
];

const tips = [
  { icon: "🧴", title: "Apply SPF Daily", desc: "Use SPF 30+ sunscreen every morning, even on cloudy days." },
  { icon: "💧", title: "Stay Hydrated", desc: "Drink at least 8 glasses of water daily to beat the summer heat." },
  { icon: "🕶️", title: "Protect Your Eyes", desc: "Wear UV-blocking sunglasses to shield from harmful rays." },
  { icon: "🌿", title: "Moisturize Well", desc: "After sun exposure, moisturize to restore your skin barrier." },
];

const brands = [
  { code: "SS", name: "SunShade", cat: "Eyewear", bg: "#FAEEDA", color: "#633806" },
  { code: "GL", name: "GlowLab", cat: "Skincare", bg: "#EAF3DE", color: "#27500A" },
  { code: "WV", name: "WaveVibes", cat: "Beach wear", bg: "#E6F1FB", color: "#0C447C" },
  { code: "AQ", name: "AquaCool", cat: "Accessories", bg: "#E1F5EE", color: "#085041" },
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const s = slides[slide];
  const popular = products.slice(0, 3);

  return (
    <div>

      {/* HERO */}
      <section style={{ background: s.bg, transition: "background 0.6s ease", padding: "60px 24px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <span style={{ display: "inline-block", background: s.accent, color: "white", fontSize: 11, fontWeight: 700, padding: "5px 14px", borderRadius: 99, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 16 }}>
              {s.badge}
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, color: "#1a1a18", lineHeight: 1.15, marginBottom: 10 }}>
              {s.title}<br />
              <span style={{ color: s.accent }}>{s.highlight}</span><br />
              this season
            </h1>
            <p style={{ fontSize: 15, color: "#555550", maxWidth: 360, lineHeight: 1.7, marginBottom: 28 }}>{s.sub}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/products" style={{ padding: "12px 28px", background: s.accent, color: "white", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                Shop Now
              </Link>
              <Link href="/products" style={{ padding: "12px 28px", background: "transparent", color: s.accent, border: `1.5px solid ${s.accent}`, borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                View Deals
              </Link>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 200, maxWidth: 280, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="animate__animated animate__bounceIn" style={{ fontSize: 88, lineHeight: 1, marginBottom: 14 }}>
              {s.emoji}
            </div>
            <div style={{ background: s.accent, color: "white", fontSize: 12, fontWeight: 600, padding: "6px 16px", borderRadius: 99 }}>
              New arrivals
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} style={{ border: "none", background: "none", padding: 2, cursor: "pointer" }}>
              <div className={`slider-dot${i === slide ? " active" : ""}`} />
            </button>
          ))}
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section style={{ padding: "64px 24px", background: "#fafaf8" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 700, color: "#1a1a18" }}>
              Popular Products 🔥
            </h2>
            <Link href="/products" style={{ fontSize: 13, color: "#D85A30", fontWeight: 500, textDecoration: "none" }}>View all →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {popular.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* SUMMER CARE TIPS */}
      <section style={{ background: "#E1F5EE", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 700, color: "#085041", marginBottom: 32, textAlign: "center" }}>
            Summer Care Tips ☀️
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {tips.map((tip, i) => (
              <div key={i} className="animate__animated animate__fadeInUp" style={{ animationDelay: `${i * 0.1}s`, background: "white", borderRadius: 14, padding: "22px 18px", border: "0.5px solid #9FE1CB" }}>
                <div style={{ fontSize: 30, marginBottom: 10 }}>{tip.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: "#085041", marginBottom: 6 }}>{tip.title}</div>
                <div style={{ fontSize: 13, color: "#0F6E56", lineHeight: 1.6 }}>{tip.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP BRANDS */}
      <section style={{ padding: "64px 24px", background: "#f5f3ee" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 700, color: "#1a1a18", marginBottom: 32, textAlign: "center" }}>
            Top Brands
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14 }}>
            {brands.map((b) => (
              <div key={b.name} className="card-sun" style={{ padding: "24px 16px", textAlign: "center", cursor: "pointer" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: b.bg, color: b.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, margin: "0 auto 12px" }}>
                  {b.code}
                </div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: "#1a1a18", marginBottom: 3 }}>{b.name}</div>
                <div style={{ fontSize: 12, color: "#888780" }}>{b.cat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}