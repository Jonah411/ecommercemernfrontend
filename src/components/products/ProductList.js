import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CardActionArea, CardActions } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import WishListIcon from "../common/WishListIcon";
import AddCart from "../common/AddCart";
import BuyCart from "../common/BuyCart";

const ProductList = ({ productData, title, routeList, wishListData }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (productData) {
      setProducts(productData);
    }
  }, [productData]);
  return (
    <div>
      <div className="">
        <p className="fw-bold">{`${title} product list:`}</p>
      </div>
      <div className="row">
        {products?.map((data, index) => {
          return (
            <div className="col-12 col-sm-12 col-md-6 col-lg-3" key={data._id}>
              {" "}
              <Card sx={{ maxWidth: 345 }} className="mt-2">
                <WishListIcon
                  image={data.product_image}
                  productId={data._id}
                  productWishList={data?.wishlist?.wishlist}
                  routeList={routeList}
                  wishListData={wishListData}
                />
                <CardActionArea
                  onClick={() => {
                    navigate(`/product_details/${data._id}`);
                  }}
                >
                  {/* <CardMedia
                    sx={{ height: 140 }}
                    image={`${BASE_URL}categories/product_image/image/${data.product_image}`}
                    title="green iguana"
                  /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.name}
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={3}
                    >
                      {" "}
                      <Typography gutterBottom variant="h6" component="div">
                        Price: {data.price}
                      </Typography>
                      <Rating
                        name="simple-controlled"
                        value={data.rating_star}
                        // onChange={(event, newValue) => {
                        //   setValue(newValue);
                        // }}
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {`${data.description.substring(0, 150)}...`}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={3}
                  >
                    <AddCart productId={data._id} />
                    <Stack direction="row" justifyContent="end" spacing={3}>
                      <BuyCart product={data} />
                    </Stack>
                  </Stack>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
