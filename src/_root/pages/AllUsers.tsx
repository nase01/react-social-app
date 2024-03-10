import { Loader, UserCard } from "@/components/shared";
import { useGetAllUsers } from "@/lib/react-query/queries";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const AllUsers = () => {
  const { ref, inView } = useInView();
  const { data: users, fetchNextPage, hasNextPage } = useGetAllUsers();
  
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!users)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {users?.pages.map((item, index) => (
          <ul className="user-grid" key={`page-${index}`}>
            {item?.documents.map((user) => (
              <li key={user?.$id} className="flex-1 min-w-[200px] w-full  ">
                <UserCard user={user} />
              </li>
            ))}
          </ul>
        ))}
      </div>
      {hasNextPage && users &&(
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AllUsers;
