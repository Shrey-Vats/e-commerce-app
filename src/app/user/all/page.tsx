import axios from "axios";
export default async function page() {

    const usersInfo = await axios.get("http://localhost:3000/api/users");
    const users = usersInfo.data.usersInfo;
  

  

  return (
    <div className="w-screen h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">All Users</h1>
      {users.map((user: any) => {
        return <p key={user.id}>{user.name}</p>;
      })}
    </div>
  );
}
