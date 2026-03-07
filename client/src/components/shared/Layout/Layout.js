// import React from "react";
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import { useLocation } from "react-router-dom";

// const Layout = ({ children }) => {
//   const location = useLocation();

//   // hide header on login page
//   const hideHeader = location.pathname === "/login";

//   return (
//     <>
//       {!hideHeader && (
//         <div className="header">
//           <Header />
//         </div>
//       )}

//       <div className="row g-0">
//         {!hideHeader && (
//           <div className="col-md-3">
//             <Sidebar />
//           </div>
//         )}

//         <div className={hideHeader ? "col-md-12" : "col-md-9"}>
//           {children}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Layout;

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const location = useLocation();

  // hide layout for login page
  if (location.pathname === "/login") return <Outlet />;

  return (
    <div className="d-flex flex-column vh-100">
      {/* Header */}
      <header>
        <Header />
      </header>

      {/* Main content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside
          style={{ width: "250px", backgroundColor: "#3b3b00" }}
          className="flex-shrink-0"
        >
          <Sidebar />
        </aside>

        {/* Page content */}
        <main className="flex-grow-1 p-3 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="text-center p-2 bg-dark text-white">
        © FarmTech Innovations - All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;