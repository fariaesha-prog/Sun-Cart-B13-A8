import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    "https://sun-cart-b12-a8.vercel.app",
});

export const signIn = authClient.signIn;
export const signUp = authClient.signUp;
export const useSession = authClient.useSession;
export const signOut = authClient.signOut;