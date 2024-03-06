import { ListProducts } from "@/components/ListProducts";
import { cookies } from "next/headers";

export default async function DashboardPage({ searchParams }) {
  const cookiesStore = cookies();
  const { value } = cookiesStore.get("token");

  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
    method: "GET",
    headers: {
      Authorization: value,
    },
    cache: "no-store",
  }).catch((err) => console.log(err));
  const data = (await products?.json()) || [];
  return <ListProducts data={data} search={searchParams.query} />;
}
