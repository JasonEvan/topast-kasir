"use client";

import InputForm from "@/components/InputForm";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { errorAlert } from "@/lib/sweetalert/alert";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddMenuPage() {
  useRequireAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    flavour: string;
    description: string;
    price: number;
    file: File | undefined;
  }>({
    flavour: "",
    description: "",
    price: 0,
    file: undefined,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.set("flavour", formData.flavour);
      data.set("description", formData.description);
      data.set("price", formData.price.toString());
      if (formData.file) {
        data.set("file", formData.file);
      }

      const res = await fetch("/api/menu", {
        cache: "no-store",
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());
      console.log(await res.json());
      router.replace("/dashboard/menu");
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
        ADD NEW MENU
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
          <div className="mt-5 flex items-end justify-center">
            <div className="flex flex-col">
              <label className="text-black text-sm mb-2">Image</label>
              <input
                type="file"
                className="file-input"
                onChange={(e) =>
                  setFormData({ ...formData, file: e.target.files?.[0] })
                }
              />
            </div>
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
