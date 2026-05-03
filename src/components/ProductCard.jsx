"use client";
import Link from "next/link";

const catColors = {
  Accessories: { bg: "#FAEEDA", color: "#854F0B" },
  Skincare: { bg: "#EAF3DE", color: "#27500A" },
  Outfits: { bg: "#E6F1FB", color: "#0C447C" },
  Beach: { bg: "#E1F5EE", color: "#085041" },
  Hydration: { bg: "#EEEDFE", color: "#3C3489" },
};

function Stars({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#EF9F27" : "#e0ddd6"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span style={{ fontSize: 12, color: "#888780", marginLeft: 2 }}>{rating}</span>
    </div>
  );
}

export default function ProductCard({ product }) {
  const cat = catColors[product.category] || { bg: "#f0ede6", color: "#555" };

  return (
    <div className="card-sun" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 180, overflow: "hidden", background: "#f7f5f0", position: "relative" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        {product.stock <= 5 && (
          <div style={{ position: "absolute", top: 10, right: 10, background: "#D85A30", color: "white", fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 99 }}>
            Low stock
          </div>
        )}
      </div>
      <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
        <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 99, background: cat.bg, color: cat.color, alignSelf: "flex-start", marginBottom: 8 }}>
          {product.category}
        </span>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: "#1a1a18", marginBottom: 6, lineHeight: 1.4 }}>
          {product.name}
        </div>
        <div style={{ fontSize: 12, color: "#888780", marginBottom: 8 }}>{product.brand}</div>
        <Stars rating={product.rating} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#D85A30" }}>${product.price}</div>
          <Link
            href={`/products/${product.id}`}
            style={{ fontSize: 13, fontWeight: 500, padding: "8px 16px", borderRadius: 8, border: "1.5px solid #D85A30", color: "#D85A30", textDecoration: "none" }}
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}