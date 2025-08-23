"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceValue, useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/Schema/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/Spinner";
import { signInSchema } from "@/Schema/signInSchema";
import { signIn } from "next-auth/react";
import { Toast } from "@/components/ui/toast";
import { fa } from "zod/v4/locales";
const page = () => {
  const [isSummiting, setIsSummiting] = useState<boolean>(false);

  const router = useRouter();

  //zod implementation

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(result);

    if (result?.error) {
        <Toast variant="error" title="Error during sign in" description={result.error} />
    } else {
        <Toast variant="success" title="User Login Successful" description="User logged in successfully" />
      router.push("/");
    }

    if(result?.url){
      router.replace("/h")
    }
    
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="md:h-screen md:w-3/6 bg-gray-300 hidden md:block">
        <img
          src={"/login.jpg"}
          alt=""
          className="h-full w-full"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="h-full md:w-3/6 w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-auto  flex flex-col justify-center md:gap-3 gap-2 items-center"
        >
          <h1 className="text-3xl font-medium mb-5">Sign in to ShopSee</h1>

          <input
            type="text"
            {...register("email")}
            className="md:w-3/6 w-4/6  px-4 py-2 rounded-4xl outline-none bg-gray-100"
            placeholder="Email"
          />

          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <input
            type="password"
            {...register("password")}
            className="md:w-3/6 w-4/6  px-4 py-2 rounded-4xl outline-none bg-gray-100"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 font-medium">
              {errors.password.message}
            </p>
          )}
          <div className="md:w-3/6 w-4/6  flex justify-end items-center ">
            <div className="flex items-center justify-end">
              <Checkbox className="" />
              <span>Remember me</span>
            </div>
          </div>
          <button
            disabled={!isValid || isSummiting}
            className="md:w-3/6 w-4/6  py-2 cursor-pointer hover:bg-[#eb5402] bg-[#f25805] text-white rounded-4xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign in
          </button>
          {isSummiting ? <Spinner /> : null}
          <div className="flex items-center py-5 md:w-3/6 w-4/6 " id="divider">
            <div className="flex-grow h-[1px] bg-gray-400"></div>
            <span
              className="flex-shrink mx-4 text-gray-500 text-sm"
              id="divider-text"
            >
              Or sign with
            </span>
            <div className="flex-grow h-[1px] bg-gray-400"></div>
          </div>
          <button className="md:w-3/6 w-4/6  py-2 cursor-pointer hover:bg-gray-50 border-1 flex items-center justify-center gap-2 border-gray-200 rounded-4xl font-medium" onClick={() => signIn("google")}>
            {" "}
            <FcGoogle className="w-5 h-5" /> Google
          </button>
          <button className="md:w-3/6 w-4/6  py-2 cursor-pointer hover:bg-gray-50 border-1 flex items-center justify-center gap-2 border-gray-200 rounded-4xl font-medium" onClick={() => signIn("github")}>
            {" "}
            <FaGithub className="w-5 h-5" /> Github
          </button>
          <p className="md:w-3/6 w-4/6  text-center text-gray-600 text-sm font-medium">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-[#f25805] font-semibold ">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default page;
