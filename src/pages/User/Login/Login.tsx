import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
// react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PublicAPI } from "../../../helper/api";
import Layout from "../../../components/Layout/Layout";



const Login: React.FC = () => {
  const navigate = useNavigate();



  // Use a ternary operator to set the 'Authorization' header if 'token' is defined


  // useEffect(() => {
  //   try {

  //     PublicAPI.get("/user")
  //       .then(response => {
  //         if (response.status === 200) {
  //           setTimeout(() => {
  //             navigate('/user')
  //           }, 1500);
  //         } else {
  //           // Sign-in failed
  //           navigate('/user/login')
  //         }
  //       })
  //   } catch (error) {
  //     navigate('/user/login')
  //   }
  // }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    try {
      const response = await PublicAPI.post("/api/auth/login", formData)
      const data = response.data;
      console.log('data', data);
      localStorage.setItem("userToken", data.token);

      toast.success("Sign-in Successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setFormData({
        username: "",
        password: "",
      })
      setTimeout(() => {
        window.open("/user", '_self');
      }, 1000);
    } catch (error) {
      //  console.error('error: ', error.message);
      toast.error("Sign-in failed!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    // You may handle the response here, e.g., store user data in state or local storage.

  };

  return (
    <Layout>
      <ToastContainer />
      <div className="login-area">
        <div className="login-form-wrap">
          <h2 className="text-center">Login</h2>
          <form className="login-form" onSubmit={handleSignIn}>
            <div className="mb-3">
              <label htmlFor="username">User Name</label>
              <input
                className="form-control"
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="w-100 mx-auto d-block">
              Login
            </button>
          </form>
          <div className="d-flex justify-content-between mt-4 column-gap-2">
            <Link className="btn btn-warning w-50" to="/user/forgot-password">
              Forgot Password
            </Link>
            <Link className="btn btn-info w-50" to="/user/register">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
