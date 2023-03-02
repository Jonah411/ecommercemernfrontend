import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import ProductList from "../components/products/ProductList";
import {
  getLoginDetails,
  getPriceProductDetails,
  getSearchProductDetails,
} from "../feature/loginReducer/loginReducer";
import PriceFilter from "../components/filter/PriceFilter";
import { useGetWishListQuery } from "../feature/profileReducer/authProfile";

const SearchProducts = () => {
  const productsList = useSelector(getSearchProductDetails);
  const priceproductsList = useSelector(getPriceProductDetails);
  const [products, setProducts] = useState([]);
  const [priceProducts, setPriceProducts] = useState(null);

  useEffect(() => {
    if (productsList || priceproductsList) {
      setProducts(productsList);
      setPriceProducts(priceproductsList);
    }
  }, [productsList, priceproductsList]);

  // wishlist
  const user = useSelector(getLoginDetails);
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
          {/* <div className="container p-3">
            <ProductPath pathList={path} />
          </div>
          <div className="container p-3">
            <ProductType
              title="Categories"
              productType={category}
              products={products}
            />
          </div> */}
          <div className="row">
            <div className="col-12 col-sm-4 col-md-2">
              <div className="pt-2">
                <PriceFilter />
              </div>
            </div>
            <div className="col-12 col-sm-8 col-md-10">
              <div className="container p-3">
                {priceProducts && Object.keys(priceProducts).length != 0 && (
                  <ProductList
                    productData={priceProducts}
                    title="Price"
                    wishListData={wishList}
                  />
                )}
                {products && (
                  <ProductList
                    productData={products}
                    title="All"
                    wishListData={wishList}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
