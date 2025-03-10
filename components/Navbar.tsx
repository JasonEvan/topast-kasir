import { errorAlert } from "@/lib/sweetalert/alert";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        cache: "no-store",
        method: "DELETE",
        credentials: "include",
      });

      if (res.status == 200) {
        router.replace("/login");
      } else {
        errorAlert("Cannot logout");
      }
    } catch (error) {
      if (error instanceof Error) {
        errorAlert(error.message);
      } else {
        errorAlert(String(error));
      }
    }
  };

  return (
    <div className="navbar bg-base-100 absolute z-1">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Topast</a>
      </div>
      <div className="flex-none gap-2">
        <button className="btn" onClick={() => router.push("/dashboard")}>
          Dashboard
        </button>
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
