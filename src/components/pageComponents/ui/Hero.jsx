import { useNavigate } from "react-router-dom";
import Container from "../ui/Container";
import useUser from '../../../hooks/useUser';
import Nav from './Nav';
import MyPage from "../for-mypage/MyPage";
import { useState } from "react";

const Hero = () => {
  const { user, isLoggedIn } = useUser();
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = () => setIsModalOpen(true);
  const closeModalHandler = () => setIsModalOpen(false);

  return (
    <Container>
      <div
        style={{
          backgroundImage: "url(/img/main_img_darked.png)",
          backgroundSize: "cover",
          backgroundPosition: "50% 70%",
          backgroundRepeat: "no-repeat",
        }}
        className="flex flex-col items-center justify-center min-h-[600px] w-screen"
      >
        <div className="absolute top-[18px] left-0 w-full flex items-center justify-between px-[50px]">
          <div
            className="w-[115px] h-[115px] bg-cover"
            style={{ backgroundImage: "url('/img/mountain_due.png')" }}
            onClick={() => nav("/")}
            ></div>
          <Nav />
        </div>

        {/* 환영 메시지 */}
        <div className="flex flex-col items-center gap-16">
          <h1 className="absolute top-[200px] left-[67px] text-white font-bold text-[40px] leading-[56px]">
            {isLoggedIn ? `${user.nickname} 님,` : "Guest 님,"}
            <br />
            환영합니다!
          </h1>

          {/* 버튼 */}
          <div
            className="absolute top-[330px] left-[67px] w-[200px] h-[45px] rounded-[25px] bg-[#FFB300] flex items-center justify-center hover:bg-[#FF8D03] cursor-pointer"
            onClick={isLoggedIn ? openModalHandler : () => nav("/login")} // 로그인 여부에 따라 동작 변경
          >
            <span className="text-white font-bold text-[20px] leading-[20px] cursor-pointer">
              {isLoggedIn ? "프로필 수정하기" : "로그인하기"}
            </span>
          </div>

      <MyPage isOpen={isModalOpen} onClose={closeModalHandler} />
        </div>
      </div>
    </Container>
  );
};
export default Hero;
