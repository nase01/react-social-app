import { Models } from "appwrite";
import { Loader, PostCard, UserCard } from "@/components/shared";
import { useGetRecentPosts, useGetTopUsers } from "@/lib/react-query/queries";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Home = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetRecentPosts();
  
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetTopUsers(10);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
            
            {posts ? posts.pages.map((item, index) => (
              <ul className="flex flex-col flex-1 gap-9 w-full" key={`page-${index}`}>
                {item?.documents.map((post: Models.Document) => (
                  <li key={post.$id} className="flex justify-center w-full">
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            )) : (<Loader />)}
            
        </div>

        {hasNextPage && posts && (
          <div ref={ref} className="mt-10">
            <Loader />
          </div>
        )}
      </div>

      <div className="home-creators">
        <h3 className="h3-bold">Top Creators</h3>
        {isUserLoading ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {!isErrorCreators ? creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            )) : (
              <p className="body-medium text-light-1">Something bad happened</p>
            )}
          </ul>
        )}
      </div>

    </div>
  );
};

export default Home;