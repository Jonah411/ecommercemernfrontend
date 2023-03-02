import React from "react";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";

const ShoppingButton = ({ cartData }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/cart");
  };
  return (
    <IconButton
      size="large"
      edge="end"
      aria-label="account of current user"
      aria-haspopup="true"
      color="inherit"
      onClick={handleClick}
    >
      <Badge badgeContent={cartData?.length} color="primary">
        <AddShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default ShoppingButton;
