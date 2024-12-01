// 공용 버튼 컴포넌트입니둥
const Btn = ({ onClick, children }) => {
    return (
      <button
        onClick={onClick}
        className="w-[150px] h-[45px] bg-[#FFB300] rounded-[25px] font-pretendard font-bold text-[20px] leading-[20px] text-white text-center hover:bg-[#FF8D03]"
      >
        {children}
      </button>
    )
  }
  
  export default Btn