import { useState, useEffect } from "react";
import { Table, Container, Spinner, Alert, Button, Modal, Form } from "react-bootstrap";
import { AdminPrivateAPI } from "../../../helper/api";
import { apiList } from "../../../helper/apiList";

interface User {
    _id: string;
    username: string;
    email: string;
    // Add other fields as required
}

const AllUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"create" | "edit" | null>(null); // To track if creating or editing
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [formData, setFormData] = useState({ username: "", email: "", password: '' });


    const fetchUsers = async () => {
        try {
            const response = await AdminPrivateAPI.get(apiList.ALL_USERS);
            console.log('object', response);
            setUsers(response?.data?.users);
        } catch (err) {
            setError("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateEditUser = async () => {
        try {
            if (modalType === "create") {
                const response = await AdminPrivateAPI.post(apiList.CREATE_USER, formData)
                setUsers([...users, response.data.user]); // Add new user to the list
            } else if (modalType === "edit" && selectedUser) {
                const response = await AdminPrivateAPI.patch(`${apiList.UPDATE_USER}/${selectedUser._id}`, formData)
                setUsers(users.map(user => user._id === selectedUser._id ? response.data.user : user));
            }
            setShowModal(false);
            setFormData({ username: "", email: "", password: '' }); // Clear form
        } catch (err) {
            setError("Failed to save user.");
        }
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            AdminPrivateAPI.delete(`${apiList.DELETE_SINGLE_USER}/${userId}`)
            fetchUsers();
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
            <h2 className="text-center mb-4">All Users</h2>

            {loading && <Spinner animation="border" role="status" className="d-block mx-auto" />}
            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && (
                <>
                    <Button
                        variant="primary"
                        className="mb-3"
                        onClick={() => handleShowModal("create")}
                    >
                        Create User
                    </Button>

                    <Table striped bordered hover responsive>
                        <thead className="bg-primary text-white">
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
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
                                                onClick={() => handleDeleteUser(user._id)}
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
                    <Button variant="primary" onClick={handleCreateEditUser}>
                        {modalType === "create" ? "Create" : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AllUsers;
