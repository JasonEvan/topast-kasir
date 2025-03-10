"use client";

import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useEffect, useState } from "react";
import Skeleton from "./Loading";
import InputForm from "./InputForm";
import { useRouter } from "next/navigation";
import { errorAlert } from "@/lib/sweetalert/alert";

export default function EditMenuPageClient({ id }: { id: string }) {
  useRequireAuth();
  const router = useRouter();
  const [isLoadingFetchData, setIsLoadingFetchData] = useState<boolean>(true);
  const [isLoadingSubmitData, setIsLoadingSubmitData] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<{
    flavour: string;
    description: string;
    price: number;
  }>({
    flavour: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    fetch(`/api/menu/${id}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((res) =>
        setFormData({
          flavour: res.data.flavour,
          description: res.data.description,
          price: res.data.price,
        })
      )
      .catch((err) => {
        errorAlert(err);
        console.error(err);
      })
      .finally(() => setIsLoadingFetchData(false));
  }, [id]);

  if (isLoadingFetchData) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Skeleton />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoadingSubmitData(true);
    fetch(`/api/menu/${id}`, {
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
        setIsLoadingSubmitData(false);
        router.replace("/dashboard/menu");
      });
  };

  return (
    <div className="mt-5">
      <div className="font-bold text-2xl text-black w-full text-center">
        EDIT MENU
      </div>
      <form className="m-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 grid-rows-2">
          <div className="flex items-center justify-center">
            <InputForm
              title="Flavour"
              placeholder="e.g. Strawberry"
              text={formData.flavour}
              onChange={(e) =>
                setFormData({ ...formData, flavour: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-center">
            <InputForm
              title="Description"
              placeholder="Description"
              text={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-center">
            <InputForm
              type="number"
              title="Price"
              text={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              otherClass="mt-5"
            />
          </div>
        </div>
        <div className="w-full text-center mt-10">
          {!isLoadingSubmitData ? (
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
