import { useNavigate } from 'react-router-dom'
import Nav from './Nav'
import { useState } from 'react';
import useUser from '../../../hooks/useUser';
import MyPage from '../for-mypage/MyPage';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isLoggedIn } = useUser();
  const nav = useNavigate();

  const openModalHandler = () => setIsModalOpen(true);
  const closeModalHandler = () => setIsModalOpen(false);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[600px] w-screen"
      style={{
        backgroundImage: "url('/img/main_img.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "50% 70%",
        backgroundRepeat: "no-repeat",
      }}
    >

      {/* Nav & 로고 */}
      <div className="absolute top-[18px] left-0 w-full flex items-center justify-between px-[50px]">
        <div className="cursor-pointer w-[115px] h-[115px] bg-cover" style={{ backgroundImage: "url('/img/mountain_due.png')" }} onClick={() => nav("/")}></div>
        <Nav />
      </div>

      <h1 className="absolute top-[200px] left-[67px] text-white font-bold text-[40px] leading-[48px]">
        Find Your Perfect
        <br />
        Climbing Spot
      </h1>

      {/* 버튼 */}
      <div
        className="absolute top-[330px] left-[67px] w-[150px] h-[45px] rounded-[25px] bg-[#FFB200] flex items-center justify-center hover:bg-[#FF8D03] cursor-pointer"
        onClick={isLoggedIn ? openModalHandler : () => nav("/signup")} // 로그인 상태에 따라 동작 변경
      >
        <span className="text-white font-bold text-[20px] leading-[20px] cursor-pointer">
          {isLoggedIn ? "Go Mypage" : "Sign Up"} {/* 텍스트 변경 */}
        </span>
      </div>

      {/* 마이페이지 모달 */}
      {isLoggedIn && (
        <MyPage isOpen={isModalOpen} onClose={closeModalHandler} />
      )}
    </div>
  );
};

export default HeroSection;
