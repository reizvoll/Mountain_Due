import { supabase } from "./supabaseClient";

export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error };
  }

  // user 정보 가져오기
  const { data: userDetails, error: userError } = await supabase
    .from("users")
    .select("id, nickname, img_url")
    .eq("id", data.user.id)
    .single();

  if (userError) {
    return { error: userError };
  }

  return { user: userDetails, error: null };
};
