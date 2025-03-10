"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import InputForm from "./InputForm";
import { useEffect, useState } from "react";
import Skeleton from "./Loading";
import { useRouter } from "next/navigation";
import { errorAlert } from "@/lib/sweetalert/alert";

export default function EditAdminPageClient({ id }: { id: string }) {
  useRequireAuth();
  const router = useRouter();
  const [isLoadingSubmitForm, setIsLoadingSubmitForm] =
    useState<boolean>(false);
  const [isLoadingFetchData, setIsLoadingFetchData] = useState<boolean>(true);
  const [formData, setFormData] = useState<{
    email: string;
    isAdmin: boolean;
  }>({
    email: "",
    isAdmin: true,
  });

  useEffect(() => {
    fetch(`/api/admin/${id}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((res) =>
        setFormData({
          email: res.data.email,
          isAdmin: res.data.isAdmin,
        })
      )
      .catch((err) => {
        errorAlert(err);
        console.error(err);
      })
      .finally(() => setIsLoadingFetchData(false));
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingSubmitForm(true);
    fetch(`/api/admin/${id}`, {
      cache: "no-store",
      method: "PUT",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => console.log(res.data))
      .catch((err) => {
        errorAlert(err);
        console.error(err);
      })
      .finally(() => {
        setIsLoadingSubmitForm(false);
        router.replace("/dashboard/admin");
      });
  };

  if (isLoadingFetchData) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="mt-5">
      <div className="font-bold text-2xl text-black w-full text-center">
        EDIT ADMIN
      </div>
      <form className="m-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 grid-rows-1">
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
          <div className="flex items-center justify-center gap-3">
            <input
              type="checkbox"
              checked={formData.isAdmin}
              className="checkbox"
              onChange={() =>
                setFormData({ ...formData, isAdmin: !formData.isAdmin })
              }
            />
            <label className="text-black">Is Admin</label>
          </div>
        </div>
        <div className="w-full text-center mt-10">
          {!isLoadingSubmitForm ? (
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
