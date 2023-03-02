import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FiEdit2 } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddCategories from "../components/categories/AddCategories";
import { useGetAllBrandsQuery } from "../feature/profileReducer/authProfile";
import { BASE_URL } from "../constants/ConstaltsVariables";
import AddBrand from "../components/brand/AddBrand";
import BrandBanner from "../components/brand/BrandBanner";

const Brand = () => {
  const { data: brandData } = useGetAllBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    if (brandData) {
      setBrands(brandData?.data);
    }
  }, [brandData]);
  const navigate = useNavigate();
  const columns = [
    {
      name: "Brand Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
      maxWidth: "170px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      wrap: true,
      maxWidth: "200px",
    },
    {
      name: "Image",
      selector: (row) => {
        return (
          <img
            src={`${BASE_URL}categories/brand_image/${row.brand_image}`}
            width="100%"
          />
        );
      },
      sortable: true,
      wrap: true,
      maxWidth: "200px",
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-secondary"
            onClick={() => {
              navigate("brand");
            }}
          >
            <AiFillEye />
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("brand");
            }}
          >
            <FiEdit2 />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <DataTable
        className="data-table-store"
        title={<p>Brands List</p>}
        columns={columns}
        data={brands}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        subHeader
        subHeaderComponent={
          <TextField
            fullWidth
            id="standard-basic"
            label="Search Brands"
            variant="standard"
            name="search"
            type="text"
            sx={{ flexGrow: 1, mb: 1.5 }}
            style={{ height: "44px" }}
          />
        }
        actions={
          <Stack spacing={2} direction="row">
            <AddBrand />
            <BrandBanner />
          </Stack>
        }
      />
    </div>
  );
};

export default Brand;
