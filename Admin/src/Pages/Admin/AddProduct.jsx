import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const AddProduct = () => {
  const [ProductImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [flavour, setFlavour] = useState("");
  const [amount, setAmount] = useState("");
  const [weight, setWeight] = useState("");
  const [spc, setSPC] = useState("");

  const [about, setAbout] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData to handle file and other inputs
    const formData = new FormData();
    formData.append("name", name);
    formData.append("brandName", brandName);
    formData.append("flavour", flavour);
    formData.append("amount", amount);
    formData.append("weight", weight);
    formData.append("servingsPerContainer", spc);
    formData.append("about", about);

    // Only append if an image is selected
    if (ProductImg) {
      formData.append("ProductImg", ProductImg);
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/admin/add-product`,
        formData,
        {
          headers: { aToken: aToken },
        }
      );

      // If successful, notify user and reset the form
      if (response.data.success) {
        toast.success("Product added successfully!");
        // Reset form inputs
        setName("");
        setBrandName("");
        setFlavour("");
        setAmount("");
        setWeight("");
        setSPC("");
        setAbout("");
        setProductImg(null);
      }
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Product</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={
                ProductImg
                  ? URL.createObjectURL(ProductImg)
                  : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            onChange={(e) => {
              setProductImg(e.target.files[0]);
            }}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            {" "}
            Upload Product <br /> Picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Product Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Brand Name</p>
              <input
                onChange={(e) => setBrandName(e.target.value)}
                value={brandName}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Brand Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Flavour</p>
              <input
                onChange={(e) => setFlavour(e.target.value)}
                value={flavour}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Flavour"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Amount</p>
              <input
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Amount"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Weight</p>
              <input
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Weight"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Servings per Container</p>
              <input
                onChange={(e) => setSPC(e.target.value)}
                value={spc}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Servings per Container"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Product</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded"
            placeholder="Write about Product"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
