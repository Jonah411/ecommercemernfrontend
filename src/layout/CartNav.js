import React from "react";
import MenuItem from "@mui/material/MenuItem";

import { useNavigate } from "react-router-dom";
import ShoppingButton from "./ShoppingButton";

const CartNav = ({ cartData }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/cart");
  };
  return (
    <MenuItem onClick={handleClick}>
      <ShoppingButton cartData={cartData} /> Cart
    </MenuItem>
  );
};

export default CartNav;
