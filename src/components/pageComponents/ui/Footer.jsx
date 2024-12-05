import { useState } from "react";
import TosModal from "./TosModal";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full h-[250px] bg-[#D9D9D9] mx-auto flex flex-col justify-center items-center">

      <div className="absolute top-[27.2%] left-[10%] flex flex-col space-y-4 text-[#484848] text-[18px] leading-[21px]">
        <div onClick={() => nav("/")}>Home</div>
        <div onClick={() => nav("/")}>Bookmark</div>
        <div onClick={() => nav("/youtube")}>Youtube</div>
      </div>

      <div
        className="absolute top-[58%] left-[33.33%] text-[#484848] text-[18px] leading-[21px] cursor-pointer"
        onClick={openModalHandler}
      >
        이용 약관
      </div>

      <div className="absolute top-[48%] left-[75%] flex items-center space-x-">
        <span className="text-[#484848] text-[18px] leading-[21px]">
          ⓒ copyright by Yu-Gi-0h!
        </span>
        <img
          src="/img/card.png"
          alt="Card_Img"
          className="w-[60px] h-[60px] relative -top-[10px]"
        />
      </div>

      <TosModal isOpen={isModalOpen} onClose={closeModalHandler} />
    </div>
  );
};

export default Footer;