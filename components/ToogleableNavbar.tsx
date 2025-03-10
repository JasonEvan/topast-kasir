"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const disableNavbar = ["/login", "/dashboard"];

export default function ToogleableNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (!disableNavbar.includes(pathname) && !pathname.startsWith("/dashboard")) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen w-screen pt-20 pb-5 px-5">{children}</div>
      </>
    );
  } else {
    return (
      <>
        <div className="min-h-screen w-screen">{children}</div>
      </>
    );
  }
}
