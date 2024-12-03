import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import useToastAlert from "../../hooks/useToastAlert";
import { loginUser } from "../../api/login";
import "react-toastify/dist/ReactToastify.css";

import Background from "../../components/pageComponents/for-auth/Background";
import PasswordInput from "../../components/pageComponents/for-auth/PasswordInput";
import EmailInput from "../../components/pageComponents/for-auth/EmailInput";

const Login = () => {
  const [emailPrefix, setEmailPrefix] = useState(""); // EmailInput 내부에서 관리하는 이메일 prefix
  const [emailDomain, setEmailDomain] = useState("custom"); // EmailInput 내부에서 관리하는 도메인
  const [password, setPassword] = useState(""); // PasswordInput 내부에서 관리하는 비밀번호

  const navigate = useNavigate();
  const showToast = useToastAlert();

  const handleLogin = async (e) => {
    e.preventDefault();

    // 이메일 완성
    const email =
      emailDomain === "custom"
        ? emailPrefix // 직접 입력
        : `${emailPrefix}@${emailDomain}`; // 도메인 선택 시 조합

    if (!email || !password) {
      showToast("이메일과 비밀번호를 모두 입력해주세요.", "error");
      return;
    }

    try {
      const { error } = await loginUser(email, password);
      if (error) {
        showToast(
          "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
          "error"
        );
        return;
      }

      showToast("로그인에 성공했습니다!", "success", () => navigate("/home"));
    } catch (error) {
      showToast("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.", "error");
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Background>
      <div className="bg-white p-10 rounded-2xl relative shadow-lg w-1/4 max-w-2xl min-w-96">
        <IoIosArrowDropleft
          className="absolute left-4 top-4 text-3xl cursor-pointer"
          onClick={handleGoHome}
        />
        <div className="flex items-center mb-6  flex-col gap-2">
          <div className="w-72 mb-6">
            <img src="img/mountain_due.png" alt="로고 이미지"></img>
          </div>
          <h1 className="text-center flex-grow text-2xl font-bold text-black">
            로그인
          </h1>
          <h2 className="text-center flex-grow text-sm text-gray-500 font-medium">
            이메일과 비밀번호를 입력해주세요.
          </h2>
        </div>
        <form
          onSubmit={handleLogin}
          className="gap-5 flex flex-col justify-center items-center"
        >
          {/* EmailInput 컴포넌트 사용 */}
          <EmailInput
            emailPrefix={emailPrefix}
            setEmailPrefix={setEmailPrefix}
            emailDomain={emailDomain}
            setEmailDomain={setEmailDomain}
          />

          {/* PasswordInput 컴포넌트 사용 */}
          <PasswordInput password={password} setPassword={setPassword} />

          <button
            type="submit"
            className="w-1/2 bg-[#FFB200] text-white py-3 font-semibold rounded-full hover:bg-yellow-600 transition mt-8"
          >
            로그인
          </button>
          <p className="text-sm text-gray-600 mt-4 text-center">
            계정이 없으신가요?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-500 font-medium text-sm hover:underline"
            >
              회원가입
            </button>
          </p>
        </form>
      </div>
      <ToastContainer />
    </Background>
  );
};

export default Login;
