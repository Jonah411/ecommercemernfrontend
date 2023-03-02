import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartDetails,
  getAddCartDetails,
  getLoginDetails,
} from "../../feature/loginReducer/loginReducer";
import { toast } from "react-toastify";
import { useAddCartListMutation } from "../../feature/profileReducer/authProfile";
import AlertToast from "./AlertToast";
import { useNavigate } from "react-router-dom";

const AddCart = ({ productId }) => {
  const user = useSelector(getLoginDetails);
  const cardData = useSelector(getAddCartDetails);
  const navigate = useNavigate();
  const [addCartList, { data, error, isSuccess, isError }] =
    useAddCartListMutation();
  const dispatch = useDispatch();
  const cartList = {
    user: user ? user?.id : null,
    items: [
      {
        product: { _id: productId },
        quantity: 1,
      },
    ],
  };

  const handleClick = () => {
    if (user) {
      addCartList(cartList);
    } else {
      dispatch(addCartDetails(cartList));
    }
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
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
      <Button variant="contained" onClick={() => handleClick()} key={productId}>
        Add Cart
      </Button>
      <AlertToast />
    </>
  );
};

export default AddCart;
