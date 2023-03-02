import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/ConstaltsVariables";

import DeleteCart from "./DeleteCart";
import Quantity from "./Quantity";
import UpdateCart from "./UpdateCart";

const Cart = ({ product, productIndex, changeTotal }) => {
  // const { data: cartDetails } = useGetCartQuery(product?.items[0].product._id, {
  //   refetchOnMountOrArgChange: true,
  //   skip: false,
  // });
  const [cart, setCart] = useState();
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setToatalPrice] = useState(0);
  useEffect(() => {
    setCart(product?.product);
    setQuantity(product?.quantity);
  }, [product]);

  useEffect(() => {
    if (quantity) {
      let total = parseFloat(Number((cart?.price * quantity).toFixed(2)));
      setToatalPrice(total);
    }
  }, [quantity, cart?.price]);

  const quantityChange = (data) => {
    setQuantity(data);
  };
  const totalChange = (data) => {
    let change = {
      totalPrice: data,
      quantity: quantity,
    };
    changeTotal(change);
  };
  return (
    <div className="container border p-2">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-2">
              <img
                src={`${BASE_URL}categories/product_image/image/${cart?.product_image}`}
                width="30%"
                className="rounded mx-auto d-block img-thumbnail"
              />
            </div>
            <div className="col-12 col-sm-12 col-md-10">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-4">
                  <div className="d-flex">
                    <p>Name:</p>
                    <p className="ms-2 fw-bold">{cart?.name}</p>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-4">
                  <div className="d-flex">
                    <p>Price:</p>
                    <p className="ms-2 fw-bold">{cart?.price}</p>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-4">
                  <div className="d-grid">
                    <p>Quantity:</p>
                    <Quantity
                      quantityChange={quantityChange}
                      quantityValue={quantity}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div>
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <p>Total:</p>
                <p className="ms-2 fw-bold">{totalPrice}</p>
              </div>
              <DeleteCart
                cartData={product?.product?._id}
                productIndex={productIndex}
              />
              <UpdateCart
                quantity={quantity}
                product={product}
                totalChange={totalChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
