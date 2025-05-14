import React from "react";
import { Outlet } from "react-router-dom";
import NiceHeader from "./NiceHeader";
import NiceSidebar from "./NiceSidebar";

export default function NiceLayout({ children }) {
  return (
    <>
      <NiceHeader />
      <NiceSidebar />

      <main id="main" className="main">
        {/* {children} */}
        <Outlet />
      </main>
    </>
  );
}
