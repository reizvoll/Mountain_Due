import { useState } from 'react';
import TosModal from './TosModal';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full h-[250px] bg-[#D9D9D9] mx-auto">
      <div className="absolute left-[9.17%] top-[27.2%] flex flex-col space-y-4 text-[#484848] text-[18px] leading-[21px]">
        <div>Home</div>
        <div>Bookmark</div>
        <div>Youtube</div>
      </div>

      <div className="absolute left-[71.33%] top-[20%] flex ">
        <img
          src="/img/card.png" // public 폴더에 저장된 이미지 경로
          alt="Card_Img"
          className="w-[80px] h-[80px] object-contain"
        />
      </div>

      <div
        className="absolute left-[33.33%] top-[58%] text-[#484848] text-[18px] leading-[21px] cursor-pointer"
        onClick={openModalHandler}
      >
        이용 약관
      </div>
      <div className="absolute left-[71.33%] top-[58%] text-right text-[#484848] text-[18px] leading-[21px]">
        ⓒ copyright by Yu-Gi-0h!
      </div>
      <TosModal isOpen={isModalOpen} onClose={closeModalHandler} />
    </div>
  );
};

export default Footer;