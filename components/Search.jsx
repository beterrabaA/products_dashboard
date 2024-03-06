"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [query] = useDebounce(search, 500);

  useEffect(() => {
    if (!query) {
      return router.push("/dashboard");
    } else {
      router.push(`/dashboard?query=${query}`);
    }
  }, [query, router]);
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border border-gray-300 rounded-md py-2 p-2 md:w-60 w-full"
      placeholder="Search Products"
    />
  );
};
