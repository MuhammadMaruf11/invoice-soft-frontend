import { ReactNode, useState } from 'react';
import AppNavbar from '../AppNavbar/AppNavbar';
import AppSidebar from '../AppSidebar/AppSidebar';
import AppFooter from '../AppFooter/AppFooter';

// main css file 
import '../../../admin.css';

// react toastify
import { ToastContainer } from "react-toastify";

type AdminMainContent = {
    children?: ReactNode; // Use ReactNode as the type for children
};

const AdminLayout = ({ children }: AdminMainContent) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="admin-layout">
            <AppNavbar onToggleSidebar={toggleSidebar} />
            <AppSidebar isOpen={sidebarOpen} />
            <main className={`content ${sidebarOpen ? 'shrinked' : ' '}`}>
                <ToastContainer />
                {children}
            </main>
            <AppFooter />
        </div>
    );
};

export default AdminLayout;
