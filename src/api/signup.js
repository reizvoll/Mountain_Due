import { supabase } from "./supabaseClient";

/**
 * 사용자 등록
 */
export const signUpUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
};

/**
 * 사용자 프로필 이미지 업로드
 */
export const uploadProfileImage = async (image) => {
  const fileName = `users/${Date.now()}_${image.name}`;
  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, image);
  return { data, error };
};

/**
 * 사용자 정보 저장
 */
export const saveUserInfo = async (userId, nickname, img_url) => {
  const { error } = await supabase.from("users").insert([
    {
      id: userId,
      nickname,
      img_url,
    },
  ]);
  return error;
};
