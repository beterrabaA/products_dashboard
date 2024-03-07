import { RegisterForm } from "@/components/RegisterForm";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

export default async function Register() {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");

  const teste = token?.value || "";

  if (teste) redirect("/dashboard");

  return <RegisterForm />;
}
