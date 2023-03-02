import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Banner1 from "../../assets/banner/banner1.jpg";
import Banner2 from "../../assets/banner/banner2.jpg";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { useGetActiveBannerQuery } from "../../feature/profileReducer/authProfile";
import { BASE_URL } from "../../constants/ConstaltsVariables";
import { useNavigate } from "react-router-dom";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
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
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));
function Banner() {
  const { data: brannerData } = useGetActiveBannerQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const navigate = useNavigate();
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    if (brannerData) {
      setBanner(brannerData?.data);
    }
  }, [brannerData]);
  return (
    <div>
      <Carousel>
        {banner &&
          banner?.map((data) => {
            return (
              <Carousel.Item interval={5000} key={data?.brand?._id}>
                <ImageButton
                  focusRipple
                  style={{
                    width: "100%",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/brand/${data?.brand?._id}`);
                  }}
                >
                  <ImageSrc
                    style={{
                      backgroundImage: `url(${BASE_URL}categories/brand_image/${data?.name})`,
                    }}
                  />
                  {/* //  */}
                  <ImageBackdrop className="MuiImageBackdrop-root" />
                  <Image>
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="inherit"
                      sx={{
                        position: "relative",
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                      }}
                    >
                      {data.brand.name}
                      <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                  </Image>
                </ImageButton>
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
      <Box
        sx={{ display: "flex", flexWrap: "wrap", minWidth: 300, width: "100%" }}
      ></Box>
    </div>
  );
}

export default Banner;
