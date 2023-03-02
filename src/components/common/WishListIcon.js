import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { BASE_URL } from "../../constants/ConstaltsVariables";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import {
  getLoginDetails,
  getLoginDetailsToken,
} from "../../feature/loginReducer/loginReducer";
import {
  useAddWishListMutation,
  useGetWishListQuery,
} from "../../feature/profileReducer/authProfile";
import { useNavigate } from "react-router-dom";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 300,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: 0,
  display: "flex",
  alignItems: "end",
  justifyContent: "end",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  //   backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

const WishListIcon = ({ image, productId, wishListData, routeList }) => {
  const [images, setImages] = useState();
  const user = useSelector(getLoginDetails);
  const navigate = useNavigate();
  const token = useSelector(getLoginDetailsToken);
  const [addWishList, { data: wishListDatas, error, isSuccess, isError }] =
    useAddWishListMutation();

  const [wishList, setWishList] = useState(wishListData);
  useEffect(() => {
    if (wishListData) {
      setWishList(wishListData);
    }
  }, [wishListData]);
  useEffect(() => {
    setImages(image);
  }, [image]);
  const [iconWishList, setIconWishList] = useState();
  useEffect(() => {
    if (wishListDatas) {
      setIconWishList(wishListDatas?.wishlist);
    }
  }, [wishListDatas]);
  return (
    <>
      <ImageButton
        focusRipple
        style={{
          width: "100%",
        }}
        // onClick={(e) => {
        //   e.preventDefault();
        //   navigate(`/brand/${data?.brand?._id}`);
        // }}
      >
        <ImageSrc
          style={{
            backgroundImage: `url(${BASE_URL}categories/product_image/image/${images})`,
          }}
        />
        <ImageBackdrop className="MuiImageBackdrop-root" />
        {user && (
          <Image>
            <Stack spacing={2}>
              {iconWishList ? (
                iconWishList?.find((icon) => icon.product._id === productId) ? (
                  <Button
                    variant="outlined"
                    onClick={(e) => {
                      e.preventDefault();
                      let patch = {
                        user: user.id,
                        product: productId,
                        wishList: 0,
                      };
                      addWishList(patch);
                      // if (routeList) {
                      //   navigate(`/${routeList.type}/${routeList.id}`);
                      // } else {
                      //   navigate("/");
                      // }
                    }}
                  >
                    <MdFavorite />
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={(e) => {
                      e.preventDefault();
                      let patch = {
                        user: user.id,
                        product: productId,
                        wishList: 1,
                      };
                      addWishList(patch);
                      // if (routeList) {
                      //   navigate(`/${routeList.type}/${routeList.id}`);
                      // } else {
                      //   navigate("/");
                      // }
                    }}
                  >
                    <GrFavorite />
                  </Button>
                )
              ) : wishList?.find(
                  (icon) =>
                    icon.product._id === productId && icon.wishlist === 1
                ) ? (
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    e.preventDefault();
                    let patch = {
                      user: user.id,
                      product: productId,
                      wishList: 0,
                    };
                    addWishList(patch);
                    // if (routeList) {
                    //   navigate(`/${routeList.type}/${routeList.id}`);
                    // } else {
                    //   navigate("/");
                    // }
                  }}
                >
                  <MdFavorite />
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    e.preventDefault();
                    let patch = {
                      user: user.id,
                      product: productId,
                      wishList: 1,
                    };
                    addWishList(patch);
                    // if (routeList) {
                    //   navigate(`/${routeList.type}/${routeList.id}`);
                    // } else {
                    //   navigate("/");
                    // }
                  }}
                >
                  <GrFavorite />
                </Button>
              )}
              {/* <Button variant="outlined">
              <GrFavorite />
            </Button> */}
            </Stack>

            <ImageMarked className="MuiImageMarked-root" />
          </Image>
        )}
      </ImageButton>
    </>
  );
};

export default WishListIcon;
