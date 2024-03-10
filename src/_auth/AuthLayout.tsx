import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <div className="flex justify-between rounded-[30px] overflow-hidden p-5">
              <Outlet />
              {/*
              <img
                src="/assets/images/side-img.svg"
                alt="logo"
                className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
              />*/}
            </div>
          </section>
        </>
      )}
    </>
  );
}
