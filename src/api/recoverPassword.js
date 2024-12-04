import { supabase } from "./supabaseClient";

/**
 * 비밀번호 재설정을 위한 이메일 전송
 */
export const recoverPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  return { data, error };
};
