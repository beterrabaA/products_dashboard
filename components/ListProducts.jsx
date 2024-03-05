"use client";

import { useEffect, useState } from "react";

export const ListProducts = ({ data, token }) => {
  const [datastate, setData] = useState([]);
  const validToken = token || "";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product`,
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      setData(data);
    };
    if (validToken.length > 3) fetchData();
  }, [token]);

  return (
    <div className="p-5 h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-5">List of Products</h1>
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Name
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Model
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Brand
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Variants
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {datastate.map((product) => (
              <tr key={product.id} className="bg-gray-100">
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {product.name}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {product.model}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {product.brand}
                </td>
                <td className="p-3 text-gray-700 whitespace-nowrap">
                  <select
                    className="border border-black rounded-md px-2 py-1 text-sm"
                    name="variants"
                    id="variant-select"
                  >
                    {product.data.map((item, i) => (
                      <option
                        key={item.price + item.color + i}
                        value={item.color}
                      >
                        ${item.price} - {item.color}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <button
                    className="bg-blue-500 text-white font-bold px-6 py-2 rounded-sm"
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white font-bold px-6 py-2 rounded-sm"
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {datastate.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 text-sm py-1">
              <div>Brand: {product.brand}</div>
              <div>Model: {product.model}</div>
            </div>
            <div className="py-1">
              <span className="font-bold pr-3">{product.name}</span>
              <select
                className="border border-black rounded-md px-2 py-1 text-sm"
                name="variants"
                id="variant-select"
              >
                {product.data.map((item, i) => (
                  <option
                    className="py-3"
                    key={item.price + item.color + i}
                    value={item.color}
                  >
                    {item.color} - ${item.price}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white font-bold px-6 py-1 text-sm rounded-sm"
                type="button"
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white font-bold px-6 py-1 text-sm rounded-sm"
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
