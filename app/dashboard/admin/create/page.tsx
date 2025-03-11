"use client";

import InputForm from "@/components/InputForm";
import { useAdminRequired } from "@/hooks/useAdminRequired";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { errorAlert } from "@/lib/sweetalert/alert";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddAdminPage() {
  useRequireAuth();
  useAdminRequired();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    isAdmin: boolean;
  }>({
    email: "",
    password: "",
    isAdmin: true,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/add-user/", {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(await res.text());
      console.log(await res.json());
      router.replace("/dashboard/admin");
    } catch (error) {
      if (error instanceof Error) {
        errorAlert(error.message);
      } else {
        errorAlert(String(error));
      }
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <div className="font-bold text-2xl text-black w-full text-center">
        ADD NEW ADMIN
      </div>
      <form className="m-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 grid-rows-2">
          <div className="flex items-center justify-center">
            <InputForm
              type="email"
              title="Email"
              placeholder="example@gmail.com"
              text={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-center">
            <InputForm
              type="password"
              title="Password"
              placeholder="password"
              text={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox"
              onChange={() =>
                setFormData({ ...formData, isAdmin: !formData.isAdmin })
              }
            />
            <label className="text-black">Is Admin</label>
          </div>
        </div>
        <div className="w-full text-center mt-10">
          {!isLoading ? (
            <button className="btn btn-accent" type="submit">
              Submit
            </button>
          ) : (
            <span className="loading loading-dots loading-xl text-black"></span>
          )}
        </div>
      </form>
    </div>
  );
}
