import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AlertToast from "../common/AlertToast";
import { useGetAllBannerQuery } from "../../feature/profileReducer/authProfile";
import { BASE_URL } from "../../constants/ConstaltsVariables";
import UpdateBanner from "./UpdateBanner";

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

const BrandBanner = () => {
  const { data: bannerData } = useGetAllBannerQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    if (bannerData) {
      setBanners(bannerData?.data);
    }
  }, [bannerData]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const columns = [
    {
      name: "Brand Name",
      selector: (row) => row.brand.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <UpdateBanner toggle={row?.status} banner_id={row?._id} />
      ),
      sortable: true,
      wrap: true,
    },
    {
      name: "Name ",
      selector: (row) => {
        return (
          <img
            src={`${BASE_URL}categories/brand_image/${row.name}`}
            width="100%"
          />
        );
      },
      sortable: true,
      wrap: true,
    },
  ];
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Banner List
      </Button>
      <Modal
        open={open}
        hideBackdrop
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DataTable
            className="data-table-store"
            title={<p>Brands List</p>}
            columns={columns}
            data={banners}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="300px"
            highlightOnHover
            subHeader
            subHeaderComponent={
              <TextField
                fullWidth
                id="standard-basic"
                label="Search Brands"
                variant="standard"
                name="search"
                type="text"
                sx={{ flexGrow: 1, mb: 1.5 }}
                style={{ height: "44px" }}
              />
            }
          />
          <Button variant="contained" onClick={handleClose} color="error">
            close
          </Button>
        </Box>
      </Modal>
      <AlertToast />
    </div>
  );
};

export default BrandBanner;
