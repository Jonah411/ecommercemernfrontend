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
import { useAddCategoriesMutation } from "../../feature/loginReducer/authSigin.ts";
import { useGetParentCategoriesQuery } from "../../feature/profileReducer/authProfile";

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

const AddCategories = () => {
  const [addCategories, { data, error, isSuccess, isError }] =
    useAddCategoriesMutation();
  const { data: parentData } = useGetParentCategoriesQuery("data", {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const init = {
    carectories_name: "",
    carectories_des: "",
    carectories_parent: "",
  };
  const [formValues, setFormValues] = useState(init);
  const [cateImg, setCatImg] = useState();
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") {
      if (e.target.files) {
        let bannerImg = [];
        for (let i = 0; i < e.target.files.length; i++) {
          if (e.target.files[i].size <= 2000000) {
            bannerImg.push(e.target.files[i]);
            setCatImg({ ...cateImg, [name]: bannerImg });
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
    if (!value.carectories_name) {
      error.carectories_name = "Name Field is Required";
    }
    if (!value.carectories_des) {
      error.carectories_des = "Description Field is Required";
    }
    return error;
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      var formData = new FormData();
      formData.append("json_data", JSON.stringify(formValues));
      formData.append("cate_image", cateImg.carectories_image[0]);
      addCategories(formData);
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
            Add Categories
          </Typography>
          <Box>
            <TextField
              fullWidth
              id="standard-basic"
              label="Categorie Name"
              variant="standard"
              name="carectories_name"
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
              {formError.carectories_name}
            </Typography>
            <TextField
              fullWidth
              id="standard-basic"
              label="Description"
              variant="standard"
              name="carectories_des"
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
              {formError.carectories_des}
            </Typography>
            <TextField
              fullWidth
              id="standard-basic"
              label="Image"
              variant="standard"
              name="carectories_image"
              type="file"
              sx={{ flexGrow: 1, mb: 1.5 }}
              onChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Parent</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Parent"
                variant="standard"
                name="carectories_parent"
                onChange={handleChange}
              >
                <MenuItem value={1}>Parent</MenuItem>
                {parentData?.map((data) => {
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

export default AddCategories;
