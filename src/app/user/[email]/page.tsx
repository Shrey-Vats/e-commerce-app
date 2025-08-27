import axios from "axios";
import { prisma } from "@/lib/prisma";
import { paramsEmial, User } from "@/types/types";
import  {cookies} from "next/headers";



export async function generateStaticParams() {
    const users = await prisma.user.findMany();
    const user = users.map((p) => ({ email: p.email }));
    
    return user;
}

export default async function Page({ params }: { params: { email: string } }) {
    const paramEmail = params.email;
    const cookieHeader = cookies().toString();

  const res = await fetch(
    `http://localhost:3000/api/users/${paramEmail}`,
    {
      cache: "no-store",
    headers: { Cookie: cookieHeader },
    }
  );
  const data = await res.json();
  const user: User = data.userInfo;
  if (!res.ok) {
    return <h1>User not found</h1>;
  }
  return (
    <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900 p-5">
      <h1 className="text-3xl font-bold">{user.name}</h1>
      <p className="text-2xl font-medium">{user.email}</p>
      <p>{user._id}</p>
      <p>{user.id}</p>
      <p>{user.roles}</p>
    </div>
  );
}
