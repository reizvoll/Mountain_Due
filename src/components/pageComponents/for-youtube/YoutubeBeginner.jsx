import Btn from "../ui/Btn";

const YoutubeBeginner = ({
  beginnerResult,
  fetchNextBeginner,
  modalClickHandler,
  beginnerHasNextPage,
}) => {
  if (beginnerResult) {
    return (
      <>
        <div className="flex flex-col items-center mb-[50px]">
          <div className="flex flex-row items-center justify-center w-full flex-wrap gap-10 m-5">
            <div className="w-full flex justify-start">
              <h3 className="text-left text-[24px] font-bold ml-[110px]">
                초심자를 위한 클라이밍 영상
              </h3>
            </div>
            {beginnerResult?.map((page) => {
              return page.items.map((item) => {
                return (
                  <div key={item.id}>
                    <img
                      src={item.thumbnail}
                      className="w-[300px] h-[165px] object-cover rounded-md hover:scale-105 cursor-pointer"
                      onClick={() => {
                        modalClickHandler(item);
                      }}
                    ></img>
                    <p className="mt-3 text-[18px]">
                      {item.title.substring(0, 17).trim() + "..."}
                    </p>
                  </div>
                );
              });
            })}
          </div>
          {beginnerHasNextPage && (
            <Btn
              onClick={() => {
                fetchNextBeginner();
              }}
            >
              더 보기
            </Btn>
          )}
        </div>
      </>
    );
  }
};

export default YoutubeBeginner;