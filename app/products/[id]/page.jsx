"use client";
import { useEffect } from "react";
import { useSession } from "../../../lib/auth-client";
import { useRouter, useParams } from "next/navigation";
import products from "../../../data/products.json";
import Link from "next/link";

const catColors = {
  Accessories: { bg: "#FAEEDA", color: "#854F0B" },
  Skincare: { bg: "#EAF3DE", color: "#27500A" },
  Outfits: { bg: "#E6F1FB", color: "#0C447C" },
  Beach: { bg: "#E1F5EE", color: "#085041" },
  Hydration: { bg: "#EEEDFE", color: "#3C3489" },
};

export default function ProductDetailPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace(`/login?redirect=/products/${params.id}`);
    }
  }, [session, isPending]);

  if (isPending) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>
          <div style={{ fontSize: 30 }}>☀️</div>
          <p style={{ color: "#888" }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

  const product = products.find((p) => p.id == params.id);

  if (!product) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ fontSize: 40 }}>🔍</div>
        <h2>Product not found</h2>
        <Link href="/products" style={{ color: "#D85A30" }}>← Back</Link>
      </div>
    );
  }

  const cat = catColors[product.category] || { bg: "#eee", color: "#555" };

  return (
    <div style={{ background: "#fafaf8", minHeight: "100vh", padding: "30px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        <Link href="/products" style={{ fontSize: 13, color: "#D85A30", textDecoration: "none" }}>
          ← Back to products
        </Link>

        <div
          style={{
            marginTop: 20,
            background: "white",
            borderRadius: 16,
            border: "1px solid #eee",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20
          }}
        >
          <div style={{ background: "#f7f5f0", padding: 15 }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", borderRadius: 10 }}
            />
          </div>

          <div style={{ padding: 25 }}>
            <span
              style={{
                fontSize: 12,
                padding: "4px 8px",
                borderRadius: 20,
                background: cat.bg,
                color: cat.color
              }}
            >
              {product.category}
            </span>

            <h1 style={{ marginTop: 10 }}>{product.name}</h1>

            <p style={{ fontSize: 14, color: "#777" }}>
              by {product.brand}
            </p>

            <div style={{ margin: "10px 0" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} style={{ color: s <= Math.round(product.rating) ? "#EF9F27" : "#ccc" }}>
                  ★
                </span>
              ))}
              <span style={{ fontSize: 13, color: "#777", marginLeft: 5 }}>
                {product.rating}
              </span>
            </div>

            <p style={{ fontSize: 14, color: "#555" }}>
              {product.description}
            </p>

            <div style={{ marginTop: 15 }}>
              <div style={{ fontSize: 26, fontWeight: "bold", color: "#D85A30" }}>
                ${product.price}
              </div>

              <p style={{ fontSize: 13, color: product.stock > 5 ? "green" : "#D85A30" }}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </p>
            </div>

            <button
              style={{
                marginTop: 15,
                padding: "12px 20px",
                background: "#D85A30",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer"
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}