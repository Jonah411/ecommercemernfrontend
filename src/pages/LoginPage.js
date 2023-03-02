import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAddloginMutation } from "../feature/loginReducer/authLogin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AlertToast from "../components/common/AlertToast";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { authloginDetails } from "../feature/loginReducer/loginReducer";

const LoginPage = () => {
  const [addlogin, { data, error, isSuccess, isError }] = useAddloginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initState = {
    email: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(initState);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleClick = () => {
    setIsSubmit(true);
    setFormError(validation(formValue));
  };
  const validation = (value) => {
    const error = {};
    if (!value.email) {
      error.email = "Email field is Mandory";
    }
    if (!value.password) {
      error.password = "Email field is Mandory";
    }
    return error;
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      addlogin(formValue);
    }
  }, [formError]);
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Logging Successfully`, {
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
        var decoded = jwt_decode(data.accessToken);
        let payload = {
          token: data.accessToken,
          userName: decoded,
        };
        dispatch(authloginDetails(payload));
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
      <Box display="flex" width={500} height={120}>
        <Box m="auto"></Box>
      </Box>
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
              Login
            </Typography>
            <Box>
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
              <Button
                variant="contained"
                sx={{ flexGrow: 1, mb: 1.5 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick();
                }}
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <AlertToast />
    </div>
  );
};

export default LoginPage;
