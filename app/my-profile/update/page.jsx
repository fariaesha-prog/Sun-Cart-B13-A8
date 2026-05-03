"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession, authClient } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authClient.updateUser({
        name,
        image: image || undefined
      });

      console.log("Profile updated!");
      router.push("/my-profile");
    } catch {
      console.log("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div style={{ background: "#fafaf8", minHeight: "100vh", padding: "30px 20px" }}>
      <div style={{ maxWidth: 450, margin: "0 auto" }}>

        <Link
          href="/my-profile"
          style={{ fontSize: 13, color: "#D85A30", textDecoration: "none", display: "inline-block", marginBottom: 20 }}
        >
          ← Back
        </Link>

        <div
          className="animate__animated animate__fadeInUp"
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #eee",
            padding: 25
          }}
        >
          <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
            Update Info
          </div>

          <p style={{ fontSize: 12, color: "#888", marginBottom: 20 }}>
            Change your name or profile picture
          </p>

          <form onSubmit={handleUpdate}>
            <div style={{ marginBottom: 15 }}>
              <label style={{ fontSize: 12, color: "#555" }}>
                Full Name
              </label>
              <input
                className="input-sun"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, color: "#555" }}>
                Photo URL
              </label>

              <input
                className="input-sun"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/photo.jpg"
              />

              <p style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>
                Paste image link
              </p>

              {image && (
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
                  <Image
                    src={image}
                    alt="preview"
                    width={40}
                    height={40}
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #EF9F27"
                    }}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <span style={{ fontSize: 12, color: "#777" }}>
                    Preview
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "11px",
                background: loading ? "#ddd" : "#D85A30",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: loading ? "not-allowed" : "pointer",
                marginBottom: 10
              }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <Link
              href="/my-profile"
              style={{
                display: "block",
                textAlign: "center",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: 8,
                fontSize: 13,
                color: "#777",
                textDecoration: "none"
              }}
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}