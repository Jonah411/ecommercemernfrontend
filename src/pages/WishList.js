import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiFillEye, AiOutlineCloseCircle } from "react-icons/ai";
import {
  useAddWishListMutation,
  useGetWishListQuery,
} from "../feature/profileReducer/authProfile";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../feature/loginReducer/loginReducer";
import { BASE_URL } from "../constants/ConstaltsVariables";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const user = useSelector(getLoginDetails);
  const navigate = useNavigate();
  const { data: wishListData } = useGetWishListQuery(user?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [addWishList, { data: wishListDatas, error, isSuccess, isError }] =
    useAddWishListMutation();
  const [wishList, setWishList] = useState([]);
  useEffect(() => {
    if (wishListData) {
      setWishList(wishListData?.data);
    }
  }, [wishListData]);

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.product.name,
      sortable: true,
      wrap: true,
      maxWidth: "170px",
    },
    {
      name: "Product Image",
      selector: (row) => {
        return (
          <img
            src={`${BASE_URL}categories/product_image/image/${row.product.product_image}`}
            width="100%"
          />
        );
      },
      sortable: true,
      wrap: true,
      maxWidth: "200px",
    },
    {
      name: "Product Price",
      selector: (row) => row.product.price,
      sortable: true,
      wrap: true,
      maxWidth: "170px",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-secondary"
            onClick={() => {
              navigate(`/product_details/${row?.product?._id}`);
            }}
          >
            <AiFillEye />
          </button>
          <button
            className="btn btn-danger"
            onClick={(e) => {
              e.preventDefault();
              let patch = {
                user: user.id,
                product: row?.product?._id,
                wishList: 0,
              };
              addWishList(patch);
              navigate("/profile/wish_list");
            }}
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <DataTable
        className="data-table-store"
        title={<p>WishList</p>}
        columns={columns}
        data={wishList}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        subHeader
        subHeaderComponent={
          <TextField
            fullWidth
            id="standard-basic"
            label="Search wishList"
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

export default WishList;
