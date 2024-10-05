import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import paymentImg from "../assets/QR_Code.jpg";
import { MdArrowRightAlt } from "react-icons/md";

const PaymentPortal = () => {
  const navigate = useNavigate();
  const { backendUrl, currencySymbol, Token } = useContext(AppContext);
  const [cartData, setCartData] = useState([]);

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

  useEffect(() => {
    if (Token) {
      getcartData();
    }
  }, [Token]);

  const originalPrice = cartData.reduce(
    (total, product) => total + product.amount,
    0
  );
  const tax = (originalPrice * 18) / 100;
  const totalPrice = originalPrice + tax;
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          Pay <span className="text-gray-700 font-medium">Now</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px] rounded shadow-xl"
          src={paymentImg}
          alt=""
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 w-full h-full">
            <p className="text-xl font-semibold text-gray-900">Order summary</p>

            <div className="space-y-4">
              <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 ">
                    Original price
                  </dt>
                  <dd className="text-base font-medium text-gray-900 ">
                    {currencySymbol} {originalPrice.toFixed(2)}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 ">
                    Tax (18%)
                  </dt>
                  <dd className="text-base font-medium text-gray-900 ">
                    {currencySymbol} {tax.toFixed(2)}
                  </dd>
                </dl>
              </div>

              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                <dt className="text-base font-bold text-gray-900 ">Total</dt>
                <dd className="text-base font-bold text-gray-900 ">
                  {currencySymbol} {totalPrice.toFixed(2)}
                </dd>
              </dl>
            </div>

            <button
              onClick={() => {
                navigate("/");
              }}
              className="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-emerald-500"
            >
              Payment Done
            </button>

            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {" "}
                or{" "}
              </span>
              <a
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
              >
                Continue Shopping <MdArrowRightAlt size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPortal;
