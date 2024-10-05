import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { TiShoppingCart } from "react-icons/ti";

const Cart = () => {
  const navigate = useNavigate();
  const { backendUrl, currencySymbol, Token } = useContext(AppContext);
  const [cartData, setCartData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  // Fetch cart data
  const getcartData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/cartData`, {
        headers: { Token: Token },
      });
      if (data.success) {
        setCartData(data.data);
      } else {
        toast.error("Failed to fetch cart data.");
      }
    } catch (error) {
      toast.error("Failed to fetch cart data.");
    }
  };

  // Fetch order data
  const getOrderData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/orderData`, {
        headers: { Token: Token },
      });
      if (data.success) {
        setOrderData(data.data);
      } else {
        toast.error("Failed to fetch order data.");
      }
    } catch (error) {
      toast.error("Failed to fetch order data.");
    }
  };

  // Remove item from cart
  const handleCartAction = async (productId, cart) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/user/cart`,
        { productId, cart: !cart },
        { headers: { Token: Token } }
      );
      if (data.success) {
        toast.success("Product removed from cart successfully.");
        getcartData();
      } else {
        toast.error("Failed to remove product from cart.");
      }
    } catch (error) {
      console.error(
        "Error removing product from cart",
        error.response?.data.message
      );
    }
  };

  // Toggle favorite status
  const toggleFav = async (productId, isLiked) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/user/watchlist`,
        { productId, isLiked: !isLiked },
        { headers: { Token: Token } }
      );
      if (data.success) {
        toast.success(
          isLiked
            ? "Product removed from Favorites."
            : "Product added to Favorites."
        );
        getcartData();
      } else {
        toast.error("Failed to update favorite status.");
      }
    } catch (error) {
      console.error(
        "Error updating favorite status",
        error.response?.data.message
      );
    }
  };

  // Place an order
  const PlaceOrder = async (productId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/placeOrder`,
        { productId },
        { headers: { Token: Token } }
      );

      if (data.success) {
        toast.success("Order placed successfully.");
        getOrderData(); // Refresh order data after placing order
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order", error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (Token) {
      getOrderData();
      getcartData();
    }
  }, [Token]);

  // Calculate original price and tax
  const originalPrice = cartData.reduce(
    (total, product) => total + product.amount,
    0
  );
  const tax = (originalPrice * 18) / 100;
  const totalPrice = originalPrice + tax;

  return (
    <div>
      <section className="bg-white py-8 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartData.map((cartItem, index) => {
                  // Check if order is placed for this product
                  const orderExists = orderData.some(
                    (order) =>
                      order.productId === cartItem._id && order.isplaced
                  );

                  return (
                    <div
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                      key={index}
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <img
                          className="h-20 w-20 shadow-lg shadow-stone-200 rounded"
                          src={cartItem.ProductImg}
                          alt="Product"
                        />

                        <label htmlFor="counter-input" className="sr-only">
                          Choose quantity:
                        </label>
                        <div className="grid grid-rows-2 gap-2 items-center justify-start md:order-3">
                          <div className="text-end md:order- md:w-32">
                            <p className="text-base font-bold text-gray-900">
                              {currencySymbol} {cartItem.amount}
                            </p>
                          </div>

                          {/* Conditionally render Place Order or Order Placed button */}
                          {orderExists ? (
                            <button className="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-emerald-500">
                              Order Placed
                            </button>
                          ) : (
                            <button
                              onClick={() => PlaceOrder(cartItem._id)}
                              className="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-emerald-500"
                            >
                              <TiShoppingCart size={24} />
                              &nbsp; Place Order
                            </button>
                          )}
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href="#"
                            className="text-base font-medium text-gray-900 hover:underline"
                          >
                            {cartItem.brandName} {cartItem.name}
                          </a>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                              onClick={() =>
                                toggleFav(cartItem._id, cartItem.isLiked)
                              }
                            >
                              {cartItem.isLiked ? (
                                <FaHeart size={20} fill="red" />
                              ) : (
                                <CiHeart size={24} />
                              )}
                              &nbsp; Add to Favorites
                            </button>

                            <button
                              type="button"
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                              onClick={() =>
                                handleCartAction(cartItem._id, cartItem.cart)
                              }
                            >
                              <RxCross2 size={24} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm   sm:p-6">
                <p className="text-xl font-semibold text-gray-900">
                  Order summary
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        {currencySymbol} {originalPrice.toFixed(2)}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Tax (18%)
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        {currencySymbol} {tax.toFixed(2)}
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-semibold text-gray-900">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900">
                      {currencySymbol} {totalPrice.toFixed(2)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
