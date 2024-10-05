import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";

const ProductList = () => {
  const navigate = useNavigate();
  const { backendUrl, currencySymbol, Token } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  const getProductData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/productData`, {
        headers: { Token: Token },
      });
      if (data.success) {
        setProducts(data.data);
        console.log(data.data);
      } else {
        toast.error("Failed to get product data.");
      }
    } catch (error) {
      console.error("Error in getting product data", error);
      toast.error(error.message);
    }
  };

  const handleCartAction = async (productId, cart) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/user/cart`,
        { productId, cart: !cart },
        { headers: { Token: Token } }
      );
      if (data.success) {
        toast.success("Product added to cart successfully.");
        getProductData();
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error(
        "Error adding product to cart",
        error.response && error.response.data.message
      );
    }
  };

  useEffect(() => {
    if (Token) {
      getProductData();
    }
  }, [Token]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div className="w-full min-w-40 grid sm:grid-cols-4 gap-4 gap-y-6 grid-auto-rows-[minmax(150px, auto)]">
          {products.map((data, index) => (
            <div
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 shadow-2xl shadow-stone-500"
            >
              <div className="w-full h-60 overflow-hidden rounded-t-lg shadow-2xl shadow-stone-200">
                <img
                  className="w-full h-full object-contain"
                  src={data.ProductImg}
                  alt={data.name}
                />
              </div>

              <div className="p-4 grid">
                <div className="flex items-center gap-2 text-sm text-center">
                  <p className="w-2 h-2 text-green-500 bg-green-500 rounded-full"></p>
                  <p className="text-green-500">In Stock</p>
                </div>

                <p className="text-gray-900 text-lg font-medium">{data.name}</p>

                <p className="text-gray-600 text-sm">{data.brandName}</p>

                <div className="flex items-center gap-1">
                  <p className="text-gray-900 text-base font-medium">
                    Flavour:
                  </p>
                  <p className="text-gray-600 text-sm">{data.flavour}</p>
                </div>

                <div className="flex items-center gap-1">
                  <p className="text-gray-900 text-base font-medium">
                    Servings:{" "}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {data.servingsPerContainer}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <p className="text-gray-900 text-base font-medium">Price: </p>
                  <p className="text-gray-800 text-base">
                    <span className="text-green-600 text-lg">
                      {currencySymbol}
                    </span>
                    {data.amount}
                  </p>
                </div>
                {data.cart ? (
                  <button
                    className="px-2 py-2 mt-2 bg-primary border rounded-lg text-white hover:bg-green-500"
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    Place Your Order
                  </button>
                ) : (
                  <button
                    className="px-2 py-2 mt-2 bg-primary border rounded-lg text-white hover:bg-green-500"
                    onClick={() => handleCartAction(data._id, data.cart)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
