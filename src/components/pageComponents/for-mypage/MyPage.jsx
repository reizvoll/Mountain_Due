import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";
import useUser from '../../../hooks/useUser';

const MyPage = ({ isOpen, onClose }) => {
  const { user } = useUser()
  console.log(user)
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[20px] w-full max-w-lg p-8 relative overflow-y-auto max-h-[90vh] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 text-[#666] hover:text-[#333] text-[28px]"
          onClick={onClose}
        >
          <IoClose />
        </button>

        {/* 헤더 */}
        <h2 className="text-[28px] text-[#333] font-bold text-center mb-8">My Page</h2>

        {/* 프로필 이미지 */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden shadow-md">
            <img
              src="/mountain_due.png"
              alt="profile img"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="py-2 px-4 bg-purple-500 text-white rounded-full text-sm cursor-pointer hover:bg-purple-700">
            프로필 이미지 바꾸기
            <input type="file" accept="image/*" className="hidden" />
          </label>
        </div>

        {/* 프로필 정보 */}
        <div className="flex flex-col items-center gap-6 mt-6">

          {/* 이름 */}
          <div className="w-full flex justify-between items-center border border-gray-300 rounded-lg p-4 bg-gray-50">
            <span className="text-gray-600 font-medium">이름</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-800 font-semibold">{user.nickname}</span>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-700">
                수정
              </button>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-between gap-4 w-full mt-4">
            <button className="w-1/2 py-3 bg-yellow-400 text-white rounded-full font-semibold text-sm hover:bg-yellow-500">
              비밀번호 변경
            </button>
            <button className="w-1/2 py-3 bg-red-500 text-white rounded-full font-semibold text-sm hover:bg-red-600">
              로그아웃
            </button>
          </div>

          {/* 계정 삭제 */}
          <button className="text-gray-600 hover:text-purple-500 mt-4 font-medium">
            Mountian_Due
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default MyPage;