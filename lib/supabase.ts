// Supabase Client with resilient mock for development

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const supabase = {
  auth: {
    signInWithOtp: async ({ email, options }: { email: string; options?: any }) => ({
      data: { user: { email } },
      error: null,
    }),
    verifyOtp: async ({ email, token, type }: { email: string; token: string; type?: string }) => {
      if (token === "000000") return { error: new Error("Code incorrect, réessayez.") };
      return { data: { user: { email } }, error: null };
    },
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => ({
      data: { user: { email } },
      error: null,
    }),
    signUp: async ({ email, password, options }: { email: string; password?: string; options?: any }) => ({
      data: { user: { email } },
      error: null,
    }),
    resetPasswordForEmail: async (
      email: string,
      options?: { redirectTo?: string; [key: string]: any }
    ) => ({
      data: {},
      error: null,
    }),
    signInWithOAuth: async (options?: any) => ({
      data: {},
      error: null,
    }),
    signOut: async () => ({
      error: null,
    }),
  },
};
