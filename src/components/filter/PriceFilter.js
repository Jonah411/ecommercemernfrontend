import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import {
  getSearchProductDetails,
  hideProductDetails,
  priceProductDetails,
} from "../../feature/loginReducer/loginReducer";
import { useNavigate } from "react-router-dom";

const PriceFilter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { data: productData } = useGetAllProductsQuery(undefined, {
  //   refetchOnMountOrArgChange: true,
  //   skip: false,
  // });
  const productData = useSelector(getSearchProductDetails);
  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    if (productData) {
      setProductsList(productData);
    }
  }, [productData]);
  const [priceRange, setPriceRange] = useState([10, 100]);
  const [productList, setProductList] = useState([]);
  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  function valuetext(value) {
    return `${value}`;
  }
  useEffect(() => {
    if (priceRange) {
      const filteredProducts = productsList.filter((product) => {
        return product.price >= priceRange[0] && product.price <= priceRange[1];
      });
      setProductList(filteredProducts);
      dispatch(priceProductDetails(filteredProducts));
      navigate("/search_products");
    }
  }, [priceRange]);
  return (
    <div>
      <Card>
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            variant="h3"
            gutterBottom
          >
            Price Filter
          </Typography>
          <div className="container">
            <Slider
              min={10}
              max={100}
              step={10}
              marks
              value={priceRange}
              onChange={handlePriceRangeChange}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
            />
          </div>
        </CardContent>
        <CardActions disableSpacing>
          {Object.keys(productList).length != 0 && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                setProductList([]);
                dispatch(hideProductDetails());
              }}
            >
              Hide Products
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default PriceFilter;
