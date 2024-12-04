import { updateUserProfileImage } from "../api/UserData";

// // 닉네임 변경 핸들러
// export const handleNicknameChange = async (uid, nickname) => {
//   if (!nickname) {
//     alert("닉네임을 입력해주세요!");
//     return;
//   }

//   try {
//     const response = await updateProfileTxt(uid, {
//       columnName: "nickname",
//       newData: nickname,
//     });

//     if (response.error) {
//       alert(response.error);
//     } else {
//       alert("닉네임이 성공적으로 변경되었습니다!");
//     }
//   } catch (error) {
//     console.error("닉네임 변경 실패:", error.message);
//     alert("닉네임 변경에 실패했습니다.");
//   }
// };

// // 프로필 이미지 업데이트 핸들러
// export const handleProfileImageUpdate = async (
//   uid,
//   selectedFile,
//   currentImgUrl,
//   setProfileImage
// ) => {
//   if (!selectedFile) {
//     alert("이미지를 선택해주세요!");
//     return;
//   }

//   try {

//     // Supabase users 테이블 업데이트
//     await updateUserProfileImage(uid, newImageUrl);
    

//     // 상태 업데이트 및 알림
//     setProfileImage(newImageUrl);
//     alert("프로필 이미지가 성공적으로 변경되었습니다!");
//   } catch (error) {
//     console.error("프로필 이미지 변경 실패:", error.message);
//     alert("프로필 이미지 변경에 실패했습니다.");
//   }
// };