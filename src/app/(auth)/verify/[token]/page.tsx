"use client";
import { MdError } from "react-icons/md";
import { Spinner } from "@/components/ui/Spinner";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

type currentState = "success" | "failed" | "loading";

function page({ params }: { params: Promise<{ token: string }> }) {
  const [message, setMessage] = useState<string>("");
  const [currentState, setCurrentState] = useState<currentState>("loading");
  const { token } = use(params);

  const router = useRouter();
  useEffect(() => {
      const verifyToken = async () => {
    try {
      setCurrentState("loading");
      setMessage("Verifying...");
      const response = await axios.get(`/api/verify-token?token=${token}`);

      if (!response.data.success) {
        setCurrentState("failed");
        setMessage(response.data.message);
      } else {
        setCurrentState("success");
        setMessage(response.data.message);
      }
    } catch (error) {
      setCurrentState("failed");
      setMessage("Failed to verify token" + error);  
    }
    };

    verifyToken()
  }, [token]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-200">
      <div className="h-2/5 w-3/5 flex flex-col items-center justify-center">
        {currentState === "loading" && <><Spinner /> <h1 className=" text-black text-2xl font-medium ">Verifing....</h1> <p className="text-sm font-normal text-gray-500">{message}</p></>}
        {currentState === "success" && <><FaCheckCircle className="text-green-500 text-6xl" /> <h1 className="text-black text-2xl font-medium ">Success!</h1> <p className="text-sm font-normal text-gray-500">{message}</p></>}
       {currentState === "failed" && <><MdError className="text-red-500 text-6xl" /> <h1 className="text-black text-2xl font-medium ">Failed!</h1> <p className="text-sm font-normal text-gray-500">{message}</p></>}

      </div>
    </div>
  );
}

export default page;
