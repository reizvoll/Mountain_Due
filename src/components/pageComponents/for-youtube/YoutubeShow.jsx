import YoutubeBeginner from "./YoutubeBeginner";
import YoutubeClimbing from "./YoutubeClimbing";
import useFetchClimbResults from "../../../hooks/useFetchClimbResults";
import useFetchBeginnerResults from "../../../hooks/useFetchBeginnerResults";
import useModalHandler from "../../../hooks/useModalHandler";

const YoutubeShow = () => {
  const { climbResult, fetchNextClimb, hasNextPage, isFetchingNextPage } =
    useFetchClimbResults();

  const {
    beginnerHasNextPage,
    beginnerResult,
    beginnerisFetchingNextPage,
    fetchNextBeginner,
  } = useFetchBeginnerResults();

  const { isClicked, youtubeId, modalClickHandler, modalClose } =
    useModalHandler();

  return (
    <>
      <main className="flex flex-col items-center w-[1200px]">
        <div className="flex flex-col flex-wrap items-center max-w-[1200px] mt-4">
          <YoutubeClimbing
            climbResult={climbResult}
            modalClickHandler={modalClickHandler}
            fetchNextClimb={fetchNextClimb}
            hasNextPage={hasNextPage}
          />
          <YoutubeBeginner
            beginnerResult={beginnerResult}
            modalClickHandler={modalClickHandler}
            fetchNextBeginner={fetchNextBeginner}
            beginnerHasNextPage={beginnerHasNextPage}
          />
        </div>
      </main>
      {isClicked && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center"
          onClick={modalClose}
        >
          <div className="flex items-center justify-center w-[1200px] h-[675px] bg-white rounded-lg shadow-lg">
            <iframe
              id="ytplayer"
              type="text/html"
              width="1200"
              height="675"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              className="rounded-md"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default YoutubeShow;