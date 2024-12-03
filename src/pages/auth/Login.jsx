import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import useToastAlert from "../../hooks/useToastAlert";
import { loginUser } from "../../api/login";
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
  const dispatch = useDispatch(); // Redux dispatch 가져오기

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

      showToast("로그인에 성공했습니다!", "success", () => navigate("/"));
    } catch (error) {
      showToast("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.", "error");
    }
  };

  const handleGoHome = () => navigate("/");

  return (
    <Background>
      <div className="bg-white p-10 rounded-2xl relative shadow-lg w-1/4 max-w-2xl min-w-96">
        <IoIosArrowDropleft
          className="absolute left-4 top-4 text-3xl cursor-pointer"
          onClick={handleGoHome}
        />
        <div className="flex items-center mb-6 flex-col gap-2">
          <div className="w-72 mb-6">
            <img src="img/mountain_due.png" alt="로고 이미지" />
          </div>
          <h1 className="text-center flex-grow text-2xl font-bold text-black">
            로그인
          </h1>
          <h2 className="text-center flex-grow text-sm text-gray-500 font-medium">
            이메일과 비밀번호를 입력해주세요.
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-5 flex flex-col justify-center items-center"
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
            className={`w-1/2 py-3 font-semibold rounded-full transition mt-8 ${
              isValid
                ? "bg-[#FFB200] text-white hover:bg-yellow-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
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
        <ToastContainer />
      </div>
    </Background>
  );
};

export default Login;
