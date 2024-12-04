import { supabase } from "./supabaseClient";
import { v4 as uuidv4 } from "uuid";

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
  // 파일 이름을 고유한 UUID로 설정
  const fileName = `users/${Date.now()}_${uuidv4()}.${image.name.split('.').pop()}`;

  const { data, error } = await supabase.storage.from("images").upload(fileName, image);
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


export const signupGoogle = async () => {
  try {
    // Google OAuth 회원가입 시작
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: "http://localhost:5173/login?signup=success", // 상태 전달
      },
    });

    if (error) {
      console.error("Google OAuth 인증 실패:", error.message);
      return { error: "Google OAuth 인증에 실패했습니다." };
    }

    return { message: "회원가입이 완료되었습니다." };
  } catch (err) {
    console.error("Google OAuth 처리 중 오류:", err.message);
    return { error: "Google OAuth 처리 중 오류가 발생했습니다." };
  }
};