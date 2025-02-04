import { useState, useEffect } from "react";
import { Table, Container, Spinner, Alert, Button, Modal, Form } from "react-bootstrap";
import { AdminPrivateAPI, PrivateAPI } from "../../../helper/api";
import { apiList } from "../../../helper/apiList";

interface User {
    _id: string;
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    date: string;
}

const AllInvoices = () => {
    const [invoices, setInvoices] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"create" | "edit" | null>(null); // To track if creating or editing
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [formData, setFormData] = useState({ username: "", email: "", password: '' });


    const fetchInvoices = async () => {
        try {
            const response = await PrivateAPI.get(apiList.GET_INVOICE);
            console.log('object', response.data);
            setInvoices(response?.data);
        } catch (err) {
            setError("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);



    const handleDeleteInvoice = async (userId: string) => {
        try {
            AdminPrivateAPI.delete(`${apiList.DELETE_SINGLE_USER}/${userId}`)
            fetchInvoices();
        } catch (err) {
            setError("Failed to delete user.");
        }
    };

    const handleShowModal = (type: "create" | "edit", user: any = null) => {
        setModalType(type);
        if (type === "edit" && user) {
            setSelectedUser(user);
            setFormData({
                username: user.username,
                email: user.email,
                password: user.password,
            });
        } else {
            setFormData({ username: "", email: "", password: '' }); // Reset form for create
        }
        setShowModal(true);
    };

    return (
        <Container className="py-4">
            <h2 className="text-center mb-4">All Invoices</h2>

            {loading && <Spinner animation="border" role="status" className="d-block mx-auto" />}
            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && (
                <>

                    <Table striped bordered hover responsive>
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>No.</th>
                                <th>Customer Name</th>
                                <th>Customer Address</th>
                                <th>Customer Phone</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.length > 0 ? (
                                invoices.map((user, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.customerName}</td>
                                        <td>{user.customerAddress}</td>
                                        <td>{user.customerPhone}</td>
                                        <td>{user.date.slice(0, 10)}</td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                className="mr-2"
                                                onClick={() => handleShowModal("edit", user)}
                                            >
                                                Edit
                                            </Button>
                                            &nbsp;
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDeleteInvoice(user._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </>
            )}

            {/* Modal for Create/Edit User */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalType === "create" ? "Create User" : "Edit User"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="role"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AllInvoices;
