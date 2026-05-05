import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({

  
  secret: process.env.BETTER_AUTH_SECRET || "suncart-dev-secret-key-2025-summer",
  baseURL: process.env.BETTER_AUTH_URL, 
  
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
  },
  // Remove the manual 'advanced' cookie settings to let BetterAuth 
  // detect the production environment automatically.
});