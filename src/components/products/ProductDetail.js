import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import {
  useGetProductsQuery,
  useGetSingleWishListQuery,
} from "../../feature/profileReducer/authProfile";
import Details from "./Details";
import ImageGalleryDetails from "./ImageGallery";

const ProductDetail = () => {
  const user = useSelector(getLoginDetails);
  let { id } = useParams();
  let list = {
    id: id,
    type: "product",
  };
  const { data: productData } = useGetProductsQuery(list, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (productData) {
      setProducts(productData?.data[0]);
    }
  }, [productData]);

  const listData = {
    user_id: user?.id,
    product_id: id,
  };
  const { data: wishListDatas } = useGetSingleWishListQuery(listData, {
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
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-6">
          <ImageGalleryDetails
            images={products?.product_gallery}
            wishListData={wishList}
            productId={id}
          />
        </div>
        <div className="col-12 col-sm-6">
          <Details details={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
