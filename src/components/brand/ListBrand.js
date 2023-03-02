import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {
  useGetProductsQuery,
  useGetSingleBrandQuery,
  useGetWishListQuery,
} from "../../feature/profileReducer/authProfile";
import ProductList from "../products/ProductList";
import ProductPath from "../products/ProductPath";
import ProductType from "../products/ProductType";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import { useSelector } from "react-redux";

const ListBrand = () => {
  const user = useSelector(getLoginDetails);
  let { name } = useParams();
  let list = {
    id: name,
    type: "brand",
  };
  const { data: productData } = useGetProductsQuery(list, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const { data: brandData } = useGetSingleBrandQuery(name, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [brandDetails, setBrandDetails] = useState(brandData?.data);
  useEffect(() => {
    if (brandData) {
      setBrandDetails(brandData?.data);
    }
  }, [brandData]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (productData) {
      setProducts(productData?.data);
    }
  }, [productData]);
  const path = ["Home", brandDetails?.name];
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
              title="Brand"
              productType={brandDetails}
              products={products}
            />
          </div>
          <div className="container p-3">
            <ProductList
              productData={products}
              title="Brand"
              wishListData={wishList}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListBrand;
