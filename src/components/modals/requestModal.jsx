import Modal from "@mui/material/Modal";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
import { authHeader } from "@/utils/auth";
function RequestModal({ open, handleClose, item, overstockId, user }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const handleRequestEmail = (e) => {
    e.preventDefault();
    const dataObj = {
      overstockCategory: item.overstockCategory,
      fullname: user.userInfo.fullname,
      quantity,
      description,
      itemDesc: item.itemDesc,
    };
    if (window && window !== undefined) {
      fetch(`${window.location.origin}/api/requestItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify(dataObj),
      })
        .then((res) => res.json())
        .then((data) => {
          if (isEmpty(data.error)) {
            Swal.fire({
              icon: "success",
              text: "Email sent successfully",
            });
          } else {
            Swal.fire({
              icon: "error",
              text: "Something went wrong",
            });
          }
        })
        .catch((err) => console.log(err));
    }
    setShowMsg(true);
  };
  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-row justify-center align-middle w-full h-full"
    >
      <div
        className="bg-white w-5/6 p-10 border-none overflow-y-scroll"
        style={{ alignSelf: "center" }}
      >
        <div className="mb-10">
          <Button
            onClick={() => handleClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">Open</h1>
          </Button>
        </div>
        <div>
          <form
            className="flex flex-row gap-5 flex-wrap w-full mt-9"
            onSubmit={handleRequestEmail}
          >
            <div className="flex flex-col w-1/4 gap-2">
              <label className="font-semibold">Overstock Category</label>
              <input
                type="text"
                value={item.overstockCategory}
                disabled={true}
                className="border-2 border-gray-200 p-2 rounded-xl"
              />
            </div>
            <div className="flex flex-col w-1/4 gap-2">
              <label className="font-semibold">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border-2 border-gray-200 p-2 rounded-xl"
              />
            </div>
            <div className="flex flex-col w-1/4 gap-2">
              <label className="font-semibold">Item Description</label>
              <input
                type="text"
                className="border-2 border-gray-200 p-2 rounded-xl"
                value={item.itemDesc}
                disabled={true}
              />
            </div>
            <div className="flex flex-col w-1/4 gap-2">
              <label className="font-semibold">Description</label>
              <input
                type="text"
                className="border-2 border-gray-200 p-2 rounded-xl"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex w-full justify-end">
              <input
                type="submit"
                value={"Send"}
                className="bg-orange-400 font-semibold text-white p-2 rounded-xl"
              />
            </div>
          </form>
          {showMsg ? (
            <div style={{ paddingTop: "20px" }}>
              <p>
                {user.userInfo.fullname} is requesting {quantity} x
                {item.overstockCategory} {item.itemDesc}
              </p>
              <p>
                <strong style={{ fontWeight: "600" }}>Description</strong>:{" "}
                {description}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

export default RequestModal;
