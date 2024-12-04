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
  const fileName = `${uuidv4()}`; // UUID를 사용한 고유 파일명 생성
  const folderPath = "users"; // 폴더 경로 설정
  console.log(folderPath, fileName);
  // 이미지 업로드
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("images") // 버킷 이름
    .upload(`${folderPath}/${fileName}`, image); // 경로 + 파일명

  if (uploadError) {
    throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
  }

  // 아오 에러 뭔데... get publicurl error...
  // 업로드된 이미지의 공개 URL 가져오기
  const {
    data: { publicUrl },
  } = await supabase.storage
    .from("images")

    .getPublicUrl(`${folderPath}/${fileName}`);
  if (!publicUrl) {
    throw new Error("이미지 URL 생성 실패");
  }

  console.log("생성된 이미지 URL:", publicUrl);
  return publicUrl; // URL 반환
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
