import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const AllProduct = () => {
  const { aToken, backendUrl, products, setProducts, getProductsData } =
    useContext(AdminContext);
  const currency = "₹";

  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    _id: "",
    name: "",
    amount: "",
    weight: "",
    servingsPerContainer: "",
  });

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/admin/remove-product`,
        {
          data: { productId },
          headers: { aToken: aToken },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getProductsData(); // Reload products after delete
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting product", error);
      toast.error("Failed to delete product.");
    }
  };

  useEffect(() => {
    if (aToken) {
      getProductsData();
    }
  }, [aToken]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct({
      _id: product._id,
      name: product.name,
      amount: product.amount,
      weight: product.weight,
      servingsPerContainer: product.servingsPerContainer,
      flavour: product.flavour,
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${backendUrl}/api/admin/update-product`,
        {
          productId: currentProduct._id,
          amount: currentProduct.amount,
          weight: currentProduct.weight,
          servingsPerContainer: currentProduct.servingsPerContainer,
        },
        { headers: { aToken: aToken } }
      );

      if (response.data.success) {
        toast.success("Product updated successfully!");
        getProductsData();
        toggleModal();
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product", error);
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="w-full max-w-6xl m-5 sm:m-8 overflow-visible">
      <div className="relative overflow-x-auto shadow-2xl shadow-stone-500 rounded-xl sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-950">
          <thead className="text-xs text-gray-700 bg-stone-200">
            <tr>
              <th scope="col" className=" px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Flavour
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((data, index) => (
                <tr className="bg-fuchsia-100 border-b" key={index}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {data.name}
                  </td>
                  <td className=" px-4 sm:px-6 py-2 sm:py-4">
                    {data.brandName}
                  </td>
                  <td className=" px-4 sm:px-6 py-2 sm:py-4">{data.flavour}</td>
                  <td className="px-4 sm:px-6 py-4 ">
                    {currency} {data.amount}
                  </td>
                  <td className="px-4 sm:px-6 py-4  flex items-center justify-evenly cursor-pointer gap-2">
                    <FaRegEdit
                      size={24}
                      color="green"
                      onClick={() => handleEditProduct(data)}
                    />
                    <MdOutlineDeleteOutline
                      onClick={() => handleDeleteProduct(data._id)}
                      size={24}
                      color="red"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
          <div className="relative p-4 w-full max-w-4xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">Update Product</h3>
                <RxCross1
                  onClick={toggleModal}
                  size={24}
                  className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm flex justify-center items-center"
                />
              </div>
              <form onSubmit={handleSubmit} className="p-4">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={currentProduct.name}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          name: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Type product name"
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      value={currentProduct.amount}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          amount: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="2999"
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="weight"
                      className="block mb-2 text-sm font-medium"
                    >
                      Weight (Pounds)
                    </label>
                    <input
                      type="number"
                      id="weight"
                      value={currentProduct.weight}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          weight: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="Weight"
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="SPC"
                      className="block mb-2 text-sm font-medium"
                    >
                      Servings Per Container
                    </label>
                    <input
                      type="number"
                      id="SPC"
                      value={currentProduct.servingsPerContainer}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          servingsPerContainer: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      placeholder="30"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-4 py-2 text-center"
                >
                  Update Product
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProduct;
