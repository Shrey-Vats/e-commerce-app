import { prisma } from "@/lib/prisma";

export default async function Page({ params }: { params: Promise<{ email: string }> }) {
  const { email: paramEmail } = await params;

  const email = decodeURIComponent(paramEmail);

  const user = await prisma.user.findUnique({ where: { email: email } });

  console.log(user);
  if (user === null) {
    // TODO add a compoents in the components/ui folder for error page with title and description and add there later
    return <h1>User not found check your url</h1>;
  }

  return (
    <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900 p-5">
      <h1 className="text-3xl font-bold">{user.name}</h1>
      <p className="text-2xl font-medium">{user.email}</p>
      <p>{user.id}</p>
      <p>{user.roles}</p>
    </div>
  );
}
