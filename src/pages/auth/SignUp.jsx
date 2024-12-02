import React, { useState } from "react";
import { supabase } from "../../api/supabaseClient";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosArrowDropleft } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [emailPrefix, setEmailPrefix] = useState("");
  const [emailDomain, setEmailDomain] = useState("custom");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  // input이 file 형태로 들어옴
  const handleImageChange = (e) => {
    const file = e.target.files[0]; //사용자가 선택한 파일 중 첫번째 파일 가져옴
    if (file) {
      setImage(file);
      const reader = new FileReader(); // JS에서 파일을 읽는데 사용되는 API
      reader.onload = () => {
        // 파일 다 읽었을 때
        setProfilePreview(reader.result); //결과를 상태로 저장
      };
      reader.readAsDataURL(file); //파일을 base64 URL 형식으로 읽는 메서드(=> 파일을 브라우저에서 렌더링할 수 있는 문자열로 변환-> img태그의 src 속성에 사용 가능)
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;

    // 비밀번호 유효성 검사
    if (!passwordRegex.test(password)) {
      setErrors({
        password: "비밀번호는 6~20자리이며 영문과 숫자를 포함해야 합니다.",
      });
      return;
    }
    if (confirmPassword !== password) {
      setErrors({
        confirmPassword: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    // 이메일 도메인
    const fullEmail =
      emailDomain === "custom"
        ? `${emailPrefix}`
        : `${emailPrefix}@${emailDomain}`;

    // 기본 프로필 이미지 경로
    let imageUrl = "/img/default_profile.png";

    // 이미지 업로드 처리
    if (image) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(`users/${Date.now()}_${image.name}`, image);

      if (uploadError) {
        setMessage(uploadError.message);
        return;
      }
      imageUrl = uploadData.path; // 업로드된 이미지 경로
    }

    // Supabase 회원가입 처리
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: fullEmail,
        password,
      }
    );

    if (signUpError) {
      if (signUpError.message.includes("already registered")) {
        setMessage("이미 가입된 이메일입니다.");
      } else {
        setMessage(signUpError.message);
      }
      return;
    }

    // users 테이블에 정보 저장
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: signUpData.user.id,
        nickname,
        img_url: imageUrl, // 업로드된 이미지 또는 기본 이미지
      },
    ]);

    if (insertError) {
      setMessage(insertError.message);
    } else {
      setMessage("회원가입이 완료되었습니다!");
      // 폼 초기화
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setNickname("");
      setImage(null);
      setProfilePreview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg min-w-96 w-1/4 max-w-2xl">
        <div className="flex items-center mb-6 relative flex-col gap-2">
          {/* 홈 버튼 */}
          <IoIosArrowDropleft
            className="absolute left-0 text-3xl cursor-pointer"
            onClick={handleGoHome}
          />
          <h1 className="text-center flex-grow text-2xl font-bold text-black">회원가입</h1>
          <h2 className="text-center flex-grow text-sm text-gray-500 font-medium">
            회원 가입을 위한 정보를 입력해주세요.
          </h2>
        </div>

        {/* 프로필 이미지 */}
        <div className="flex items-center justify-center mb-6 flex-col">
          <label htmlFor="profileImage" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-black">
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt="프로필 미리보기"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/img/default_profile.png"
                  alt="기본 프로필 이미지"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </label>
          <label
            htmlFor="profileImage"
            className="cursor-pointer text-gray-500 mt-2 text-sm font-semibold underline hover:text-gray-900"
          >
            프로필 이미지 추가하기
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*" //이미지 파일만 선택
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* 회원가입 폼 */}
        <form
          onSubmit={handleSignUp}
          className="gap-5 flex flex-col justify-center items-center"
        >
          <div className="flex items-center justify-center gap-3 w-full">
            <input
              type={emailDomain === "custom" ? "email" : "text"}
              placeholder="이메일"
              value={emailPrefix}
              onChange={(e) => setEmailPrefix(e.target.value)}
              required
              className="w-full p-2 h-10 border rounded focus:outline-none focus:ring"
            />
            {emailDomain !== "custom" && <div>@</div>}
            <select
              value={emailDomain}
              onChange={(e) => setEmailDomain(e.target.value)}
              className="w-1/2 p-2 h-10 border rounded focus:outline-none focus:ring"
            >
              <option value="custom">직접 입력</option>
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.net">daum.net</option>
              <option value="hanmail.net">hanmail.net</option>
              <option value="nate.com">nate.com</option>
            </select>
          </div>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring"
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="relative w-full">
            <input
              type={showConfirmedPassword ? "text" : "password"}
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring"
            />
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
            >
              {showConfirmedPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring"
            />
          </div>

          <button
            type="submit"
            className="w-1/2 bg-[#FFB200]  text-white py-3 font-semibold rounded-full hover:bg-yellow-600 transition"
          >
            회원가입
          </button>
        </form>

        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default SignUp;
