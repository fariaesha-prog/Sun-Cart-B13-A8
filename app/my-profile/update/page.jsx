"use client";
import { useEffect } from "react";
import Image from "next/image";
import { authClient } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MyProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  console.log("SESSION:", session, "PENDING:", isPending);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [session, isPending, router]);

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

  const user = session.user;
  const initials =
    user.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "U";

  return (
    <div style={{ background: "#fafaf8", minHeight: "100vh", padding: "30px 20px" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        
        <h1 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
          My Profile
        </h1>

        <div
          className="animate__animated animate__fadeInUp"
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #eee",
            padding: 25
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            {user.image ? (
              <Image
                src={user.image}
                alt="avatar"
                width={70}
                height={70}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #EF9F27",
                  marginBottom: 10
                }}
              />
            ) : (
              <div
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  background: "#FAEEDA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: "bold",
                  border: "2px solid #EF9F27",
                  marginBottom: 10
                }}
              >
                {initials}
              </div>
            )}

            <div style={{ fontSize: 18, fontWeight: "bold" }}>
              {user.name}
            </div>
            <div style={{ fontSize: 13, color: "#777" }}>
              {user.email}
            </div>

            <div
              style={{
                marginTop: 8,
                fontSize: 12,
                background: "#E1F5EE",
                color: "#085041",
                padding: "3px 10px",
                borderRadius: 20,
                display: "inline-block"
              }}
            >
              ✔ Verified
            </div>
          </div>

          <div style={{ borderTop: "1px solid #eee" }}>
            {[
              { label: "Full Name", value: user.name },
              { label: "Email", value: user.email },
              { label: "Login Method", value: "Email / Password" },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee"
                }}
              >
                <span style={{ fontSize: 13, color: "#777" }}>
                  {row.label}
                </span>
                <span style={{ fontSize: 13 }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
            <Link
              href="/my-profile/update"
              style={{
                flex: 1,
                padding: "10px",
                background: "#D85A30",
                color: "#fff",
                borderRadius: 8,
                textAlign: "center",
                textDecoration: "none"
              }}
            >
              Update Info
            </Link>

            <button
              onClick={() => authClient.signOut().then(() => router.push("/"))}
              style={{
                flex: 1,
                padding: "10px",
                background: "transparent",
                border: "1px solid #ddd",
                borderRadius: 8,
                color: "#777",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}