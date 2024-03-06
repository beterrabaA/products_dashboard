"use client";

export const ProductMinCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center space-x-2 text-sm py-1">
        <div>Brand: {product.brand}</div>
        <div>Model: {product.model}</div>
      </div>
      <div className="flex py-1 justify-between">
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
      <div className="flex w-full items-center justify-center">
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
  );
};
