import { FaHome, FaYoutube } from "react-icons/fa"
import { FiLogIn } from "react-icons/fi"

// 비회원 전용 nav바
const OpenNav = () => {
  return (
    <div className="relative w-[310px] h-[60px] bg-[rgba(137,137,137,0.4)] backdrop-blur-[2px] rounded-[30px] flex items-center justify-around px-5">

      <div className="flex items-center gap-6">
        <FaHome className="text-white text-[35px]" />
        <FaYoutube className="text-white text-[35px]" />
        <FiLogIn className="text-white text-[35px]" />
      </div>

      <div className="w-[43px] h-[43px] bg-[#D9D9D9] rounded-full"></div>
      {/* '로그인이 필요합니다.' alert띄운 다음, 넘어가도록 할 것 */}
    </div>
  )
}

export default OpenNav
