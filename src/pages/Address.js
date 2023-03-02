import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {
  useGetAddressQuery,
  useUpdateAddressMutation,
} from "../feature/profileReducer/authProfile";
import { getLoginDetails } from "../feature/loginReducer/loginReducer";
import { toast } from "react-toastify";
import AddAddress from "../components/address/AddAddress";
import AlertToast from "../components/common/AlertToast";

const Address = () => {
  const user = useSelector(getLoginDetails);
  const navigate = useNavigate();
  const [updateAddress, { data, error, isSuccess, isError }] =
    useUpdateAddressMutation();
  const { data: addressData } = useGetAddressQuery(user?.id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [address, setAddress] = useState(addressData?.data?.address);
  useEffect(() => {
    setAddress(addressData?.data?.address);
  }, [addressData]);
  const handleChange = (data) => {
    let listData = {
      id: user.id,
      address: data._id,
    };
    updateAddress(listData);
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,

      sortable: true,
      wrap: true,
    },
    {
      name: "Street",
      selector: (row) => row.street,

      sortable: true,
      wrap: true,
    },
    {
      name: "City",
      selector: (row) => row.city,

      sortable: true,
      wrap: true,
    },
    {
      name: "State",
      selector: (row) => row.state,

      sortable: true,
      wrap: true,
    },
    {
      name: "ZIP",
      selector: (row) => row.zip,
      sortable: true,
      wrap: true,
    },
    {
      name: "Country",
      selector: (row) => row.country,
      sortable: true,
      wrap: true,
    },
    {
      name: "Main Address",
      selector: (row) => (
        <input
          type="radio"
          name="mainaddress"
          value={row.mainaddress}
          checked={row.mainaddress === 1}
          onClick={() => handleChange(row)}
        />
      ),
      sortable: true,
      wrap: true,
    },
  ];
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
        window.location.reload();
      }, 100);
    }
    if (isError) {
      toast.error(`Update add Failed`, {
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
      <DataTable
        className="data-table-store"
        title={<p>Address List</p>}
        columns={columns}
        data={address}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        subHeader
        subHeaderComponent={
          <TextField
            fullWidth
            id="standard-basic"
            label="Search Address"
            variant="standard"
            name="search"
            type="text"
            sx={{ flexGrow: 1, mb: 1.5 }}
            style={{ height: "44px" }}
          />
        }
        actions={
          <Stack spacing={2} direction="row">
            <AddAddress />
            {/* <BrandBanner /> */}
          </Stack>
        }
      />
      <AlertToast />
    </div>
  );
};

export default Address;
