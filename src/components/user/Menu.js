import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  useAddMenuMutation,
  useGetAllRollsQuery,
} from "../../feature/profileReducer/authProfile";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Form from "react-bootstrap/Form";
import MenuList from "./MenuList";
import { toast } from "react-toastify";
import AlertToast from "../common/AlertToast";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Menu = () => {
  const [show, setShow] = useState(false);
  const [addMenu, { data, error, isSuccess, isError }] = useAddMenuMutation();
  const { data: rollsData } = useGetAllRollsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rolls, setRolls] = useState(rollsData?.data);
  useEffect(() => {
    setRolls(rollsData?.data);
  }, [rollsData]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const init = {
    roll: "",
    menu_name: "",
  };
  const [menuDetails, setMenuDetails] = useState(init);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formError, setFormError] = useState({});
  const menuCreate = (e) => {
    const { name, value } = e.target;
    setMenuDetails({ ...menuDetails, [name]: value });
  };
  const menuSave = () => {
    setIsSubmit(true);
    setFormError(validation(menuDetails));
  };
  const validation = (value) => {
    const error = {};
    if (!value.roll) {
      error.roll = "Select roll name is required!";
    }
    if (!value.menu_name) {
      error.menu_name = "Menu name is required!";
    }
    return error;
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      addMenu(menuDetails);
    }
  }, [formError, isSubmit]);
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
      <button className="btn btn-secondary" onClick={handleShow}>
        Show Menu
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>Menus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box sx={{ width: "100%" }}>
            <div className="d-flex justify-content-between">
              <Form.Select
                aria-label="Default select example"
                name="roll"
                onChange={menuCreate}
              >
                <option>Open this select rolls</option>
                {rolls?.map((roll) => (
                  <option value={roll?._id}>{roll.name}</option>
                ))}
              </Form.Select>
              <input
                className="form-control"
                type="text"
                placeholder="Enter menu name"
                name="menu_name"
                onChange={menuCreate}
              />
              <button className="btn btn-primary" onClick={() => menuSave()}>
                Add Menu
              </button>
            </div>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {rolls?.map((roll, index) => (
                  <Tab label={roll.name} {...a11yProps(index)} />
                ))}
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <MenuList value={rolls && rolls[value]} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <MenuList value={rolls && rolls[value]} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <MenuList value={rolls && rolls[value]} />
            </TabPanel>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <AlertToast />
    </div>
  );
};

export default Menu;
