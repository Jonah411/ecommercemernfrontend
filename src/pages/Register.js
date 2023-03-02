import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import AlertToast from "../components/common/AlertToast";
import { useAuthRegisterMutation } from "../feature/loginReducer/authSigin.ts";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [authRegister, { data, error, isSuccess, isError }] =
    useAuthRegisterMutation();
  const init = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm: "",
  };
  const [formValues, setFormValues] = useState(init);
  const [proImage, setProImage] = useState("");
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
            setProImage({ ...proImage, [name]: bannerImg });
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
  const handleClick = () => {
    setIsSubmit(true);
    setFormError(validation(formValues, proImage));
  };
  const validation = (value, image) => {
    const error = {};
    if (!value.first_name) {
      error.first_name = "First Name is Required";
    }
    if (!value.last_name) {
      error.last_name = "Last Name is Required";
    }
    if (!value.email) {
      error.email = "Email is Required";
    }
    if (!image.pro_image) {
      error.pro_image = "Profile Image is Required";
    }
    if (!value.password) {
      error.password = "Password is Required";
    }
    if (!value.confirm) {
      error.confirm = "confirm Password is Required";
    }
    return error;
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      console.log(proImage.pro_image[0]);
      var formData = new FormData();
      formData.append("json_data", JSON.stringify(formValues));
      formData.append("pro_image", proImage.pro_image[0]);

      authRegister(formData);
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
        navigate("/");
      }, 2001);
    }
    if (isError) {
      setIsSubmit(false);
      toast.error(`Error${data?.msg}`, {
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
  }, [isSuccess, isError, navigate]);
  return (
    <div>
      {" "}
      <Box display="flex" width={500} height={80}></Box>
      <Box
        display="flex"
        m="auto"
        alignItems="center"
        justifyContent="center"
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              variant="h6"
              noWrap
              component="div"
              justifyContent="center"
              sx={{ flexGrow: 1, mb: 1.5 }}
            >
              Register
            </Typography>
            <Box>
              <TextField
                fullWidth
                id="standard-basic"
                label="First Name"
                variant="standard"
                name="first_name"
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
                {formError.first_name}
              </Typography>
              <TextField
                fullWidth
                id="standard-basic"
                label="Last Name"
                variant="standard"
                name="last_name"
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
                {formError.last_name}
              </Typography>
              <TextField
                fullWidth
                id="standard-basic"
                label="Email"
                variant="standard"
                name="email"
                type="email"
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
                {formError.email}
              </Typography>
              <TextField
                fullWidth
                id="standard-basic"
                label="Profile Image"
                variant="standard"
                name="pro_image"
                type="file"
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
                {formError.pro_image}
              </Typography>
              <TextField
                fullWidth
                id="standard-basic"
                label="password"
                variant="standard"
                name="password"
                type="password"
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
                {formError.password}
              </Typography>
              <TextField
                fullWidth
                id="standard-basic"
                label="confirm Password"
                variant="standard"
                name="confirm"
                type="password"
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
                {formError.confirm}
              </Typography>
              <Button
                variant="contained"
                sx={{ flexGrow: 1, mb: 1.5 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick();
                }}
              >
                Register
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <AlertToast />
    </div>
  );
}

export default Register;
