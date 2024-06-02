import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Header, Sidebar } from "../../components";

export const SharedLayout = () => {
  return (
    <div className="container">
      <Header />
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
