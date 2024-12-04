import React from "react";

const EmailInput = ({ register, setValue, errors, watch }) => {
  const emailPrefix = watch("emailPrefix"); // emailPrefix 실시간 감지
  const emailDomain = watch("emailDomain"); // emailDomain 실시간 감지

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center gap-3 w-full">
        <input
          type={emailDomain === "custom" ? "email" : "text"} // emailDomain 값에 따라 type 변경
          placeholder="이메일"
          {...register("emailPrefix", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value:
                emailDomain === "custom"
                  ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i // 전체 이메일 형식 검증
                  : /^[A-Z0-9._%+-]+$/i, // prefix만 검증
            },
          })}
          className="w-full p-2 h-10 border rounded focus:outline-none focus:ring"
        />
        {emailDomain !== "custom" && <div>@</div>}
        <select
          {...register("emailDomain")}
          className="w-1/2 p-2 h-10 border rounded focus:outline-none focus:ring"
          onChange={(e) => setValue("emailDomain", e.target.value)}
        >
          <option value="custom">직접 입력</option>
          <option value="gmail.com">gmail.com</option>
          <option value="naver.com">naver.com</option>
          <option value="daum.net">daum.net</option>
          <option value="hanmail.net">hanmail.net</option>
          <option value="nate.com">nate.com</option>
        </select>
      </div>
      {/* 이메일 유효성 검사 메시지 */}
      {emailDomain === "custom" ? (
        // emailDomain이 "custom"일 때 전체 이메일 형식 검증
        emailPrefix &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailPrefix) ? (
          <p className="text-red-500 text-sm mt-1">
            유효한 이메일 형식이 아닙니다.
          </p>
        ) : (
          errors.emailPrefix && (
            <p className="text-red-500 text-sm mt-1">
              {errors.emailPrefix.message}
            </p>
          )
        )
      ) : // emailDomain이 "custom"이 아닐 때 prefix 검증
      emailPrefix && !/^[A-Z0-9._%+-]+$/i.test(emailPrefix) ? (
        <p className="text-red-500 text-sm mt-1">
          유효한 이메일 형식이 아닙니다.
        </p>
      ) : (
        errors.emailPrefix && (
          <p className="text-red-500 text-sm mt-1">
            {errors.emailPrefix.message}
          </p>
        )
      )}
    </div>
  );
};

export default EmailInput;