import InfiniteTweetList from "~/components/InfiniteTweetList";
import TweetForm from "~/components/TweetForm";
import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
      </header>
      <TweetForm />
      <RecentTweets />
    </>
  );
}

const RecentTweets = () => {
  const tweets = api.tweet.infiniteFeeds.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  return (
    <InfiniteTweetList
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage as boolean}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
};
