import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ register, watch, errors, isSignup }) => {
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  // 실시간으로 password 값 가져오기
  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirmPassword");

  // 비밀번호 확인 에러 메시지 여부
  const confirmPasswordError =
    isSignup && watchConfirmPassword !== watchPassword;

  return (
    <>
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            pattern: {
              value: passwordPattern,
            },
          })}
          className="w-full p-2 border rounded focus:outline-none focus:ring"
        />
        <div
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
        {/* 비밀번호 입력창 에러 메시지 */}
        {watchPassword && !passwordPattern.test(watchPassword) ? (
          <p className="text-red-500 text-sm mt-3">
            비밀번호는 6~20자리이며 영문과 숫자를 포함해야 합니다.
          </p>
        ) : (
          errors.password && (
            <p className="text-red-500 text-sm mt-3">
              {errors.password.message}
            </p>
          )
        )}
      </div>
      {/* 비밀번호 확인 입력 */}
      {isSignup && (
        <div className="relative w-full">
          <input
            type={showConfirmedPassword ? "text" : "password"}
            placeholder="비밀번호 확인"
            {...register("confirmPassword", {
              required: "비밀번호 확인을 입력해주세요.",
              validate: (value) => value === watchPassword,
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
          />
          <div
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
          >
            {showConfirmedPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          {/* 에러 메시지 */}
          {/* 실시간 비밀번호 확인 에러 메시지 */}
          {confirmPasswordError && (
            <p className="text-red-500 text-sm mt-3">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
          {errors.confirmPassword && !confirmPasswordError && (
            <p className="text-red-500 text-sm mt-3">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default PasswordInput;
