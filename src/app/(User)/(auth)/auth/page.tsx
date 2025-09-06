"use client";

import LoginPage from "@/components/LoginPage";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function SignIn() {
  const router = useRouter();
  const onPageChange = (page: string) => {
    router.push(`/${page}`);
  }
  return (
    <div className="w-screen h-screen">
      <LoginPage onPageChange={onPageChange}/>
    </div>
  )
}