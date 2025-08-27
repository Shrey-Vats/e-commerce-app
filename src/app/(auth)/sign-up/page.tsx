"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/Schema/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/Spinner";
import { signIn } from "next-auth/react";
const page = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isSummiting, setIsSummiting] = useState<boolean>(false);

  const debounced = useDebounceCallback(setEmail, 400);
  const router = useRouter();

  //zod implementation

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSummiting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      toast(response.data.message);
      router.push("/sign-in");
      setIsSummiting(false);
    } catch (error) {
      console.error("error", error);
      const axioserror = error as AxiosError<ApiResponse>;
      toast(axioserror.response?.data.message ?? "Error checking email");
    } finally {
      setIsSummiting(false);
    }
  };

  useEffect(() => {
    const checkEmail = async () => {
      if (email) {
        setIsChecking(true);
        setEmailError("");
        try {
          const response = await axios.get(
            `/api/check-email?email=${encodeURIComponent(email)}`
          );

          setEmailError(response.data.message);
        } catch (error) {
          const AxiosError = error as AxiosError<ApiResponse>;
          setEmailError(
            AxiosError.response?.data.message ?? "Error checking email"
          );
        } finally {
          setIsChecking(false);
        }
      }
    };
    checkEmail();
  }, [email]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
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
          <h1 className="text-3xl font-medium mb-5">Sign up to ShopSee</h1>
          <input
            type="text"
            {...register("name")}
            className="md:w-3/6 w-4/6 px-4 py-2 rounded-4xl outline-none  bg-gray-100"
            placeholder="Username"
          />
          {errors.name && (
            <p className="text-red-500 font-medium">{errors.name?.message}</p>
          )}

          <input
            type="text"
            {...register("email")}
            onChange={(e) => {
              debounced(e.target.value);
            }}
            className="md:w-3/6 w-4/6  px-4 py-2 rounded-4xl outline-none bg-gray-100"
            placeholder="Email"
          />
          {isChecking ? (
            <Spinner />
          ) : (
            <p
              className={
                emailError === "Email not exists"
                  ? "text-green-500 font-medium"
                  : " text-red-500 font-medium"
              }
            >
              {emailError}
            </p>
          )}
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
            disabled={!isValid || isSummiting || isChecking}
            className="md:w-3/6 w-4/6  py-2 cursor-pointer hover:bg-[#eb5402] bg-[#f25805] text-white rounded-4xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign up
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
          <button
            className="md:w-3/6 w-4/6  py-2 cursor-pointer hover:bg-gray-50 border-1 flex items-center justify-center gap-2 border-gray-200 rounded-4xl font-medium"
            onClick={() => signIn("google")}
          >
            {" "}
            <FcGoogle className="w-5 h-5" /> Google
          </button>
          <button
            className="md:w-3/6 w-4/6  py-2 cursor-pointer hover:bg-gray-50 border-1 flex items-center justify-center gap-2 border-gray-200 rounded-4xl font-medium"
            onClick={() => signIn("github")}
          >
            {" "}
            <FaGithub className="w-5 h-5" /> Github
          </button>
          <p className="md:w-3/6 w-4/6  text-center text-gray-600 text-sm font-medium">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#f25805] font-semibold ">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default page;
