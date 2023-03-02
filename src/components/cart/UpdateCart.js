import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import { useUpdateCartMutation } from "../../feature/profileReducer/authProfile";
import { toast } from "react-toastify";
import AlertToast from "../common/AlertToast";
import { useNavigate } from "react-router-dom";

const UpdateCart = ({ product, quantity, totalChange }) => {
  const user = useSelector(getLoginDetails);
  const navigate = useNavigate();
  const [updateCart, { data, isSuccess }] = useUpdateCartMutation();

  const handleUpdate = () => {
    let data = {
      userId: user?.id,
      productId: product?.product?._id,
      quantity: quantity,
    };
    updateCart(data);
  };
  useEffect(() => {
    if (isSuccess) {
      if (data?.status === true) {
        toast.success(`${data?.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        totalChange(data?.totalPrice);
        navigate("/cart");
      } else {
        toast.error(`${data?.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }, [isSuccess]);
  return (
    <>
      <Button
        variant="contained"
        disabled={product?.quantity === quantity}
        onClick={handleUpdate}
      >
        Update
      </Button>
      <AlertToast />
    </>
  );
};

export default UpdateCart;
