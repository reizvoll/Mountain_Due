import { FaHome, FaYoutube } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoBookmarks } from "react-icons/io5";

// 회원 전용 nav바
const Nav = () => {
  return (
    <div className="relative w-[360px] h-[60px] bg-[rgba(137,137,137,0.4)] backdrop-blur-[2px] rounded-[30px] flex items-center justify-around px-5">

      <div className="flex items-center gap-6">
        <FaHome className="text-white text-[35px]" />
        <IoBookmarks className="text-white text-[28px]" />
        <FaYoutube className="text-white text-[35px]" />
        <FiLogOut className="text-white text-[35px]" />
      </div>

      <div className="w-[43px] h-[43px] bg-[#D9D9D9] rounded-full"></div>
    </div>
  );
};

export default Nav
