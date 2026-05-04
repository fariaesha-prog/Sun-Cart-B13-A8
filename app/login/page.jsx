"use client";
import { useState, Suspense } from "react";
import { authClient } from "../../lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/my-profile";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authClient.signIn.email({ email, password });

      if (res?.error) {
        setError(res.error.message || "Invalid email or password.");
        console.log("Login failed");
      } else {
        console.log("Welcome back!");
        router.push(redirect);
      }
    } catch (err) {
      console.log(err);
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirect,
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
            Welcome Back
          </div>
          <p style={{ fontSize: 12, color: "#888" }}>
            Login to your SunCart account
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

        <form onSubmit={handleLogin}>
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

          <div style={{ marginBottom: 15 }}>
            <label style={{ fontSize: 12, color: "#555" }}>Password</label>
            <input
              className="input-sun"
              type="password"
              placeholder="••••••••"
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
            {loading ? "Logging in..." : "Login"}
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
          Don’t have an account? <Link href="/register" style={{ color: "#D85A30", textDecoration: "none" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
