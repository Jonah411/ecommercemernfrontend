import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { toast } from "react-toastify";
import AlertToast from "../common/AlertToast";
import {
  useGetAllBrandsQuery,
  useGetCategoriesQuery,
} from "../../feature/profileReducer/authProfile";
import { useAddproductMutation } from "../../feature/loginReducer/authSigin.ts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddProduct = () => {
  const [addproduct, { data, error, isSuccess, isError }] =
    useAddproductMutation();
  const { data: parentData } = useGetCategoriesQuery("data", {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const { data: brandData } = useGetAllBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    if (brandData) {
      setBrands(brandData?.data);
    }
  }, [brandData]);
  useEffect(() => {
    if (parentData) {
      setParentCategories(parentData?.data);
    }
  }, [parentData]);
  const [parentCategories, setParentCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const init = {
    name: "",
    description: "",
    price: "",
    rating_star: "",
    categories: "",
    brand: "",
  };
  const [formValues, setFormValues] = useState(init);
  const [productImage, setProductImage] = useState();
  const [productGallery, setProductGallery] = useState();
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file" && name === "product_image") {
      if (e.target.files) {
        let bannerImg = [];
        for (let i = 0; i < e.target.files.length; i++) {
          if (e.target.files[i].size <= 2000000) {
            bannerImg.push(e.target.files[i]);
            setProductImage({ ...productImage, [name]: bannerImg });
          } else {
            toast.error("Image size Big", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      }
    } else if (e.target.type === "file" && name === "product_gallery") {
      if (e.target.files) {
        let bannerImg = [];
        for (let i = 0; i < e.target.files.length; i++) {
          if (e.target.files[i].size <= 2000000) {
            bannerImg.push(e.target.files[i]);
            setProductGallery({ ...productGallery, [name]: bannerImg });
          } else {
            toast.error("Image size Big", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      }
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSave = () => {
    setIsSubmit(true);
    setFormError(validation(formValues));
    //handleClose();
  };
  const validation = (value) => {
    const error = {};
    if (!value.name) {
      error.name = "Name Field is Required";
    }
    if (!value.description) {
      error.description = "Description Field is Required";
    }
    return error;
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      var formData = new FormData();
      formData.append("json_data", JSON.stringify(formValues));
      formData.append("product_image", productImage?.product_image[0]);
      if (productGallery?.product_gallery) {
        Array.from(productGallery?.product_gallery).forEach((item) => {
          formData.append("product_gallery", item);
        });
      }

      addproduct(formData);
    }
  }, [formError]);
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        handleClose();
      }, 2001);
    }
    if (isError) {
      toast.error(error?.data?.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isSuccess, isError]);
  const listCategories = [];
  parentCategories.map((data) => {
    if (data.sub_categories) {
      listCategories.push(data);
    }
  });
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add
      </Button>
      <Modal
        open={open}
        hideBackdrop
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Products
          </Typography>
          <Box>
            <TextField
              fullWidth
              id="standard-basic"
              label="Product Name"
              variant="standard"
              name="name"
              type="text"
              sx={{ flexGrow: 1, mb: 1.5 }}
              onChange={handleChange}
            />
            <Typography
              variant="p"
              noWrap
              component="div"
              justifyContent="center"
              sx={{ flexGrow: 1, mb: 1.5 }}
            >
              {formError.name}
            </Typography>
            <TextField
              fullWidth
              id="standard-basic"
              label="Description"
              variant="standard"
              name="description"
              multiline
              rows={4}
              sx={{ flexGrow: 1, mb: 1.5 }}
              onChange={handleChange}
            />
            <Typography
              variant="p"
              noWrap
              component="div"
              justifyContent="center"
              sx={{ flexGrow: 1, mb: 1.5 }}
            >
              {formError.description}
            </Typography>
            <TextField
              fullWidth
              id="standard-basic"
              label="Image"
              variant="standard"
              name="product_image"
              type="file"
              sx={{ flexGrow: 1, mb: 1.5 }}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              id="standard-basic"
              label="Image"
              variant="standard"
              name="product_gallery"
              type="file"
              inputProps={{
                multiple: true,
              }}
              sx={{ flexGrow: 1, mb: 1.5 }}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              id="standard-basic"
              label="Price"
              variant="standard"
              name="price"
              type="number"
              sx={{ flexGrow: 1, mb: 1.5 }}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              id="standard-basic"
              label="Rating"
              variant="standard"
              name="rating_star"
              type="number"
              sx={{ flexGrow: 1, mb: 1.5 }}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Categories"
                variant="standard"
                name="categories"
                onChange={handleChange}
                defaultValue={formValues?.categories}
              >
                <MenuItem value={1}>Parent</MenuItem>
                {listCategories?.map((data) => {
                  return (
                    <MenuItem value={data._id} key={data._id}>
                      {data.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Brand"
                variant="standard"
                name="brand"
                onChange={handleChange}
                defaultValue={formValues?.brand}
              >
                {brands?.map((data) => {
                  return (
                    <MenuItem value={data._id} key={data._id}>
                      {data.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          <Stack
            spacing={2}
            direction="row"
            mt={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" onClick={handleClose} color="error">
              close
            </Button>
          </Stack>
        </Box>
      </Modal>
      <AlertToast />
    </div>
  );
};

export default AddProduct;
