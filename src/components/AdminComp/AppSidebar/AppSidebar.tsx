import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean;
}

const AppSidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>

            <Nav className="flex-column side-bar-list">
                <Nav.Link as={Link} to="/admin"><i className="fas fa-home-lg-alt"></i> <span>Dashboard</span></Nav.Link>
                <Nav.Link as={Link} to="/admin/plans"><i className="fas fa-wrench"></i> <span>Plans</span></Nav.Link>
                {/* <Nav.Link as={Link} to="/admin/images"><i className="fas fa-images"></i> Images</Nav.Link> */}
                <Nav.Link as={Link} to="/admin/users"><i className="fas fa-users"></i> <span>All User</span></Nav.Link>
                <Nav.Link as={Link} to="/admin/orders"><i className="fas fa-cart-plus"></i> <span>All Order</span></Nav.Link>
            </Nav>
        </div>
    );
};

export default AppSidebar;
