import React from "react";
import { useNavigate } from "react-router-dom";

const CheckOutAddress = ({ address }) => {
  const navigate = useNavigate();
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between">
        <div>
          <p className="fw-bold">Shipping Address</p>
          <>
            <p>Name: {address?.name}</p>
            <p>Street: {address?.street}</p>
            <p>City: {address?.city}</p>
            <p>State: {address?.state}</p>
            <p>ZIP: {address?.zip}</p>
            <p>Country: {address?.country}</p>
          </>
        </div>
        <div>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/profile/address")}
          >
            Change Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutAddress;
