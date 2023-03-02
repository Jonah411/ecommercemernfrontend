import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkoutDetails,
  getCheckoutDetails,
  getLoginDetails,
} from "../feature/loginReducer/loginReducer";
import {
  useAddOrderMutation,
  useGetAddressQuery,
  useGetAllCartQuery,
} from "../feature/profileReducer/authProfile";
import { toast } from "react-toastify";
import AlertToast from "../components/common/AlertToast";
import { useNavigate } from "react-router-dom";
import CheckOutAddress from "../components/address/CheckOutAddress";

const Checkout = () => {
  const auth = useSelector(getLoginDetails);
  const { data: cartData } = useGetAllCartQuery(auth?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const { data: addressData } = useGetAddressQuery(auth?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [address, setAddress] = useState(addressData?.data?.address);
  const [mainAdd, setMainAdd] = useState();
  useEffect(() => {
    setAddress(addressData?.data?.address);
  }, [addressData]);
  useEffect(() => {
    const result = address?.find((data) => data?.mainaddress === 1);
    setMainAdd(result);
  }, [address]);
  const [addOrder, { data, error, isSuccess, isError }] = useAddOrderMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector(getCheckoutDetails);
  const [productData, setProductData] = useState(productList && productList[0]);
  const [totalPrice, setTotalPrice] = useState(productList && productList[1]);
  const [type, setType] = useState(productList && productList[2]);
  useEffect(() => {
    setProductData(productList && productList[0]);
    setTotalPrice(productList && productList[1]);
    setType(productList && productList[2]);
  }, [productList]);
  useEffect(() => {
    if (type?.type === "carts") {
      let productDetails = [
        cartData?.carts?.items,
        { totalPrice: cartData?.totalPrice },
        { type: "carts" },
      ];
      dispatch(checkoutDetails(productDetails));
    }
  }, [cartData, type]);
  const handleClick = () => {
    let productList = [];
    productData?.map((data) =>
      productList.push({
        product: data?.product?._id,
        quantity: data?.quantity,
      })
    );
    let patch = {
      user: auth?.id,
      items: productList,
      totalPrice: totalPrice.totalPrice,
    };
    addOrder(patch);
  };
  useEffect(() => {
    if (isSuccess) {
      if (data?.status === true) {
        toast.success(`${data?.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/profile/order_history");
        }, 3000);
      } else {
        toast.error(`${data?.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }, [isSuccess]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-8">
          <div className="container">
            <CheckOutAddress address={mainAdd} />
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-4">
          <div className="container">
            <div className="card">
              <div className="card-header">CheckOut Details</div>
              <div className="card-body">
                {productData?.map((data) => (
                  <div>
                    <p className="fw-bold">{data?.product?.name}</p>
                    <div className="d-flex justify-content-between">
                      <p>{data?.product?.price}</p>
                      <span>*</span>
                      <p>{data?.quantity}</p>
                      <span>=</span>
                      <p>
                        {parseFloat(
                          Number(
                            (data?.product?.price * data?.quantity).toFixed(2)
                          )
                        )}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="d-flex justify-content-end">
                  <p className="fw-bold">Total: {totalPrice.totalPrice}</p>
                </div>
              </div>
              <div className="card-footer">
                <div className="d-grid">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleClick}
                  >
                    confirm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlertToast />
    </div>
  );
};

export default Checkout;
