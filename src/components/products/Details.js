import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Rating } from "@mui/material";
import Stack from "@mui/material/Stack";
import AddCart from "../common/AddCart";
import BuyCart from "../common/BuyCart";

const Details = ({ details }) => {
  const [productDetails, setProductDetails] = useState();
  useEffect(() => {
    setProductDetails(details);
  }, [details]);
  return (
    <div className="image-app p-2">
      <Card>
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            variant="h5"
            color="text.secondary"
            gutterBottom
          >
            {productDetails?.name}
          </Typography>
          <Typography variant="h5" component="div"></Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            {" "}
            <Typography gutterBottom variant="h5" component="div">
              Price: {productDetails?.price}
            </Typography>
            <Rating
              name="simple-controlled"
              value={productDetails?.rating_star}
              // onChange={(event, newValue) => {
              //   setValue(newValue);
              // }}
            />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {`${productDetails?.description}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <AddCart productId={productDetails?._id} />
            </Grid>
            <Grid item>
              <BuyCart product={productDetails} />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

export default Details;
