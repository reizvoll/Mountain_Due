import { supabase } from "./supabaseClient";

export const updateUserProfileImage = async (userId, newImageUrl) => {
  if (!userId || !newImageUrl)
    throw new Error("필수 매개변수가 누락되었습니다.");

  const { error } = await supabase
    .from("users") // 테이블 이름을 정확히 확인해야 함
    .update({ img_url: newImageUrl }) // 새 이미지 URL로 업데이트
    .eq("id", userId); // 사용자 ID 조건

  if (error) {
    console.error("프로필 이미지 업데이트 오류:", error);
    throw new Error("프로필 이미지 업데이트 실패: " + error.message);
  }
};

export const updateUserNickname = async (userId, newNickname) => {
  if (!userId || !newNickname)
    throw new Error("필수 매개변수가 누락되었습니다.");

  const { error } = await supabase
    .from("users") // 테이블 이름을 정확히 확인해야 함
    .update({ nickname: newNickname }) // 새 닉네임으로 업데이트
    .eq("id", userId); // 사용자 ID 조건

  if (error) {
    console.error("닉네임 업데이트 오류:", error);
    throw new Error("닉네임 업데이트 실패: " + error.message);
  }
};