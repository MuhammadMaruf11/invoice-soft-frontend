import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// react toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NavbarProps {
    onToggleSidebar: () => void;
}

const AppNavbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
    const navigate = useNavigate();

    // Logout component or function
    const handleLogOut = () => {
        try {
            // Clear token from client-side storage
            window.localStorage.removeItem("token");
            toast.success("Logout Successfully", {
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
            }, 1000);
        } catch (error) {
            toast.error("Logout failed!", {
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
    };


    return (
        <Navbar bg="dark" variant="dark" expand="lg">

            <div className="logo-wrap">
                <Link to="/admin">
                    {/* <img src={Logo} alt="logo" /> */}
                    <span>Remover AI</span>
                </Link>
            </div>

            <Button variant="outline-light" onClick={onToggleSidebar}>
                <i className="far fa-bars"></i>
            </Button>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#profile">Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <div className="text-end">
                <button className='btn btn-danger' onClick={handleLogOut}>Log out</button>
                <Link className='btn btn-info' to='/'>Web</Link>
            </div>
        </Navbar>
    );
};

export default AppNavbar;
