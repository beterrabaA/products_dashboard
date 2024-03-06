"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";

import { BadgeMinus } from "lucide-react";
import { revalidate } from "@/actions";
import toast from "react-hot-toast";

export const CardUpdate = ({ isOpen, closeModal, product }) => {
  const [name, setName] = useState(product.name);
  const [model, setModel] = useState(product.model);
  const [brand, setBrand] = useState(product.brand);
  const [data, setData] = useState(product.data);

  const { data: session } = useSession();
  const token = session?.token || "";

  const handleUpdate = async (e) => {
    e.preventDefault();

    const object = { name, model, brand, data };

    fetch(process.env.NEXT_PUBLIC_API_URL + `/product/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token.token,
      },
      body: JSON.stringify(object),
    })
      .then(() => {
        revalidate();
        toast.success("Product updated successfully!");
        closeModal();
      })
      .catch((error) => toast.error("An error occurred!"));
  };

  const handleAddVariant = () => {
    setData([...data, { price: "", color: "" }]);
  };

  const handleDeleteVariant = (i) => {
    setData(data.filter((_, index) => index !== i));
  };

  const handleVariant = (e, i) => {
    const { name, value } = e.target;
    const newData = data;
    newData[i][name] = value;
    setData([...newData]);
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25"></div>
          </Transition.Child>
          <div className="fixed inset-0 overflow-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="bg-white shadow-lg p-5 rounded-lg border-t-4 border-green-400 w-full md:w-2/3 lg:w-auto">
                  <h1 className="text-start text-xl font-bold my-4">Update</h1>
                  <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                    <label
                      htmlFor=""
                      className="flex flex-col items-start pr-1"
                    >
                      Name:
                      <input
                        type="text"
                        name="name-input"
                        className="bg-zinc-200 w-full px-2 py-1 rounded-md"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        placeholder="Product Name"
                      />
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <label
                        htmlFor=""
                        className="flex flex-col items-start pr-1"
                      >
                        Model:
                        <input
                          type="text"
                          name="model-input"
                          className="bg-zinc-200 w-full px-2 py-1 rounded-md"
                          onChange={(e) => setModel(e.target.value)}
                          value={model}
                          required
                          placeholder="Model Name"
                        />
                      </label>
                      <label htmlFor="" className="flex flex-col items-start">
                        Brand:
                        <input
                          type="text"
                          name="brand-input"
                          className="bg-zinc-200 w-full px-2 py-1 rounded-md"
                          onChange={(e) => setBrand(e.target.value)}
                          value={brand}
                          required
                          placeholder="Brand Name"
                        />
                      </label>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Variants</h3>
                      {data.map((item, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-1 md:grid-cols-2 w-max-[400px] border rounded-md mb-1"
                        >
                          <label
                            htmlFor=""
                            className="flex flex-col items-start pr-1"
                          >
                            Color:
                            <input
                              type="text"
                              name="color"
                              className="bg-zinc-200 w-full px-2 py-1 rounded-md"
                              onChange={(e) => handleVariant(e, i)}
                              value={item.color}
                              required
                              placeholder="Color"
                            />
                          </label>
                          <label
                            htmlFor=""
                            className="flex flex-col items-start pr-1"
                          >
                            Price:
                            <div className="flex flex-col md:flex-row w-full md:w-fit items-center">
                              <input
                                type="number"
                                name="price"
                                className="bg-zinc-200 w-full md:w-fit px-2 py-1 rounded-md"
                                onChange={(e) => handleVariant(e, i)}
                                value={item.price}
                                required
                                placeholder="Price"
                              />
                              <button
                                type="button"
                                onClick={() => handleDeleteVariant(i)}
                              >
                                <BadgeMinus
                                  className="my-3 md:my-0"
                                  size={24}
                                />
                              </button>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2">
                      <button
                        className="bg-blue-500 cursor-pointer text-white font-bold px-6 py-2 mr-1 rounded-md"
                        onClick={handleAddVariant}
                        type="button"
                      >
                        Add new variant
                      </button>
                      <button
                        className="bg-green-500 cursor-pointer text-white font-bold px-6 py-2 rounded-md"
                        type="submit"
                      >
                        Confirm
                      </button>
                    </div>

                    {false && (
                      <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {"error"}
                      </div>
                    )}
                  </form>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
