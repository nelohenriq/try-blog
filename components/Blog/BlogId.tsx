"use client";

import ImageUpload from "@/components/Input/ImageUpload";
import Input from "@/components/Input/page";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { log } from "console";

interface BlogProps {
  name?: string | undefined | null;
  description?: string;
  imageSrc?: any;
  blogId?: string;
}

interface InitialStateProps {
  name: string;
  description: string;
  imageSrc: string;
}

const initialState: InitialStateProps = {
  name: "",
  imageSrc: "",
  description: "",
};

export default function BlogId({
  name,
  description,
  imageSrc,
  blogId,
}: BlogProps) {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [onActive, setOnActive] = useState(false);

  const setCustomValue = (id: any, value: any) => {
    setState((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
    e.preventDefault();
  };

  return (
    <div>
      <div className="w-[500px] mx-auto py-16 bg-blue-200 px-12 flex flex-col gap-4">
        <span className="flex flex-col border-b-2">{name}</span>
      </div>
      <div>
        <span>{description}</span>
      </div>
      <div>
        <Image width={300} height={400} alt="image" src={imageSrc} />
      </div>
      <div>
        <button onClick={() => setOnActive(!onActive)} className=" uppercase">
          edit
        </button>
        <button onClick={onDelete} className=" uppercase">
          delete
        </button>
      </div>

      {onActive && (
        <form onSubmit={handleSubmit}>
          <div>
            <ImageUpload
              value={state.imageSrc}
              onChange={(value) => setCustomValue("imageSrc", value)}
            />
          </div>
          <div className=" flex fl  ex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
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
          </div>
        </form>
      )}
    </div>
  );
}
