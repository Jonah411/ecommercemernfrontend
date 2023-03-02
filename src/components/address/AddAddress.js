import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile/add_address");
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        Add
      </Button>
    </div>
  );
};

export default AddAddress;
