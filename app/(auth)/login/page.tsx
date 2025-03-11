"use client";

import { useAuth } from "@/hooks/useAuth";
import { useDataUser } from "@/hooks/useDataUserStore";
import { errorAlert } from "@/lib/sweetalert/alert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const setIsAdmin = useDataUser((state) => state.setIsAdmin);
  const setEmail = useDataUser((state) => state.setEmail);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      router.replace("/");
    }
  }, [user, router, isLoading]);

  const handleValueChange = (key: string, value: string) => {
    setFormValue({
      ...formValue,
      [key]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(formValue),
    });

    if (res.status == 200) {
      const data = await res.json();
      setEmail(data.data.email);
      setIsAdmin(data.data.isAdmin);
      router.replace("/");
    } else {
      const response = await res.json();
      errorAlert(response.errors);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login to Topast</h1>
          <p className="py-6">
            This login page is to make sure that you are an admin for topast. So
            there is no one that can access Topast Financial Management.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                value={formValue.email}
                onChange={(e) => handleValueChange("email", e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                value={formValue.password}
                onChange={(e) => handleValueChange("password", e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
