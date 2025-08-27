import { prisma } from "@/lib/prisma";
import { UserTableBlock } from "@/components/Block/UsersTable";
import { userAdmin } from "@/types/types";

export default async function Page() {
  const formate = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      roles: true,
    },
  });

  const test = () => {
    console.log("hewejj");
  }

  const users: userAdmin[] = formate.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
  }));

  return (
    <div className="w-screen h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
      <UserTableBlock users={users}/>
    </div>
  );
}
