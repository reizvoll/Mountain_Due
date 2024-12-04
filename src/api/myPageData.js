// import { supabase } from './supabaseClient';

// // 새로 다시짜자.. 
// async function updateProfileTxt(uid, dataObj) {
//     const { columnName, newData } = new ;

//     try {
//         const { error } = await supabase
//             .from("users")
//             .update({ nickname: newData })
//             .eq("id", uid) // 특정 ID와 매칭

//         if (error) {
//             if (error.message.includes('duplicate key value violates unique constraint')) {
//                 return { error: '이미 존재하는 닉네임입니다.' };
//             }
//             console.error("업데이트 중 오류 발생:", error.message);
//             return { error: error.message };
//         }
//         return {};
//     } catch (err) {
//         console.error("업데이트 중 알 수 없는 오류 발생:", err.message);
//         return { error: err.message };
//     }
// }

// // 프로필 이미지 URL 업데이트
// async function updateProfileImg(uid, newImageUrl) {
//     try {
//         // 데이터베이스에 새 이미지 URL 업데이트
//         const { error } = await supabase
//             .from("users")
//             .update({ img_url: newImageUrl }) // img_url 필드 업데이트
//             .eq("id", uid); // 특정 유저 ID와 매칭

//         if (error) {
//             console.error("프로필 이미지 업데이트 중 오류:", error.message);
//             return { error: error.message };
//         }

//         return { success: true }; // 성공적으로 업데이트
//     } catch (err) {
//         console.error("프로필 이미지 업데이트 실패:", err.message);
//         return { error: err.message };
//     }
// }

import { supabase } from "./supabaseClient";
// import { v4 as uuidv4 } from "uuid";

// /**
//  * 프로필 이미지를 Supabase 스토리지에 업로드하고 URL 반환
//  * @param {File} image 업로드할 이미지 파일
//  * @returns {Promise<string>} 업로드된 이미지의 URL
//  */
// export const uploadProfileImage = async (image) => {
//   if (!image) throw new Error("이미지가 제공되지 않았습니다.");

//   // 고유한 파일 이름 생성
//   const fileName = `${uuidv4()}`; // UUID를 사용한 고유 파일명 생성
//   const folderPath = "users"; // 폴더 경로 설정

//   // 이미지 업로드
//   const { data: uploadData, error: uploadError } = await supabase.storage
//     .from("images") // 버킷 이름
//     .upload(`${folderPath}/${fileName}`, image); // 경로 + 파일명

//   if (uploadError) {
//     throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
//   }

//   // 업로드된 이미지의 공개 URL 가져오기
//   const { publicUrl } = supabase.storage
//   .from("images")
//   .getPublicUrl(`${folderPath}/${fileName}`);
// if (!publicUrl) {
//   throw new Error("이미지 URL 생성 실패");
// }

//   console.log("생성된 이미지 URL:", publicUrl);
//   return publicUrl; // URL 반환
// };

/**
 * 사용자 프로필 이미지 업데이트
 * @param {string} userId 사용자 ID
 * @param {string} newImageUrl 새로운 이미지 URL
 */
export const updateUserProfileImage = async (userId, newImageUrl) => {
  if (!userId || !newImageUrl) throw new Error("필수 매개변수가 누락되었습니다.");

  const { error } = await supabase
    .from("images") // 테이블 이름을 정확히 확인해야 함
    .update({ img_url: newImageUrl }) // 새 이미지 URL로 업데이트
    .eq("id", userId); // 사용자 ID 조건

  if (error) {
    console.error("프로필 이미지 업데이트 오류:", error);
    throw new Error("프로필 이미지 업데이트 실패: " + error.message);
  }
};

/**
 * 사용자 닉네임 업데이트
 * @param {string} userId 사용자 ID
 * @param {string} newNickname 새로운 닉네임
 */
export const updateUserNickname = async (userId, newNickname) => {
  if (!userId || !newNickname) throw new Error("필수 매개변수가 누락되었습니다.");

  const { error } = await supabase
    .from("users") // 테이블 이름을 정확히 확인해야 함
    .update({ nickname: newNickname }) // 새 닉네임으로 업데이트
    .eq("id", userId); // 사용자 ID 조건

  if (error) {
    console.error("닉네임 업데이트 오류:", error);
    throw new Error("닉네임 업데이트 실패: " + error.message);
  }
};