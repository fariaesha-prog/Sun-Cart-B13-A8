export const useSession = () => ({
  data: { user: { name: "Guest User" } },
  isPending: false,
});

export const signIn = async () => ({ success: false });
export const signOut = async () => ({ success: false });
export const signUp = async () => ({ success: false });