import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";
import { useAddAddressMutation } from "../../feature/profileReducer/authProfile";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AlertToast from "../common/AlertToast";

const CreateAddress = () => {
  const user = useSelector(getLoginDetails);
  const navigate = useNavigate();
  const [addAddress, { data, error, isSuccess, isError }] =
    useAddAddressMutation();
  const init = {
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  };
  const [address, setAddress] = useState(init);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formError, setFormError] = useState({});
  const hamdleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };
  const handleAddress = () => {
    setIsSubmit(true);
    setFormError(validation(address));
  };
  const validation = (value) => {
    const error = {};
    if (!value.name) {
      error.name = "Name is required!";
    }
    if (!value.street) {
      error.street = "Street is required!";
    }
    if (!value.city) {
      error.city = "City is required!";
    }
    if (!value.state) {
      error.state = "State is required!";
    }
    if (!value.zip) {
      error.zip = "zip is required!";
    }
    if (!value.country) {
      error.country = "Country is required!";
    }
    return error;
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      let addressData = {
        id: user?.id,
        address: [address],
      };
      console.log(addressData);
      addAddress(addressData);
    }
  }, [formError, isSubmit]);
  useEffect(() => {
    if (isSuccess) {
      toast.success(`Address add Successfully`, {
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
        navigate("/profile/address");
      }, 2001);
    }
    if (isError) {
      setIsSubmit(false);
      toast.error(`Address add Failed`, {
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
    <div className="d-flex justify-content-center align-item-center">
      <div className="card p-2">
        <div className="container">
          <form>
            <div className="mb-3">
              <p className="m-0">Name</p>
              <input
                className="form-control"
                name="name"
                onChange={hamdleChange}
              />
              <p className="text-danger m-0">{formError.name}</p>
            </div>
            <div className="mb-3">
              <p className="m-0">Street</p>
              <input
                className="form-control"
                name="street"
                onChange={hamdleChange}
              />
              <p className="text-danger m-0">{formError.street}</p>
            </div>
            <div className="mb-3">
              <p className="m-0">City</p>
              <input
                className="form-control"
                name="city"
                onChange={hamdleChange}
              />
              <p className="text-danger m-0">{formError.city}</p>
            </div>
            <div className="mb-3">
              <p className="m-0">State</p>
              <input
                className="form-control"
                name="state"
                onChange={hamdleChange}
              />
              <p className="text-danger m-0">{formError.state}</p>
            </div>
            <div className="mb-3">
              <p className="m-0">zip</p>
              <input
                className="form-control"
                type="number"
                name="zip"
                onChange={hamdleChange}
              />
              <p className="text-danger m-0">{formError.zip}</p>
            </div>
            <div className="mb-3">
              <p className="m-0">Country</p>
              <input
                className="form-control"
                name="country"
                onChange={hamdleChange}
              />
              <p className="text-danger m-0">{formError.country}</p>
            </div>
            <div className="mb-3">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddress();
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <AlertToast />
    </div>
  );
};

export default CreateAddress;
