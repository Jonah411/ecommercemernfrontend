import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useGetMenusQuery } from "../../feature/profileReducer/authProfile";
import { useSelector } from "react-redux";
import { getLoginDetails } from "../../feature/loginReducer/loginReducer";

const ShowMenu = ({ menuList }) => {
  const [show, setShow] = useState(false);
  const user = useSelector(getLoginDetails);
  const { data, error, isLoading } = useGetMenusQuery(menuList?._id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [menu, setMenu] = useState(menuList);
  useEffect(() => {
    setMenu(menuList);
  }, [menuList]);
  return (
    <div>
      <button className="btn btn-secondary" onClick={handleShow}>
        Show Menu
      </button>
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {/* {data?.msg.map((menu) => (
            <div className="d-flex justify-content-between m-2" key={menu._id}>
              <p>{menu.name}</p>
              <button className="btn btn-outline-primary">Update</button>
              <button className="btn btn-outline-danger">Delete</button>
            </div>
          ))} */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowMenu;
