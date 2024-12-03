import React from "react";

const NicknameInput = ({ register, errors }) => (
  <div className="w-full">
    <input
      type="text"
      placeholder="닉네임"
      {...register("nickname", { required: "닉네임을 입력해주세요." })}
      className="w-full p-2 border rounded focus:outline-none focus:ring"
    />
    {errors.nickname && (
      <p className="text-red-500 text-sm mt-3">{errors.nickname.message}</p>
    )}
  </div>
);

export default NicknameInput;
