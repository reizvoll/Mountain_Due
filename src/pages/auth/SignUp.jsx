import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify'
import useToastAlert from '../../hooks/useToastAlert'
import {
  signUpUser,
  uploadProfileImage,
  saveUserInfo,
  signupGoogle,
} from '../../api/signup'
import 'react-toastify/dist/ReactToastify.css'

import ProfileImageUploader from '../../components/pageComponents/for-auth/ProfileImageUploader'
import EmailInput from '../../components/pageComponents/for-auth/EmailInput'
import PasswordInput from '../../components/pageComponents/for-auth/PasswordInput'
import NicknameInput from '../../components/pageComponents/for-auth/NicknameInput'
import Background from '../../components/pageComponents/for-auth/Background'
import TosModal from '../../components/pageComponents/ui/TosModal'

const SignUp = () => {
  const navigate = useNavigate()
  const showToast = useToastAlert()
  const [isModalOpen, setIsModalOpen] = useState(false) // 약관 모달 상태
  const [termsAgreed, setTermsAgreed] = useState(false) // 약관 동의 여부

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange', // 입력값이 변경될 때마다 유효성 검사
    defaultValues: {
      emailDomain: 'custom', // emailDomain 초기값 설정
      nicknameAvailable: false, // 닉네임 중복 확인 상태 초기화
    },
  })

  // 우선 뒤로가기로 변경, 홈으로 바로 보내버리니 약간 UX적 부분에서 불편함 느낄수도..?
  // const handleGoHome = () => navigate("/");
  const handleGoBack = () => navigate(-1)

  const onSubmit = async (data) => {
    if (!termsAgreed) {
      showToast('약관에 동의하셔야 회원가입이 가능합니다.', 'error')
      return
    }

    const { emailPrefix, emailDomain, password, nickname, image } = data

    const fullEmail =
      emailDomain === 'custom' ? emailPrefix : `${emailPrefix}@${emailDomain}`

    let imageUrl = '/img/default_profile.png'

    // 프로필 이미지 업로드
    if (image) {
      const { data: uploadData, error: uploadError } = await uploadProfileImage(
        image
      )
      if (uploadError) {
        showToast(uploadError.message, 'error')
        return
      }
      imageUrl = uploadData?.path ?? imageUrl
    }

    // 사용자 등록
    const { data: signUpData, error: signUpError } = await signUpUser({
      email: fullEmail,
      password,
    })

    // 이메일 중복 확인
    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        showToast('이미 가입된 이메일입니다.', 'error')
      } else {
        showToast(signUpError.message, 'error')
      }
      return
    }

    // 사용자 정보 저장
    const insertError = await saveUserInfo(
      signUpData.user.id,
      nickname,
      imageUrl
    )

    if (insertError) {
      showToast(insertError.message, 'error')
    } else {
      showToast('회원가입이 완료되었습니다!', 'success')
    }
  }

  const handleGoogleSignup = async () => {
    try {
      await signupGoogle() // Google OAuth 회원가입 시작
      // 리디렉션이 발생하므로 추가 로직은 필요하지 않습니다.
    } catch (err) {
      console.error('Google 회원가입 처리 중 오류:', err.message)
      showToast('Google 회원가입 중 오류가 발생했습니다.', 'error')
    }
  }

  // 로그인 로직도 동일하게 sm으로 width값 통일화시켰숩니당. (너무 꽉 찬 느낌이라 여백의 미 를 줘봤습니다..)
  return (
    <Background>
      <div className="bg-white relative p-8 rounded-2xl shadow-lg w-1/4 max-w-sm min-w-96">
        <FaHome
          className="absolute left-4 top-4 text-3xl cursor-pointer"
          onClick={handleGoBack}
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
          className="gap-4 flex flex-col justify-center items-center"
        >
          <ProfileImageUploader setImage={(file) => setValue('image', file)} />
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
            trigger={trigger}
          />

          {/* 약관 동의 체크박스 */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)} // 약관 동의 상태 업데이트
              className="w-4 h-4"
            />
            <label htmlFor="terms" className="text-sm text-[#333]">
              <button
                type="button"
                className="text-[#666] hover:underline"
                onClick={() => setIsModalOpen(true)} // 약관 모달 열기
              >
                이용 약관
              </button>
              에 동의합니다.
            </label>
          </div>

          <button
            type="submit"
            className="w-2/3 bg-[#FFB200] text-white py-3 font-semibold rounded-full hover:bg-[#FF8D03] transition disabled:opacity-60 disabled:cursor-not-allowed disabled:grayscale"
            disabled={!isValid || !termsAgreed} // 약관 동의 여부에 따라 버튼 비활성화
          >
            회원가입
          </button>
          {/* 간편 회원가입 섹션 */}
          <div className="mt-8 flex flex-col items-center w-full">
            <p className="text-sm text-gray-600">또는</p>
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center mt-4 py-3 bg-white border border-gray-300 rounded-full font-medium text-gray-600 hover:bg-gray-100 transition shadow-md"
            >
              <img
                src="img/google.png"
                alt="Google Logo"
                className="w-5 h-5 mr-3"
              />
              Google로 회원가입
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            이미 계정이 있으신가요?{' '}
            <Link
              to="/login"
              className="text-blue-500 font-medium text-sm hover:underline"
            >
              로그인
            </Link>
          </p>
        </form>
        <ToastContainer />
        <TosModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </Background>
  )
}

export default SignUp
