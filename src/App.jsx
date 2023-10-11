import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from './pages/home/Home';
import Order from './pages/order/Order'
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import AllProduct from './pages/allproducts/AllProduct';

const App = () => {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/allproducts" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/addproduct" element={
            <ProtectedAdminRoute>
              <AddProduct />
            </ProtectedAdminRoute>
          } />
          <Route path="/updateproduct" element={
            <ProtectedAdminRoute>
              <UpdateProduct />
            </ProtectedAdminRoute>
          } />

          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  )
}

export default App

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  if (user) {
    return children;
  } else {
    return <Navigate to={'/login'} />
  }
}

export const ProtectedAdminRoute = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'))

  // console.log('admin ', admin.user.email)
  // console.log('children',children)

  if (admin.user.email === 'divesh1515@gmail.com') {
    return children;
  }
  else {
    return <Navigate to={'/login'} />
  }
}