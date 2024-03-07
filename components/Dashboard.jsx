"use client";

import { ProductCard } from "./ProductCard";

import { useSearchParams } from "next/navigation";

export const Dashboard = ({ data, token }) => {
  const params = useSearchParams();
  const query = params.get("query");
  let filteredData = data;
  if (query) {
    filteredData = data.filter((product) => product.name.includes(query));
  }
  return (
    <tbody className="divide-y divide-gray-100">
      {filteredData?.map((product) => (
        <ProductCard key={product.id} product={product} token={token} />
      ))}
    </tbody>
  );
};
