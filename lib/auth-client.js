import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // This ensures it uses the Vercel URL when deployed
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL 
});

export const { signIn, signOut, signUp, useSession } = authClient;