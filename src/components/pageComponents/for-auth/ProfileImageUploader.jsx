import React, { useState } from "react";

const ProfileImageUploader = ({ setImage }) => {
  const [profilePreview, setProfilePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setProfilePreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex items-center justify-center mb-6 flex-col">
      <label htmlFor="profileImage" className="cursor-pointer">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-black">
          {profilePreview ? (
            <img
              src={profilePreview}
              alt="미리보기"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/img/default_profile.png"
              alt="기본 프로필"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </label>
      <label
        htmlFor="profileImage"
        className="cursor-pointer text-gray-500 mt-3 text-sm font-semibold underline hover:text-gray-900"
      >
        프로필 이미지 추가하기
      </label>
      <input
        type="file"
        id="profileImage"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProfileImageUploader;
