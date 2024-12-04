import React, { useState } from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/userSlice";
import {
  updateUserProfileImage,
  updateUserNickname,
} from "../../../api/myPageData";
import useUser from "../../../hooks/useUser";
import ProfileImageUploader from "../for-auth/ProfileImageUploader";
import { uploadProfileImage } from "../../../api/signup";
import { useForm } from "react-hook-form";
import NicknameInput from "../for-auth/NicknameInput";

const MyPage = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const dispatch = useDispatch(); // Redux dispatch 가져오기
  const [newImage, setNewImage] = useState(null);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // 입력값이 변경될 때마다 유효성 검사
    defaultValues: {
      nicknameAvailable: false, // 닉네임 중복 확인 상태 초기화
    },
  });

  if (!isOpen) return null;

  // 프로필 이미지 업데이트
  const handleProfileImageUpdate = async () => {
    if (!newImage) return;
    try {
      const imageUrl = await uploadProfileImage(newImage); // Supabase에 이미지 업로드
      await updateUserProfileImage(user.id, imageUrl); // Supabase DB 업데이트
      dispatch(setUser({ ...user, img_url: imageUrl })); // Redux 상태 업데이트
      alert("프로필 이미지가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error(error);
      alert("프로필 이미지 업데이트 중 오류가 발생했습니다.");
    }
  };

  // 닉네임 업데이트
  const handleNicknameUpdate = async (data) => {
    const { nickname } = data;
    console.log(data);
    try {
      await updateUserNickname(user.id, nickname); // Supabase DB 업데이트
      dispatch(setUser({ ...user, nickname })); // Redux 상태 업데이트
      alert("닉네임이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error(error);
      alert("닉네임 업데이트 중 오류가 발생했습니다.");
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[20px] w-full max-w-lg p-8 relative overflow-y-auto max-h-[90vh] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 text-[#666] hover:text-[#333] text-[28px]"
          onClick={onClose}
        >
          <IoClose />
        </button>

        {/* 헤더 */}
        <h2 className="text-[28px] text-[#333] font-bold text-center mb-8">
          My Page
        </h2>

        {/* 프로필 이미지 업로드 */}
        <ProfileImageUploader setImage={setNewImage} />
        <button
          onClick={handleProfileImageUpdate}
          disabled={!newImage}
          className={`w-full py-3 rounded-full font-semibold text-white mt-4 ${
            newImage
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          프로필 이미지 업데이트
        </button>

        {/* 닉네임 입력 */}
        <div className="mt-8">
          <form onSubmit={handleSubmit(handleNicknameUpdate)}>
            <NicknameInput
              register={register}
              setError={setError}
              clearErrors={clearErrors}
              errors={errors}
              watch={watch}
              setValue={setValue}
              trigger={trigger}
            />
            <button
              className="w-full py-3 mt-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale"
              disabled={!isValid}
            >
              닉네임 업데이트
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default MyPage;
