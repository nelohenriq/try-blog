"use client";

import ImageUpload from "@/components/Input/ImageUpload";
import Input from "@/components/Input/page";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface InitialStateProps {
  name?: string;
  imageSrc: string;
  description: string;
}

const initialState: InitialStateProps = {
  name: "",
  imageSrc: "",
  description: "",
};

export default function page() {
  const router = useRouter();

  const [state, setState] = useState(initialState);

  const setCustomValue = (id: any, value: any) => {
    setState((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
    e.preventDefault();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post("/api/blogs", state)
      .then(() => {
        router.push("/");
      })
      .catch((error: any) => {
        throw new Error(error);
      });
    router.refresh();
  };
  return (
    <form onSubmit={handleSubmit} className="w-[600px] h-[700px] mx-auto py-12">
      <div>
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={state.imageSrc}
        />
      </div>
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <Input
          placeholder={"Blog Header"}
          id="name"
          name="name"
          type={"text"}
          onChange={handleChange}
          value={state.name}
        />
        <Input
          big
          placeholder={"Blog content or description"}
          id="description"
          name="description"
          type={"text"}
          onChange={handleChange}
          value={state.description}
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
