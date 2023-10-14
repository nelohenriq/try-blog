"use client";

import Input from "@/components/Input/page";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

interface InitialStateProps {
  email: string;
  password: string;
}

const initialState: InitialStateProps = {
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
    signIn("credentials", {
      ...state,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.refresh();
      }
      if (callback?.error) {
        throw new Error("Wrong credentials");
      }
    });
    router.push("/");
  };

  return (
    <form className=" text-center" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
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
          Haven't you got an account yet ?{" "}
          <Link href={"/register"} className=" text-white">
            Register
          </Link>
        </div>
      </div>
    </form>
  );
}
