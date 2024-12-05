import { useState } from "react";
import { supabase } from "../../../api/supabaseClient";
import { FaHome, FaYoutube } from "react-icons/fa";
import { IoHeartCircle } from "react-icons/io5";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import MyPage from "../for-mypage/MyPage";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Nav = () => {
  const { user, logout } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();

  const openModalHandler = () => {
    setIsModalOpen(true);
  };
  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  if (user.id) {
    // 로그인 상태
    return (
      <div className="relative w-[360px] h-[60px] bg-[rgba(137,137,137,0.4)] backdrop-blur-[2px] rounded-[30px] flex items-center justify-around px-5">
        <div className="flex items-center gap-6">
          <FaHome className="text-white text-[35px] cursor-pointer" onClick={() => nav("/")} />
          <IoHeartCircle className="text-white text-[38px] cursor-pointer" onClick={() => nav("/likes")} />
          <FaYoutube className="text-white text-[35px] cursor-pointer" onClick={() => nav("/youtube")} />
          <FiLogOut
            className="text-white text-[35px] cursor-pointer"
            onClick={logout}
          />
        </div>
        <div
          className="w-[43px] h-[43px] bg-[#D9D9D9] rounded-full cursor-pointer"
          onClick={openModalHandler}
        >
          <img
            src={user.img_url || "/default-profile.png"}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <MyPage isOpen={isModalOpen} onClose={closeModalHandler} />
      </div>
    );
  }

  return (
    // 비로그인 상태
    <div className="relative w-[310px] h-[60px] bg-[rgba(137,137,137,0.4)] backdrop-blur-[2px] rounded-[30px] flex items-center justify-around px-5">
      <div className="flex items-center gap-6">
        <FaHome className="text-white text-[35px] cursor-pointer" onClick={() => nav("/")}/>
        <FaYoutube className="text-white text-[35px] cursor-pointer" onClick={() => nav("/youtube")}/>
        <FiLogIn className="text-white text-[35px] cursor-pointer" onClick={() => nav("/login")} />
      </div>
      <div
        className="w-[43px] h-[43px] bg-[#D9D9D9] rounded-full cursor-pointer"
        onClick={() => {
           Swal.fire({
            title: `로그인이 필요합니다`,
            text: `로그인 하러 가시겠습니까?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "예",
            cancelButtonText: "아니오",
          }).then((result) => {
            if (result.isConfirmed) {
              nav(`/login`); // Redirects to the login page
            }
          });
        }}
      />
      <MyPage isOpen={isModalOpen} onClose={closeModalHandler} />
    </div>
  );
};

export default Nav;
