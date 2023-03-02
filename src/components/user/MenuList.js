import React, { useState, useEffect } from "react";
import {
  useDeleteMenuMutation,
  useGetRollsMenusQuery,
} from "../../feature/profileReducer/authProfile";
import { toast } from "react-toastify";
import AlertToast from "../common/AlertToast";

const MenuList = ({ value }) => {
  const { data: menuData } = useGetRollsMenusQuery(value?._id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const [deleteMenu, { data, error, isSuccess, isError }] =
    useDeleteMenuMutation();
  const [menu, setMenu] = useState(menuData?.data);
  useEffect(() => {
    setMenu(menuData?.data);
  }, [menuData]);
  const handleDelete = (id) => {
    let data = {
      menuId: id,
    };
    deleteMenu(data);
  };
  useEffect(() => {
    if (isSuccess) {
      if (data?.status === true) {
        toast.success(`${data?.message}`, {
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
      } else {
        toast.error(`${data?.message}`, {
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
  }, [isSuccess, data]);
  return (
    <div>
      {menu?.map((menu) => (
        <div className="d-flex justify-content-between m-2" key={menu._id}>
          <p>{menu.name}</p>
          <button
            className="btn btn-outline-danger"
            onClick={() => handleDelete(menu._id)}
          >
            Delete
          </button>
        </div>
      ))}
      <AlertToast />
    </div>
  );
};

export default MenuList;
