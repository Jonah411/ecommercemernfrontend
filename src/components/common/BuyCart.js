import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@mui/material/Button";
import Quantity from "../cart/Quantity";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkoutDetails } from "../../feature/loginReducer/loginReducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BuyCart = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState(product);
  useEffect(() => {
    setProductData(product);
  }, [product]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const quantityChange = (data) => {
    setQuantity(data);
  };
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setToatalPrice] = useState(0);
  useEffect(() => {
    if (quantity) {
      let total = productData?.price * quantity;
      setToatalPrice(total);
    }
  }, [quantity, productData?.price]);
  const handleClick = () => {
    let productDetails = [
      [
        {
          product: {
            _id: productData?._id,
            name: productData?.name,
            price: productData?.price,
          },
          quantity: quantity,
        },
      ],
      { totalPrice: totalPrice },
      { type: "singleCart" },
    ];
    dispatch(checkoutDetails(productDetails));
    navigate("/checkout");
  };
  return (
    <div className="d-flex justify-content-end">
      <Button color="error" variant="contained" onClick={handleShow}>
        Buy Product
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title> {productData?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p> Price: {productData?.price}</p>
            <p>
              {" "}
              Quantity:
              <Quantity quantityChange={quantityChange} />
            </p>
            <p>
              Total:
              {totalPrice}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="secondary" onClick={handleClick}>
            CheckOut
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BuyCart;
