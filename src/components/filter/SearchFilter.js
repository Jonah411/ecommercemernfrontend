import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useGetAllProductsQuery } from "../../feature/profileReducer/authProfile";
import { useDispatch } from "react-redux";
import { searchProductDetails } from "../../feature/loginReducer/loginReducer";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: productData } = useGetAllProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    if (productData) {
      setProductsList(productData?.data);
    }
  }, [productData]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      const datalist = productsList.filter((product) => {
        return product?.name
          .toLowerCase()
          .includes(searchQuery.search.toLowerCase());
      });
      const categoriesList = productsList.filter((product) => {
        return product?.categories?.name
          .toLowerCase()
          .includes(searchQuery.search.toLowerCase());
      });
      const brandsList = productsList.filter((product) => {
        return product?.brands?.name
          .toLowerCase()
          .includes(searchQuery.search.toLowerCase());
      });
      const productList = [...datalist, ...categoriesList, ...brandsList];
      const uniqueArray = Array.from(
        new Set(productList.map(JSON.stringify)),
        JSON.parse
      );
      dispatch(searchProductDetails(uniqueArray));
      navigate("/search_products");
    }
  }, [searchQuery]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
  };
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        name="search"
        onChange={handleChange}
      />
    </Search>
  );
};

export default SearchFilter;
