import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import useToastAlert from "../../hooks/useToastAlert";
import { signUpUser, uploadProfileImage, saveUserInfo } from "../../api/signup";
import "react-toastify/dist/ReactToastify.css";

import ProfileImageUploader from "../../components/pageComponents/for-auth/ProfileImageUploader";
import EmailInput from "../../components/pageComponents/for-auth/EmailInput";
import PasswordInput from "../../components/pageComponents/for-auth/PasswordInput";
import NicknameInput from "../../components/pageComponents/for-auth/NicknameInput";
import Background from "../../components/pageComponents/for-auth/Background";

const SignUp = () => {
  const navigate = useNavigate();
  const showToast = useToastAlert();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,

    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // 입력값이 변경될 때마다 유효성 검사
    defaultValues: {
      emailDomain: "custom", // emailDomain 초기값 설정
      nicknameAvailable: false, // 닉네임 중복 확인 상태 초기화
    },
  });

  const handleGoHome = () => navigate("/");

  const onSubmit = async (data) => {
    const { emailPrefix, emailDomain, password, nickname, image } = data;

    const fullEmail =
      emailDomain === "custom" ? emailPrefix : `${emailPrefix}@${emailDomain}`;

    let imageUrl = "/img/default_profile.png";

    // 프로필 이미지 업로드
    if (image?.[0]) {
      const { data: uploadData, error: uploadError } = await uploadProfileImage(
        image[0]
      );
      if (uploadError) {
        showToast(uploadError.message, "error");
        return;
      }
      imageUrl = uploadData.path;
    }

    // 사용자 등록
    const { data: signUpData, error: signUpError } = await signUpUser({
      email: fullEmail,
      password,
    });

    // 이메일 중복 확인
    if (signUpError) {
      if (signUpError.message.includes("already registered")) {
        showToast("이미 가입된 이메일입니다.", "error");
      } else {
        showToast(signUpError.message, "error");
      }
      return;
    }

    // 사용자 정보 저장
    const insertError = await saveUserInfo(
      signUpData.user.id,
      nickname,
      imageUrl
    );

    if (insertError) {
      showToast(insertError.message, "error");
    } else {
      showToast("회원가입이 완료되었습니다!", "success", () =>
        navigate("/login")
      );
    }
  };

  return (
    <Background>
      <div className="bg-white relative p-8 rounded-2xl shadow-lg w-1/4 max-w-2xl min-w-96">
        <IoIosArrowDropleft
          className="absolute left-4 top-4 text-3xl cursor-pointer"
          onClick={handleGoHome}
        />
        <div className="flex items-center mb-6 flex-col gap-2">
          <h1 className="text-center flex-grow text-2xl font-bold text-black">
            회원가입
          </h1>
          <h2 className="text-center flex-grow text-sm text-gray-500 font-medium">
            회원 가입을 위한 정보를 입력해주세요.
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-5 flex flex-col justify-center items-center"
        >
          <ProfileImageUploader setImage={(file) => setValue("image", file)} />
          <EmailInput
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />
          <PasswordInput
            register={register}
            watch={watch}
            errors={errors}
            isSignup={true}
          />
          <NicknameInput
            register={register}
            setError={setError}
            clearErrors={clearErrors}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />
          <button
            type="submit"
            className="w-1/2 bg-[#FFB200] text-white py-3 font-semibold rounded-full hover:bg-yellow-600 transition mt-8  disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale"
            disabled={!isValid} // 모든 유효성 검사 충족 시 활성화
          >
            회원가입
          </button>
          <p className="text-sm text-gray-600 mt-4 text-center">
            이미 계정이 있으신가요?{" "}
            <Link
              to="/login"
              className="text-blue-500 font-medium text-sm hover:underline"
            >
              로그인
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </Background>
  );
};

export default SignUp;
