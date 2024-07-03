import { Suspense, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { Header, Sidebar } from "../../components";
import { useMediaQuery } from "react-responsive";

export const SharedLayout = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [backDropIsOpen, setBackDropIsOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Продаж товарів");

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

  const updateHeaderTitle = (title: string) => {
    setHeaderTitle(title);
    if (isTabletOrMobile && sidebarIsOpen) {
      closeSidebar();
    }
  };
  return (
    <div>
      <Header openSidebar={openSidebar} headerTitle={headerTitle}/>
      <div className="flex">
        <aside>
        {sidebarIsOpen && (
          <Sidebar
            closeSidebar={closeSidebar}
            isTabletOrMobile={isTabletOrMobile}
            updateHeaderTitle={updateHeaderTitle}
          />
        )}
      </aside>
    <div className="container relative">
      <main className="w-full h-screen">
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
