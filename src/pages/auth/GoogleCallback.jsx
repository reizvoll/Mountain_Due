import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { supabase } from '../../api/supabaseClient'
import { setUser } from '../../redux/slices/userSlice'
import useToastAlert from '../../hooks/useToastAlert'

const GoogleCallback = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const showToast = useToastAlert()

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // 세션 정보 가져오기
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession()

        if (sessionError) {
          console.error('세션 가져오기 실패:', sessionError.message)
          showToast('로그인 처리 중 오류가 발생했습니다.', 'error')
          navigate('/login')
          return
        }

        const user = sessionData?.session?.user
        if (!user) {
          console.error('Google OAuth 사용자 정보가 없습니다.')
          showToast('로그인 실패: 사용자 정보를 가져올 수 없습니다.', 'error')
          navigate('/login')
          return
        }

        // `users` 테이블에서 사용자 정보 가져오기
        const { data: userDetails, error: userError } = await supabase
          .from('users')
          .select('id, nickname, img_url')
          .eq('id', user.id)
          .single()

        if (userError) {
          console.error('users 테이블 조회 실패:', userError.message)
          showToast('사용자 정보 조회 중 오류가 발생했습니다.', 'error')
          navigate('/signup?signup=false')
          return
        }

        // Redux 상태에 사용자 정보 저장
        dispatch(setUser(userDetails))
        showToast('로그인에 성공했습니다!', 'success')
        navigate('/')
      } catch (err) {
        console.error('로그인 처리 중 오류:', err.message)
        showToast('로그인 처리 중 오류가 발생했습니다.', 'error')
        navigate('/login')
      }
    }

    fetchUserDetails()
  }, [dispatch, navigate, showToast])

  return <div>Google 로그인 처리 중...</div>
}

export default GoogleCallback
