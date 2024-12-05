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


/**
 * Google OAuth 로그인 처리
 */
export const loginWithGoogle = async () => {
  try {
    // Google OAuth를 통해 로그인
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        // redirectTo: "http://localhost:5173?login=success", // 로그인 후 리디렉션 경로
        redirectTo: `https://mountain-due.vercel.app/login/google/callback`,
      },
    });

    if (error) {
      console.error("Google OAuth 인증 실패:", error.message);
      return { error: "Google OAuth 인증에 실패했습니다." };
    }

    // 리디렉션 후 처리하므로 여기서는 완료 메시지만 반환
    return {
      message: "Google OAuth 요청이 완료되었습니다. 리디렉션 중입니다.",
    };
  } catch (err) {
    console.error("Google OAuth 처리 중 오류:", err.message);
    return { error: "Google OAuth 처리 중 오류가 발생했습니다." };
  }
};