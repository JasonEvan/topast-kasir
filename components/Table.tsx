import { formatter } from "@/lib/common/formatter";
import { Menu, User } from "@/lib/types/type";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function MenuTable({ menus }: { menus: Menu[] }) {
  const router = useRouter();
  const handleDelete = (id: string) => {
    const ok = confirm("Are you sure want to delete this menu?");
    if (!ok) {
      return;
    }

    fetch(`/api/menu/${id}`, {
      cache: "no-store",
      method: "DELETE",
    }).then((res) => {
      if (res.status == 200) {
        alert("Berhasil delete");
        router.refresh();
      } else {
        alert("Gagal delete");
      }
    });
  };

  return (
    <div className="overflow-x-auto text-black">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th className="text-black">Flavour</th>
            <th className="text-black">Description</th>
            <th className="text-black">Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      {/* <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      /> */}
                      <Image
                        src={
                          menu.imagePath == null || menu.imagePath == ""
                            ? "/img/default.jpg"
                            : menu.imagePath
                        }
                        alt="Topast Image"
                        width={300}
                        height={300}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{menu.flavour}</div>
                    {/* <div className="text-sm opacity-50">United States</div> */}
                  </div>
                </div>
              </td>
              <td>{menu.description}</td>
              <td>{formatter.format(menu.price)}</td>
              <th>
                <div className="flex gap-2">
                  <Link href={`/dashboard/menu/${menu.id}`}>
                    <button className="btn btn-xs btn-info">Edit</button>
                  </Link>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(menu.id)}
                  >
                    Delete
                  </button>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th className="text-black">Flavour</th>
            <th className="text-black">Description</th>
            <th className="text-black">Price</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export function AdminTable({ admins }: { admins: User[] }) {
  const router = useRouter();
  const handleDelete = (id: string) => {
    const ok = confirm("Are you sure want to delete this admin?");
    if (!ok) {
      return;
    }

    fetch(`/api/admin/${id}`, {
      cache: "no-store",
      method: "DELETE",
    }).then((res) => {
      if (res.status == 200) {
        alert("Berhasil delete");
        router.refresh();
      } else {
        alert("Gagal delete");
      }
    });
  };

  return (
    <div className="overflow-x-auto text-black">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="text-black">ID</th>
            <th className="text-black">Email</th>
            <th className="text-black">Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{admin.id}</div>
                    {/* <div className="text-sm opacity-50">United States</div> */}
                  </div>
                </div>
              </td>
              <td>{admin.email}</td>
              <td>{admin.isAdmin ? "Admin" : "User"}</td>
              <th>
                <div className="flex gap-2">
                  <Link href={`/dashboard/admin/${admin.id}`}>
                    <button className="btn btn-xs btn-info">Edit</button>
                  </Link>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(admin.id)}
                  >
                    Delete
                  </button>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th className="text-black">ID</th>
            <th className="text-black">Email</th>
            <th className="text-black">Role</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
