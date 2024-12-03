const Footer = () => {
  return (
    <div className="relative w-full h-[250px] bg-[#D9D9D9] mx-auto">
      {/* Home, Bookmark, Youtube */}
      <div className="absolute left-[9.17%] top-[27.2%] flex flex-col space-y-4 text-[#484848] text-[18px] leading-[21px]">
        <div>Home</div>
        <div>Bookmark</div>
        <div>Youtube</div>
      </div>

      {/* 이용 약관 */}
      <div className="absolute left-[33.33%] top-[58%] text-[#484848] text-[18px] leading-[21px]">
        이용 약관
      </div>

      {/* ⓒ copyright by Yu-Gi-0h! */}
      <div className="absolute left-[71.33%] top-[58%] text-right text-[#484848] text-[18px] leading-[21px]">
        ⓒ copyright by Yu-Gi-0h!
      </div>
    </div>
  )
}

export default Footer
