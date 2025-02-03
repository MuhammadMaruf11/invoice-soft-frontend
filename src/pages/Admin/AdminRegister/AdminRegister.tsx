import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// react toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminAPI } from '../../../helper/api';
import { apiList } from '../../../helper/apiList';
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const AdminRegister = () => {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        adminname: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await AdminAPI.post(apiList.ADMIN_REGISTER, formData)

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
                navigate("/admin/login");
            }, 1500);
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
        <section className="admin-login-area">
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <ToastContainer />
                <Row className="w-100">
                    <Col xs={12} md={6} lg={4} className="mx-auto">
                        <div className="login-form-wrap p-4 shadow rounded bg-white">
                            <h2 className="text-center mb-4">Register</h2>
                            <Form onSubmit={handleRegister}>
                                <Form.Group className="mb-3" controlId="adminname">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="adminname"
                                        value={formData.adminname}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid name.
                                    </Form.Control.Feedback>
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
                                    <Form.Control.Feedback type="invalid">
                                        Password is required.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit" className="w-100" variant="primary">
                                    Register
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AdminRegister