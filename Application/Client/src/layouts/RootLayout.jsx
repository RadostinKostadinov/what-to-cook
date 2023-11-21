import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { useLayoutEffect } from "react";

export default function RootLayout() {
  useLayoutEffect(() => {
    document.body.classList.remove("bg-app-gradientBg");
  });

  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
