import { EmptyList } from "./EmptyList";
import { ProductCard } from "./ProductCard";
import { ProductMinCard } from "./ProductMinCard";
import { Search } from "./Search";
import { NewProduct } from "./product/NewProduct";

export const ListProducts = ({ data, search }) => {
  const query = search || "";
  const datac = data || [];

  const filteredData =
    datac.filter((product) => product.name.includes(query)) || [];
  return (
    <div className="p-5 h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="text-2xl font-bold mb-5">List of Products</h1>
        <Search />
      </div>
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
            {filteredData?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {data?.map((product) => (
          <ProductMinCard key={product.id} product={product} />
        ))}
      </div>
      {!filteredData.length && <EmptyList />}
      <NewProduct />
    </div>
  );
};
