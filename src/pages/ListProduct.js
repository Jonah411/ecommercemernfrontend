import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {
  useGetCategorieQuery,
  useGetProductsQuery,
  useGetWishListQuery,
} from "../feature/profileReducer/authProfile";
import { useParams } from "react-router-dom";
import ProductList from "../components/products/ProductList";
import ProductPath from "../components/products/ProductPath";
import ProductType from "../components/products/ProductType";
import { getLoginDetails } from "../feature/loginReducer/loginReducer";
import { useSelector } from "react-redux";

const ListProduct = () => {
  const user = useSelector(getLoginDetails);
  let { name } = useParams();
  let list = {
    id: name,
    type: "category",
  };
  const { data: productData } = useGetProductsQuery(list, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const { data: categorieData } = useGetCategorieQuery(name, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (productData) {
      setProducts(productData?.data);
    }
  }, [productData]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    if (categorieData) {
      setCategory(categorieData?.data);
    }
  }, [categorieData]);
  const path = [
    "Home",
    categorieData?.parentData?.name,
    categorieData?.subData?.name,
  ];
  const { data: wishListDatas } = useGetWishListQuery(user?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const [wishList, setWishList] = useState(wishListDatas?.data);
  useEffect(() => {
    if (wishListDatas) {
      setWishList(wishListDatas?.data);
    }
  }, [wishListDatas]);
  return (
    <div>
      {Object.keys(products).length === 0 ? (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {" "}
          <Typography gutterBottom variant="h5" component="div">
            No Products!
          </Typography>
        </Stack>
      ) : (
        <div className="container-fluid">
          <div className="container p-3">
            <ProductPath pathList={path} />
          </div>
          <div className="container p-3">
            <ProductType
              title="Categories"
              productType={category}
              products={products}
            />
          </div>
          <div className="container p-3">
            <ProductList
              productData={products}
              title="Categories"
              routeList={list}
              wishListData={wishList}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProduct;
