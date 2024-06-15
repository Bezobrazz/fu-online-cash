import { Suspense, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Header, Sidebar } from "../../components";
import { useMediaQuery } from "react-responsive";

export const SharedLayout = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [backDropIsOpen, setBackDropIsOpen] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1439px)" });

  useEffect(() => {
    if (isTabletOrMobile) {
      setSidebarIsOpen(false);
      setBackDropIsOpen(false);
    } else {
      setSidebarIsOpen(true);
      setBackDropIsOpen(false);
    }
  }, [isTabletOrMobile]);
  const openSidebar = () => {
    setSidebarIsOpen(true);
    setBackDropIsOpen(true);
  };

  const closeSidebar = () => {
    setSidebarIsOpen(false);
    setBackDropIsOpen(false);
  };
  return (
    <div>
      <Header openSidebar={openSidebar} />
      <div className="flex">
        <aside>
        {sidebarIsOpen && (
          <Sidebar
            closeSidebar={closeSidebar}
            isTabletOrMobile={isTabletOrMobile}
          />
        )}
      </aside>
    <div className="container relative">
      <main className="w-full">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      </div>
    </div>
    
      
      {backDropIsOpen && (
        <div
          className="absolute top-0 right-0 w-full h-screen bg-black opacity-40 z-9"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};
