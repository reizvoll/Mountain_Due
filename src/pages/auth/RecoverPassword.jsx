import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useToastAlert from "../../hooks/useToastAlert";
import { recoverPassword } from "../../api/recoverPassword";
import "react-toastify/dist/ReactToastify.css";

import EmailInput from "../../components/pageComponents/for-auth/EmailInput";
import Background from "../../components/pageComponents/for-auth/Background";

const RecoverPassword = () => {
  const navigate = useNavigate();
  const showToast = useToastAlert();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // 입력값이 변경될 때마다 유효성 검사
  });

  const handleGoLogin = () => navigate("/login");

  const onSubmit = async ({ emailPrefix, emailDomain }) => {
    const email =
      emailDomain === "custom" ? emailPrefix : `${emailPrefix}@${emailDomain}`;
    const { error } = await recoverPassword(email);
    if (error) {
      showToast(
        "비밀번호 재설정에 실패했습니다. 이메일을 확인해주세요.",
        "error"
      );
    } else {
      showToast("비밀번호 재설정 이메일이 전송되었습니다.", "success");
    }
  };

  return (
    <Background>
      <div className="bg-white relative p-8 rounded-2xl shadow-lg w-1/2 max-w-2xl min-w-96">
        <div className="flex items-center mb-6 flex-col gap-2">
          <h1 className="text-center flex-grow text-2xl font-bold text-black">
            비밀번호 재설정
          </h1>
          <h2 className="text-center flex-grow text-sm text-gray-500 font-medium">
            비밀번호 재설정을 위해 이메일을 입력해주세요.
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-5 flex flex-col justify-center items-center"
        >
          <EmailInput
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
          <button
            type="submit"
            className="w-2/3 bg-[#FFB200] text-white py-3 font-semibold rounded-full hover:bg-yellow-600 transition mt-8 disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale"
            disabled={!isValid} // 모든 유효성 검사 충족 시 활성화
          >
            이메일 보내기
          </button>
          <button
            onClick={handleGoLogin}
            className="text-blue-500 font-medium text-sm hover:underline mt-4"
          >
            로그인으로 돌아가기
          </button>
        </form>
        <ToastContainer />
      </div>
    </Background>
  );
};

export default RecoverPassword;