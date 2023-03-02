import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkoutDetails } from "../../feature/loginReducer/loginReducer";

import Cart from "./Cart";

const AuthCart = ({ cartData, totalPrice }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartValue, setCartValue] = useState();
  useEffect(() => {
    setCartValue(cartData && cartData?.items);
  }, [cartData]);
  const [price, setPrice] = useState(0);
  const changeTotal = (data) => {
    setPrice(data?.totalPrice);
  };

  useEffect(() => {
    setPrice(totalPrice);
  }, [totalPrice]);
  const handleOut = () => {
    let productDetails = [cartValue, { totalPrice: price }, { type: "carts" }];
    dispatch(checkoutDetails(productDetails));
    navigate("/checkout");
  };
  return (
    <div className="container p-3">
      <div className="card mt-2">
        <div className="card-body">
          {cartValue &&
            cartValue?.map((data, index) => (
              <Cart
                product={data}
                key={index}
                productIndex={index}
                changeTotal={changeTotal}
              />
            ))}
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-end gap-2">
            <div>
              <p className="fw-bold">Total Cart: {price}</p>
              <Button variant="contained" color="secondary" onClick={handleOut}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCart;
