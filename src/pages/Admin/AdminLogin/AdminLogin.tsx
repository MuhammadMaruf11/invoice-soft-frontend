import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateAPI } from '../../../helper/api';


type Props = {}

const AdminLogin = (props: Props) => {

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
            PrivateAPI.get(
                "/admin",
                {
                    headers
                }
            )
                .then(response => {
                    if (response.status === 200) {

                        setTimeout(() => {
                            navigate("/backend");
                        }, 1500);
                    } else {
                        // Sign-in failed

                        navigate('/admin/login')
                    }
                })
        } catch (error) {

            navigate('/admin/login')
        }
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/admin/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // console.log(response, 'respp');


            if (response.ok) {
                const res = await response.json();
                localStorage.setItem("token", res.data.access_token);
                toast.success("Successfully Login", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log('Sign-in successful');
                // You may handle the response here, e.g., store user data in state or local storage.
                setTimeout(() => {
                    navigate("/admin");
                }, 1500);
            } else {
                toast.error("Username or Password incorrect", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                // Sign-in failed
                console.error('Sign-in failed');
            }
        } catch (error) {
            toast.error("Username or Password incorrect", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.error('Error:', error);
        }
    };


    return (
        <div className='admin-login-area'>
            <ToastContainer />
            <div className='login-form-wrap'>
                <h2 className='text-center'>Login</h2>
                <form className='login-form' onSubmit={handleSignIn}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input
                            className='form-control'
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input
                            className='form-control'
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className='w-50 mx-auto d-block'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin