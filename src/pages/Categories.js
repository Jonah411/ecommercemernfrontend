import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FiEdit2 } from "react-icons/fi";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import AddCategories from "../components/categories/AddCategories";
import { useGetCategoriesQuery } from "../feature/profileReducer/authProfile";
import { BASE_URL } from "../constants/ConstaltsVariables";

const Categories = () => {
  const { data: categoriesData } = useGetCategoriesQuery("data", {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData?.data);
    }
  }, [categoriesData]);
  const navigate = useNavigate();
  const columns = [
    {
      name: "Categories Name",
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
            src={`${BASE_URL}categories/categories_image/${row.categorie_image}`}
            width="100%"
          />
        );
      },
      sortable: true,
      wrap: true,
      maxWidth: "200px",
    },
    {
      name: "Category Type",
      selector: (row) => (row?.sub_categories ? "Sub" : "Parent"),
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
        title={<p>Categories List</p>}
        columns={columns}
        data={categories}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        subHeader
        subHeaderComponent={
          <TextField
            fullWidth
            id="standard-basic"
            label="Search Categories"
            variant="standard"
            name="search"
            type="text"
            sx={{ flexGrow: 1, mb: 1.5 }}
            style={{ height: "44px" }}
          />
        }
        actions={
          <Stack spacing={2} direction="row">
            <AddCategories />
          </Stack>
        }
      />
    </div>
  );
};

export default Categories;
