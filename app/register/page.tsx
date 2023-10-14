"use client";

import Input from "@/components/Input/page";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface InitialStateProps {
  name: string;
  email: string;
  password: string;
}

const initialState: InitialStateProps = {
  name: "",
  email: "",
  password: "",
};

export default function page() {
  const router = useRouter();
  const [state, setstate] = useState(initialState);
  const handleChange = (e: any) => {
    setstate({ ...state, [e.target.name]: e.target.value });
    e.preventDefault();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post("/api/register", state)
      .then(() => {
        router.refresh();
      })
      .then(() => {
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      })
      .catch((error: any) => {});
  };

  return (
    <form className=" text-center" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <Input
          placeholder={"Name"}
          id="name"
          name="name"
          type={"text"}
          onChange={handleChange}
          value={state.name}
        />
        <Input
          placeholder={"Email"}
          id="email"
          name="email"
          type={"email"}
          onChange={handleChange}
          value={state.email}
        />
        <Input
          placeholder={"Password"}
          id="password"
          name="password"
          type={"password"}
          onChange={handleChange}
          value={state.password}
        />
        <button type="submit">Submit</button>
      </div>
      <div>
        <div>
          Do you have an account ?{" "}
          <Link href={"/login"} className=" text-white">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
}
