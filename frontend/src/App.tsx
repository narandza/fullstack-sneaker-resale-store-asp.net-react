import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { ToastContainer } from "react-toastify";

// pages

import HomePage from "./pages/HomePage/HomePage";
import ShopPage from "./pages/ShopPage/ShopPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckOutPage from "./pages/CheckOutPage/CheckOutPage";
import ProductDetail from "./pages/ProductDetailPage/ProductDetailPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ContactPage from "./pages/ContactPage/ContactPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";

// admin pages

import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import CategoryController from "./pages/Admin/CategoryController/CategoryController";
import AddNewPage from "./pages/Admin/AddNewPage/AddNewPage";
import ShowItem from "./pages/Admin/ShowItem/ShowItem";
import EditItem from "./pages/Admin/EditItem/EditItem";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard/:category" element={<CategoryController />} />
          <Route path="/dashboard/:category/:id" element={<ShowItem />} />
          <Route path="/dashboard/:category/add-new" element={<AddNewPage />} />
          <Route path="/dashboard/:category/edit/:id" element={<EditItem />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}

export default App;
