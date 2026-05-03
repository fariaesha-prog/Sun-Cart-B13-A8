"use client";
import { useState } from "react";
import { signUp, signIn } from "../../lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signUp.email({
        name,
        email,
        password,
        image: photoUrl || undefined,
      });

      if (res.error) {
        setError(res.error.message || "Registration failed.");
        console.log("Registration failed");
      } else {
        console.log("Account created!");
        router.push("/login");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAEEDA", display: "flex", alignItems: "center", justifyContent: "center", padding: "30px 15px" }}>
      
      <div
        className="animate__animated animate__fadeInUp"
        style={{
          background: "#fff",
          borderRadius: 16,
          border: "1px solid #eee",
          padding: "30px 25px",
          width: "100%",
          maxWidth: 380
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#D85A30" }}>
            Create Account
          </div>
          <p style={{ fontSize: 12, color: "#888" }}>
            Join SunCart and shop the summer
          </p>
        </div>

        {error && (
          <div
            style={{
              background: "#FAECE7",
              border: "1px solid #F0997B",
              borderRadius: 6,
              padding: "8px 10px",
              marginBottom: 15,
              fontSize: 13,
              color: "#712B13"
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: "#555" }}>Full Name</label>
            <input
              className="input-sun"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: "#555" }}>Email</label>
            <input
              className="input-sun"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: "#555" }}>
              Photo URL <span style={{ color: "#aaa" }}>(optional)</span>
            </label>
            <input
              className="input-sun"
              type="text"
              placeholder="https://example.com/photo.jpg"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: 15 }}>
            <label style={{ fontSize: 12, color: "#555" }}>Password</label>
            <input
              className="input-sun"
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
              marginBottom: 14
            }}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <div style={{ flex: 1, height: 1, background: "#eee" }} />
          <span style={{ fontSize: 12, color: "#888" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#eee" }} />
        </div>

        <button
          onClick={handleGoogle}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#fff",
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 18
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#EA4335",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: "#fff"
            }}
          >
            G
          </div>
          Continue with Google
        </button>

        <p style={{ textAlign: "center", fontSize: 13, color: "#777" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#D85A30", textDecoration: "none" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}