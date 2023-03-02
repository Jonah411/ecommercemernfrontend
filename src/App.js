import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "./layout/Footer";
import MainHeader from "./layout/MainHeader";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/profile/Profile";
import Brand from "./pages/Brand";
import Categories from "./pages/Categories";
import Product from "./pages/Product";
import OrderHistory from "./pages/OrderHistory";
import WishList from "./pages/WishList";
import Payment from "./pages/Payment";
import ListProduct from "./pages/ListProduct";
import ProductDetail from "./components/products/ProductDetail";
import ListBrand from "./components/brand/ListBrand";
import SearchProducts from "./pages/SearchProducts";
import ListCart from "./pages/ListCart";
import Checkout from "./pages/Checkout";

const App = () => {
  return (
    <Router>
      <MainHeader />

      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#cfe8fc" }}>
          {/* <Box sx={{ bgcolor: "#fff", height: "20vh" }}>
            <Navbar />
          </Box> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search_products" element={<SearchProducts />} />
            <Route path="/category/:name" element={<ListProduct />} />
            <Route path="/brand/:name" element={<ListBrand />} />
            <Route path="/product_details/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<ListCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile/*" element={<Profile />}>
              <Route path="brand" element={<Brand />} />
              <Route path="categories" element={<Categories />} />
              <Route path="product" element={<Product />} />
              <Route path="order_history" element={<OrderHistory />} />
              <Route path="wish_list" element={<WishList />} />
              <Route path="payment" element={<Payment />} />
            </Route>
          </Routes>
        </Box>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
