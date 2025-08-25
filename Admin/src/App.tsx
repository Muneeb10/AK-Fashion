import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import ForgetPassword from "./pages/AuthPages/ForgetPassword.tsx";
import ResetPassword from "./pages/AuthPages/ResetPassword.tsx";
import NotFound from "./pages/OtherPage/NotFound";




import Products from "./pages/Products.tsx";
import Orders from "./pages/Orders.tsx";
import Customers from "./pages/Customers.tsx";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
// import Home from "./pages/Dashboard/Home";
import AddProduct from "./pages/AddProduct.tsx"
import Categories from "./pages/Categories.tsx"
import Invoice from "./pages/Invoice.tsx"
import CustomersForm from "./pages/CustomersForm.tsx"
import UpdateProduct from "./pages/UpdateProduct.tsx"

import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route
  element={
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  }
>
  <Route index path="/" element={<Products />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/customers" element={<Customers />} />
  <Route path="/customers/form/:id" element={<CustomersForm />} />
  <Route path="/api/categories" element={<Categories />} />
  <Route path="/orders/invoice/:id" element={<Invoice />} />
  {/* <Route path="/products" element={<Products />} /> */}
  <Route path="/products/addproducts" element={<AddProduct />} />
  <Route path="/products/updateproducts/:id" element={<UpdateProduct />} />
  <Route path="/products/form/:id" element={<AddProduct />} />
</Route>


          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/forget-password" element={<ForgetPassword />} /> 
          <Route path="/Reset-password/:id" element={<ResetPassword />} /> 
          <Route path="/reset-password/:token" element={<ResetPassword />} />

           

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
