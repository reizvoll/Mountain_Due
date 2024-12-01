import Btn from "../ui/Btn";

const YoutubeShow = () => {
  return (
    <>
      <div className="flex flex-col items-center w-[1200px]">
        {/* 제목과 나머지 콘텐츠를 분리 */}
        <div className="w-full flex justify-start">
          <h3 className="text-left text-[24px] font-bold">For 초보 클라이머</h3>
        </div>
        <div className="flex flex-col flex-wrap items-center max-w-[1200px] mt-4">
          유튜브 영상 들어갈 곳<Btn>더보기</Btn>
        </div>
      </div>
    </>
  );
};
export default YoutubeShow;
