import OpenNav from './OpenNav';

const OpenHeroSection = () => {
  return (
    <div className="relative w-full h-[800px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/img/main_img.jpg"
          alt="Background-Img"
          className="w-full h-full object-cover object-[50%_70%]"
        />
      </div>

      {/* Nav & 로고 */}
      <div className="absolute top-[18px] left-0 w-full flex items-center justify-between px-[50px]">
        <div className="w-[115px] h-[115px] bg-cover" style={{ backgroundImage: "url('/img/mountain_due.png')" }}></div>

        <OpenNav />
      </div>
    </div>
  )
}

export default OpenHeroSection
