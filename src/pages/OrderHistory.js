import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PendingOrder from "../components/order/PendingOrder";
import ShiffedOrder from "../components/order/ShiffedOrder";
import DeliveredOrder from "../components/order/DeliveredOrder";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`order-tabpanel-${index}`}
      aria-labelledby={`order-tab-${index}`}
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
    id: `order-tab-${index}`,
    "aria-controls": `order-tabpanel-${index}`,
  };
}

const OrderHistory = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="Order History">
          <Tab label="Pending" {...a11yProps(0)} />
          <Tab label="Shipped" {...a11yProps(1)} />
          <Tab label="Delivered" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PendingOrder />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShiffedOrder />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DeliveredOrder />
      </TabPanel>
    </Box>
  );
};

export default OrderHistory;
