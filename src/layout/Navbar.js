import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  useGetCategoriesQuery,
  useGetParentCategoriesQuery,
} from "../feature/profileReducer/authProfile";
import { categoriesCollect } from "../helper/Filter";
import { BASE_URL } from "../constants/ConstaltsVariables";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const {
    data: parentData,
    error,
    isLoading,
  } = useGetParentCategoriesQuery("data", {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const { data: categoriesData } = useGetCategoriesQuery("data", {
    refetchOnMountOrArgChange: true,
    skip: false,
  });
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);
  const [parentCategories, setParentCategories] = React.useState([]);
  React.useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData?.data);
    }
  }, [categoriesData]);
  React.useEffect(() => {
    if (parentData) {
      setParentCategories(parentData);
    }
  }, [parentData]);
  categoriesCollect(categories, parentCategories, categoriesData?.categories);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [open, setOpen] = React.useState(true);

  const handleClick = (id) => {
    categoriesData?.categories?.map((data, index) => {
      data.map((list) => {
        if (!list?.sub_categories) {
          if (list._id === id) {
            setOpen(!open);
          }
        }
      });
    });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            className="fw-bold"
          >
            Category List Items
          </ListSubheader>
        }
      >
        {categoriesData?.categories?.map((data, index) => {
          return data.map((list, index) => {
            if (list?.sub_categories) {
              return (
                <Collapse in={open} timeout="auto" unmountOnExit key={list._id}>
                  <List component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/category/${list._id}`);
                      }}
                    >
                      <ListItemIcon>
                        <img
                          src={`${BASE_URL}categories/categories_image/${list?.categorie_image}`}
                          className="img-thumbnail"
                          width={40}
                        />{" "}
                      </ListItemIcon>
                      <ListItemText primary={`${list.name}`} />
                    </ListItemButton>
                  </List>
                </Collapse>
              );
            } else {
              return (
                <ListItemButton
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(list._id);
                  }}
                  key={list._id}
                >
                  <ListItemIcon>
                    <img
                      src={`${BASE_URL}categories/categories_image/${list?.categorie_image}`}
                      className="img-thumbnail"
                      width={40}
                    />{" "}
                  </ListItemIcon>
                  <ListItemText primary={`${list.name}`} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              );
            }
          });
        })}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer("left", true)} variant="contained">
          <MenuIcon />
        </Button>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
