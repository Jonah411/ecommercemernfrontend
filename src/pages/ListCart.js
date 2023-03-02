import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthCart from "../components/cart/AuthCart";
import UnAuthCart from "../components/cart/UnAuthCart";
import AlertToast from "../components/common/AlertToast";
import {
  getAddCartDetails,
  getLoginDetails,
} from "../feature/loginReducer/loginReducer";
import { useGetAllCartQuery } from "../feature/profileReducer/authProfile";

const ListCart = () => {
  const auth = useSelector(getLoginDetails);
  const cartList = useSelector(getAddCartDetails);
  const { data: cartData } = useGetAllCartQuery(auth?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [cart, setCart] = useState();
  const [totalPrice, setToatalPrice] = useState();
  useEffect(() => {
    setCart(cartData?.carts);
    setToatalPrice(cartData?.totalPrice);
  }, [cartData]);
  return (
    <div className="container">
      <p className="fw-bold mb-2">Cart Details</p>
      {auth ? (
        <AuthCart cartData={cart} totalPrice={totalPrice} />
      ) : (
        <UnAuthCart cartData={cartList} />
      )}
      <AlertToast />
    </div>
  );
};

export default ListCart;
