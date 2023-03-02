import React, { useEffect, useState } from "react";
import { useUpdateBannerMutation } from "../../feature/profileReducer/authProfile";
import SwitchPage from "../common/SwitchPage";
import { toast } from "react-toastify";
import AlertToast from "../common/AlertToast";

const UpdateBanner = ({ toggle, banner_id }) => {
  const init = {
    banner_status: toggle && toggle,
  };
  const [updateBanner, { data: updateData, error, isSuccess, isError }] =
    useUpdateBannerMutation();
  const [status, setStatus] = useState(init);
  const handleChange = (e) => {
    const { name, value } = e.target;
    let patch = {
      id: banner_id,
      data: { status: value },
    };
    updateBanner(patch);
    setStatus({ ...status, [name]: value });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(updateData?.msg, {
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
      <SwitchPage
        viewstatus={status?.banner_status}
        handleChange={handleChange}
        title="banner_status"
      />
      <AlertToast />
    </div>
  );
};

export default UpdateBanner;
