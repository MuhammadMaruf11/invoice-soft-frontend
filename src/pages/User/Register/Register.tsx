import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
// react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PublicAPI } from "../../../helper/api";
import Layout from "../../../components/Layout/Layout";



const Register: React.FC = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const headers = new Headers();

  // Use a ternary operator to set the 'Authorization' header if 'token' is defined
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  useEffect(() => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      PublicAPI.get(
        "/user",
        {
          headers
        }
      )
        .then(response => {
          if (response.status === 200) {
            navigate('/user')
          } else {
            // Sign-in failed
            navigate('/user/register')
          }
        })
    } catch (error) {
      navigate('/user/login')
    }
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    gender: "male", // Set a default value
    userType: "client", // Set a default value
    address: "",
    email: "",
    birthDate: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    await PublicAPI.post('/user/local/signup', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      // localStorage.setItem("token", res.data.data.access_token);

      toast.success("Register Successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/user/otp");
      }, 1500);
    }).catch((error) => {
      toast.error("Register failed!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    })
  };

  return (
    <Layout>
      <ToastContainer />
      <div className='register-area'>
        <div className='register-form-wrap'>
          <h2 className='text-center'>Register</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">Username</label>
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                className="form-control"
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender">Gender</label>
              <select
                className="form-select"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="userType">User Type</label>
              <select
                className="form-select"
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="client">Client</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="birthDate">Birthdate</label>
              <input
                className="form-control"
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                max={today}
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
            <button type="submit" className='w-50 mx-auto d-block'>Register</button>
          </form>
          <div className="text-center mt-4">
            Already Have account? <Link className='' to='/user/login'>Login here</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;