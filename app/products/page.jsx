import products from "../../data/products.json";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  return (
    <div style={{ background: "#fafaf8", minHeight: "100vh" }}>
      <div style={{ background: "white", borderBottom: "0.5px solid #e8e6df", padding: "32px 24px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 700, color: "#1a1a18", marginBottom: 6 }}>
            All Products
          </h1>
          <p style={{ fontSize: 14, color: "#888780" }}>Discover our full summer essentials collection</p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}