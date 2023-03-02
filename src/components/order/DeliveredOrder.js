import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import { useGetOrderQuery } from "../../feature/profileReducer/authProfile";
import { AiFillEye, AiOutlineCloseCircle } from "react-icons/ai";
import DataTable from "react-data-table-component";
import { BASE_URL } from "../../constants/ConstaltsVariables";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const DeliveredOrder = () => {
  const user = useSelector(getLoginDetails);
  const navigate = useNavigate();
  let orderApi = {
    user: user?.id,
    type: "delivered",
  };
  const { data: orderData } = useGetOrderQuery(orderApi, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [order, setOrder] = useState(orderData?.order);
  useEffect(() => {
    setOrder(orderData?.order);
  }, [orderData]);
  const columns = [
    {
      name: "Product",
      selector: (row) =>
        row.items?.map((data) => {
          return (
            <div>
              <img
                src={`${BASE_URL}categories/product_image/image/${data.product.product_image}`}
                width="30%"
              />
            </div>
          );
        }),

      sortable: true,
      wrap: true,
      maxWidth: "170px",
    },
    {
      name: "Product Name",
      selector: (row) =>
        row.items?.map((data) => {
          return (
            <div>
              <p>{data.product.name}</p>
            </div>
          );
        }),

      sortable: true,
      wrap: true,
      maxWidth: "170px",
    },
    {
      name: "Product Price",
      selector: (row) =>
        row.items?.map((data) => {
          return (
            <div>
              <p>{data.product.price}</p>
            </div>
          );
        }),

      sortable: true,
      wrap: true,
      maxWidth: "170px",
    },
    {
      name: "Product Quantity",
      selector: (row) =>
        row.items?.map((data) => {
          return (
            <div>
              <p>{data.quantity}</p>
            </div>
          );
        }),

      sortable: true,
      wrap: true,
      maxWidth: "170px",
    },
    {
      name: "Total Price",
      selector: (row) => row.totalPrice,
      sortable: true,
      wrap: true,
      maxWidth: "200px",
    },
    {
      name: "Create Date",
      selector: (row) => row.createdAt,
      sortable: true,
      wrap: true,
      maxWidth: "170px",
    },
  ];
  return (
    <div>
      <DataTable
        className="data-table-store"
        title={<p>Order Pending History</p>}
        columns={columns}
        data={order}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        subHeader
        subHeaderComponent={
          <TextField
            fullWidth
            id="standard-basic"
            label="Search Order"
            variant="standard"
            name="search"
            type="text"
            sx={{ flexGrow: 1, mb: 1.5 }}
            style={{ height: "44px" }}
          />
        }
        actions={
          <Stack spacing={2} direction="row">
            {/* <AddBrand /> */}
            {/* <BrandBanner /> */}
          </Stack>
        }
      />
    </div>
  );
};

export default DeliveredOrder;
