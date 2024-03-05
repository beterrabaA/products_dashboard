"use client";

import { ListProducts } from "@/components/ListProducts";
import { useSession } from "next-auth/react";

const { Dashboard } = require("@/components/Dashboard");

export default function DashboardPage() {
  const { data: session } = useSession();
  const token = session?.token || "";

  // console.log(token?.token);
  // const getData = await;
  return <ListProducts token={token?.token} />;
}
