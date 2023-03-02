import React, { useEffect, useState } from "react";
import "../../../src/App.css";
import { BASE_URL } from "../../constants/ConstaltsVariables";
import { styled } from "@mui/material/styles";
import { GrFavorite } from "react-icons/gr";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import WishListIcon from "../common/WishListIcon";

const ImageGalleryDetails = ({ images, wishListData, productId }) => {
  const [sliderData, setSliderData] = useState(images && images[0]);
  useEffect(() => {
    setSliderData(images && images[0]);
  }, [images]);
  const hendleClick = (index) => {
    const slider = images[index];
    setSliderData(slider);
  };
  return (
    <div className="image-app p-2">
      <WishListIcon
        image={sliderData}
        wishListData={wishListData}
        productId={productId}
      />
      <div className="flex-row">
        {images?.map((image, i) => (
          <img
            src={`${BASE_URL}categories/product_image/image/${image}`}
            className={
              sliderData === image
                ? "img-thumbnail clicked-image"
                : "img-thumbnail"
            }
            height={70}
            width="20%"
            onClick={() => {
              hendleClick(i);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGalleryDetails;
