import React from "react";

const ProductType = ({ title, productType, products }) => {
  return (
    <div>
      <div className="d-flex">
        <p className="fw-bold">{title} Name: </p>
        <p className="fw-bold ms-1"> {productType?.name}</p>
      </div>
      <div className="d-flex">
        <p className="fw-bold">Total Product: </p>
        <p className="fw-bold ms-1"> {products?.length}</p>
      </div>
      <div className="">
        <p className="fw-bold">{title} Description: </p>
        <p className="ms-1"> {productType?.description}</p>
      </div>
    </div>
  );
};

export default ProductType;
