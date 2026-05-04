import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("./suncart.db"),
  secret: "suncart-dev-secret-key-2025-summer",
  baseURL: "https://sun-cart-b13-a8-bv7w-77rp4z0yd-fariaesha2003-6625s-projects.vercel.app/api/auth",
  basePath: "/api/auth",
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    autoMigrate: true,
    cookies: {
      session_token: {
        name: "session_token",
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: false,
        }
      }
    }
  },
});