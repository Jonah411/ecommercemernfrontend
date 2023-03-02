import React from "react";
import Cart from "./Cart";

const UnAuthCart = ({ cartData }) => {
  return (
    <div className="container p-3">
      {cartData?.map((data, index) => (
        <Cart product={data} key={index} />
      ))}
    </div>
  );
};

export default UnAuthCart;
