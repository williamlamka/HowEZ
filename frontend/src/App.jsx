import Home from "./pages/Home";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleProduct from "./pages/SingleProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShoppingCart from "./pages/ShoppingCart";
import Product from "./pages/Product";
import Feature from "./pages/Feature";
import About from "./pages/About";
import Order from "./pages/Order";
import Navbar from "./component/Navbar";
import LoginedNavber from "./component/LoginedNavber"
import Profile from "./pages/Profile";
import { LoginContext } from "./context/LoginConext";
import Axios from "axios";

export default function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3005/api/auth/verifyLogin", { withCredentials: true })
      .then(res => {
        if (res.data.auth) {
          setLoginStatus(true);
          setUserId(res.data.id);
          setUserName(res.data.name);
        } else {
          setLoginStatus(false);
        }
      })
  }, [loginStatus, userId, userName]);

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ userId, setUserId, userName, setUserName, loginStatus, setLoginStatus }} >
        {loginStatus ? (<LoginedNavber />) : (<Navbar />)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/profile" element={loginStatus?(<Profile />):(<div />)} />
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter >
  );
}

