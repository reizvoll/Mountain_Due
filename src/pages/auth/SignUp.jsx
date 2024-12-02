import { useState } from "react";
import { signUpUser, uploadProfileImage, saveUserInfo } from "../../api/signup";
import { Link, useNavigate } from "react-router-dom";

import { IoIosArrowDropleft } from "react-icons/io";
import useToastAlert from "../../hooks/useToastAlert";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Background from "../../components/pageComponents/for-auth/Background";
import EmailInput from "../../components/pageComponents/for-auth/EmailInput";
import PasswordInput from "../../components/pageComponents/for-auth/PasswordInput";
import NicknameInput from "../../components/pageComponents/for-auth/NicknameInput";
import ProfileImageUploader from "../../components/pageComponents/for-auth/ProfileImageUploader";

const SignUp = () => {
  const [emailPrefix, setEmailPrefix] = useState("");
  const [emailDomain, setEmailDomain] = useState("custom");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const showToast = useToastAlert();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;

    if (!passwordRegex.test(password)) {
      showToast(
        "비밀번호는 6~20자리이며 영문과 숫자를 포함해야 합니다.",
        "error"
      );
      return;
    }
    if (confirmPassword !== password) {
      showToast("비밀번호가 일치하지 않습니다.", "error");
      return;
    }

    const fullEmail =
      emailDomain === "custom"
        ? `${emailPrefix}`
        : `${emailPrefix}@${emailDomain}`;

    let imageUrl = "/img/default_profile.png";

    // 프로필 이미지 업로드
    if (image) {
      const { data: uploadData, error: uploadError } = await uploadProfileImage(
        image
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

    if (signUpError) {
      const errorMessage = signUpError.message.includes("already registered")
        ? "이미 가입된 이메일입니다."
        : signUpError.message;
      showToast(errorMessage, "error");
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
        <div className="flex items-center mb-6  flex-col gap-2">
          <h1 className="text-center flex-grow text-2xl font-bold text-black">
            회원가입
          </h1>
          <h2 className="text-center flex-grow text-sm text-gray-500 font-medium">
            회원 가입을 위한 정보를 입력해주세요.
          </h2>
        </div>
        <form
          onSubmit={handleSignUp}
          className="gap-5 flex flex-col justify-center items-center"
        >
          <ProfileImageUploader image={image} setImage={setImage} />
          <EmailInput
            emailPrefix={emailPrefix}
            setEmailPrefix={setEmailPrefix}
            emailDomain={emailDomain}
            setEmailDomain={setEmailDomain}
          />
          <PasswordInput
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
          <NicknameInput nickname={nickname} setNickname={setNickname} />
          <button
            type="submit"
            className="w-1/2 bg-[#FFB200] text-white py-3 font-semibold rounded-full hover:bg-yellow-600 transition mt-8"
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
      </div>
      <ToastContainer />
    </Background>
  );
};

export default SignUp;
