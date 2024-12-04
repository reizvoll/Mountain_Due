import React, { useState, useEffect } from "react";
import { supabase } from "../../../api/supabaseClient";

const NicknameInput = ({
  register,
  errors,
  setError,
  clearErrors,
  setValue,
  watch,
  trigger,
}) => {
  const [checking, setChecking] = useState(false);
  const [nicknameAvailable, setNicknameAvailable] = useState(false);

  const nickname = watch("nickname"); // 닉네임 값 실시간 감지

  useEffect(() => {
    // 닉네임 변경 시 상태 초기화
    setNicknameAvailable(false);
    clearErrors("nickname");
    setValue("nicknameAvailable", false); // 닉네임 사용 가능 상태 초기화
  }, [nickname, clearErrors, setValue]);

  useEffect(() => {
    // 닉네임 사용 가능 상태가 변경되면 유효성 검사 트리거
    trigger("nickname");
  }, [nicknameAvailable, trigger]);

  const checkNickname = async (nickname) => {
    if (!nickname) return;

    setChecking(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("nickname")
        .eq("nickname", nickname);

      if (error) {
        console.error("Supabase error:", error.message);
        return;
      }

      if (data.length > 0) {
        setError("nickname", {
          type: "manual",
          message: "이미 사용 중인 닉네임입니다.",
        });
        setNicknameAvailable(false);
      } else {
        clearErrors("nickname");
        setNicknameAvailable(true);
        // React Hook Form에 닉네임 사용 가능 상태 업데이트
        setValue("nicknameAvailable", true);
      }
    } catch (err) {
      console.error("Error checking nickname:", err.message);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="닉네임"
          maxLength={20} // 닉네임 글자수 제한
          {...register("nickname", {
            required: "닉네임을 입력해주세요.",
            maxLength: {
              value: 20,
              message: "닉네임은 최대 20자까지 가능합니다.",
            },
            validate: () =>
              nicknameAvailable || "닉네임 중복 확인이 필요합니다.",
          })}
          className="w-2/3 p-2 border rounded focus:outline-none focus:ring"
        />
        <button
          type="button"
          onClick={() => checkNickname(nickname)} // 입력된 닉네임 확인
          disabled={checking || !nickname} // 닉네임 입력이 없거나 확인 중일 때 비활성화
          className={`ml-2 w-1/3 py-2.5 text-sm font-medium ${
            checking || !nickname ? "bg-gray-300" : "bg-blue-500"
          } text-white rounded`}
        >
          {checking ? "확인 중..." : "중복 확인"}
        </button>
      </div>
      {/* 유효성 검사 메시지 */}
      {errors.nickname && (
        <p className="text-red-500 text-sm mt-3">{errors.nickname.message}</p>
      )}
      {nicknameAvailable && (
        <p className="text-green-500 text-sm mt-3">사용 가능한 닉네임입니다.</p>
      )}
    </div>
  );
};

export default NicknameInput;
