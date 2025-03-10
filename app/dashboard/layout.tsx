import { ChevronLeft, House, ShieldAlert, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <div className="bg-[#f3f4f6] h-full w-full">{children}</div>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden fixed bottom-5 right-5"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <Link href="/dashboard">
              <House /> Dashboard
            </Link>
          </li>
          <li>
            <Link href="/dashboard/menu">
              <ShoppingCart /> Menu
            </Link>
          </li>
          <li>
            <Link href="/dashboard/admin">
              <ShieldAlert /> Admin
            </Link>
          </li>
          <li className="mt-auto mb-3">
            <Link href="/">
              <ChevronLeft /> Back
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
