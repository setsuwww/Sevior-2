"use client"; // hanya jika komponen client

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserService } from "@/_lib/services/user_service";
import { User } from "@/types/User";

export default function UserEditPage() {
  const router = useRouter();
  const params = useParams();  // { id: string }
  const userId = Number(params.id);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      const data = await new UserService().getById(userId);
      setUser(data);
    };
    fetchUser();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit User {user.Name}</h1>
      {/* form update */}
    </div>
  );
}
