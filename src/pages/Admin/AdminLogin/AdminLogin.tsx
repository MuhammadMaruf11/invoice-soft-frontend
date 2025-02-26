/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
// react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminAPI } from '../../../helper/api';
import { apiList } from '../../../helper/apiList';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';


const AdminLogin = () => {

    const [formData, setFormData] = useState({
        adminname: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await AdminAPI.post(apiList.ADMIN_LOGIN, formData)
            const data = response?.data;
            localStorage.setItem('adminToken', data?.token)
            toast.success("Successfully register", {
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
                window.open('/admin', '_self')
            }, 1500);
        } catch (error: any) {
            toast.error(error.response.data.message || "Incorrect Credential!", {
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
        <section className='admin-login-area'>
            <Container className=" d-flex justify-content-center align-items-center min-vh-100">
                <ToastContainer />
                <Row className="w-100">
                    <Col xs={12} md={6} lg={4} className="mx-auto">
                        <div className="login-form-wrap p-4 shadow rounded bg-white">
                            <h2 className="text-center mb-4">Login</h2>
                            <Form onSubmit={handleSignIn} className="login-form">
                                <Form.Group className="mb-3" controlId="adminname">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="adminname"
                                        value={formData.adminname}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" className="w-100" variant="primary">
                                    Login
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AdminLogin