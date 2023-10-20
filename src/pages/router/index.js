import { Route, Routes } from "react-router-dom";

import Home from "../Home";
import Layout from "../../layout/Layout";
import AuthLayout from "../../layout/AuthLayout";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import ForgotPassword from "../Auth/Forgot/ForgotPassword";


const index = () => {
  return (
      <Routes>
        <Route element={<Layout />}>
          <Route exact path="/" element={<Home />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
  );
};

export default index;
