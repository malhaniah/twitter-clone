import { useSession } from "next-auth/react";
import { useState } from "react";
import InfiniteTweetList from "~/components/InfiniteTweetList";
import TweetForm from "~/components/TweetForm";
import { api } from "~/utils/api";

const TABS = ["Recent", "Following"] as const;

export default function Home() {
  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("Recent");
  const sessions = useSession();
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
        {sessions.status === "authenticated" && (
          <div className="flex">
            {TABS.map((tab) => {
              return (
                <button
                  key={tab}
                  className={`flex-grow p-2 hover:bg-gray-200 focus-visible:bg-gray-200 ${
                    tab === selectedTab
                      ? "border-b-4 border-b-blue-500  font-bold"
                      : ""
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        )}
      </header>
      <TweetForm />
      {selectedTab === "Recent" ? <RecentTweets /> : <FollowingTweets />}
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

const FollowingTweets = () => {
  const tweets = api.tweet.infiniteFeeds.useInfiniteQuery(
    { onlyFollowing: true },
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
