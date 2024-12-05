import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import useToastAlert from "../../hooks/useToastAlert";
import { loginUser, loginWithGoogle } from "../../api/login";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux"; // Redux dispatch 사용
import { setUser } from "../../redux/slices/userSlice"; // Redux 액션 추가

import Background from "../../components/pageComponents/for-auth/Background";
import PasswordInput from "../../components/pageComponents/for-auth/PasswordInput";
import EmailInput from "../../components/pageComponents/for-auth/EmailInput";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // 값 변경 시 유효성 검증
    defaultValues: {
      emailDomain: "custom", // emailDomain 초기값 설정
    },
  });

  const navigate = useNavigate();
  const showToast = useToastAlert();
  const location = useLocation();
  const dispatch = useDispatch(); // Redux dispatch 가져오기

  useEffect(() => {
    // URL에서 `signup` 쿼리 파라미터 확인
    const params = new URLSearchParams(location.search);
    const signupStatus = params.get("signup");

    if (signupStatus === "success") {
      showToast(
        "회원가입이 완료되었습니다! 구글 간편 로그인을 사용하여 로그인해주세요.",
        "success"
      );
    }
  }, [location.search, showToast]);

  const onSubmit = async (data) => {
    const { emailPrefix, emailDomain, password } = data;

    // 이메일 조합
    const email =
      emailDomain === "custom" ? emailPrefix : `${emailPrefix}@${emailDomain}`;

    try {
      const { user, error } = await loginUser(email, password);
      if (error) {
        showToast(
          "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
          "error"
        );
        return;
      }

      // 사용자 정보를 Redux 상태에 저장
      dispatch(
        setUser({
          id: user.id,
          nickname: user.nickname,
          img_url: user.img_url,
        })
      );

    // 로그인 시, 바로 직전 페이지로 이동하도록 구현
      showToast("로그인에 성공했습니다!", "success", () => navigate("/"));
      
    } catch (error) {
      showToast("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.", "error");
    }
  };


  const handleGoogleLogin = async () => {
    try {
      const { error, message } = await loginWithGoogle();
      if (error) {
        showToast(error, "error");
        return;
      }

      showToast(message, "info");
    } catch (err) {
      console.error("Google 로그인 처리 중 오류:", err.message);
      showToast("Google 로그인 중 오류가 발생했습니다.", "error");
    }
  };

  const handleGoHome = () => navigate("/");

  return (
    <Background>
      <div className="bg-white p-10 rounded-2xl relative shadow-lg w-1/4 max-w-sm min-w-96">
        <FaHome
          className="absolute left-4 top-4 text-3xl cursor-pointer"
          onClick={handleGoHome}
        />
        <div className="flex items-center mb-6 flex-col gap-2">
          <h1 className="text-center flex-grow text-2xl text-black">
            로그인
          </h1>
          <h2 className="text-center flex-grow text-sm text-gray-500 font-medium">
            이메일과 비밀번호를 입력해주세요.
          </h2>
          <div className="w-40">
            <img src="img/mountain_due.png" alt="로고 이미지" />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 flex flex-col justify-center items-center"
        >
          {/* EmailInput 컴포넌트 */}
          <EmailInput
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
          />

          {/* PasswordInput 컴포넌트 */}
          <PasswordInput register={register} watch={watch} errors={errors} />

          {/* 로그인 버튼 (isValid에 따라 활성화) */}
          <button
            type="submit"
            disabled={!isValid} // 유효하지 않은 경우 비활성화
            className={`w-2/3 py-3 font-semibold rounded-full transition ${
              isValid
                ? "bg-[#FFB200] text-white hover:bg-[#FF8D03]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            로그인
          </button>

          {/* 간편 로그인 섹션 */}
          <div className="mt-8 flex flex-col items-center w-full">
            <p className="text-sm text-gray-600">또는</p>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center mt-4 py-3 bg-white border border-gray-300 rounded-full font-medium text-gray-600 hover:bg-gray-100 transition shadow-md"
            >
              <img
                src="img/google.png"
                alt="Google Logo"
                className="w-5 h-5 mr-3"
              />
              Google로 로그인
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-5 text-center">
            계정이 없으신가요?{"  "}
            <Link
              to="/signup"
              className="text-blue-500 font-medium text-sm hover:underline"
            >
              회원가입
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </Background>
  );
};

export default Login;