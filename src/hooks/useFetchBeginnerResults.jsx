import { useInfiniteQuery } from "@tanstack/react-query";
import { getBeginnerResults } from "../api/youtube";

const useFetchBeginnerResults = () => {
  const fetchBeginnerResults = async ({ pageParam = "" }) => {
    const data = await getBeginnerResults(pageParam);
    return {
      items: data.items,
      nextPageToken: data.nextPageToken,
    };
  };

  const {
    data: beginnerResult,
    fetchNextPage: fetchNextBeginner,
    hasNextPage: beginnerHasNextPage,
    isFetchingNextPage: beginnerisFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["beginnerResult"],
    queryFn: fetchBeginnerResults,
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    select: (data) => {
      console.log(data);
      return data.pages.map((page) => ({
        items: page.items.map((item) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
        })),
        nextPageToken: page.nextPageToken,
      }));
    },
  });

  return {
    beginnerResult,
    fetchNextBeginner,
    beginnerHasNextPage,
    beginnerisFetchingNextPage,
  };
};
export default useFetchBeginnerResults;
