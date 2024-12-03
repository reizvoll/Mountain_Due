import { supabase } from "./supabaseClient";

export const loginUser = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { error };
};
