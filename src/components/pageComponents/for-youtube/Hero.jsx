import Container from "../ui/Container";
import Nav from "../ui/Nav";

const Hero = () => {
  return (
    <Container>
      <div
        style={{
          backgroundImage: "url(img/youtube_page_img.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="flex flex-col items-center justify-center min-h-[600px] w-screen mb-[50px]"
      >
        <div className="absolute top-[18px] left-0 w-full flex items-center justify-between px-[50px]">
          <div
            className="w-[115px] h-[115px] bg-cover"
            style={{ backgroundImage: "url('/img/mountain_due.png')" }}
          ></div>
          <Nav />
        </div>
        <div className="flex flex-col items-center gap-16">
          <h2 className="text-[48px]">Youtube 영상</h2>
          <div className="flex flex-col items-center">
            <h3 className="text-white">다양한 클라이밍 영상을</h3>
            <h3 className="text-white">이곳에서 확인하세요!</h3>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Hero;
