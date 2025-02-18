import { Navigate, Route, Routes } from 'react-router-dom';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import Dashboard from './pages/User/Dashboard/Dashboard';
import Login from './pages/User/Login/Login';
import Register from './pages/User/Register/Register';
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import { useUserAuth } from './hooks/useUserAuth ';
import { useAdminAuth } from './hooks/useAdminAuth ';
import InputPage from './pages/Invoice/InputPage';
import PreviewPage from './pages/Invoice/PreviewPage';
import InputUnlimitedPage from './pages/Invoice/InputUnlimitedPage';
import AdminRegister from './pages/Admin/AdminRegister/AdminRegister';
import AdminAllUsers from './pages/Admin/AdminAllUsers/AdminAllUsers';
import AdminInvoices from './pages/Admin/AdminInvoices/AdminInvoices';
import AdminSingleInvoice from './pages/Admin/AdminInvoices/AdminSingleInvoice';
import { Spinner } from 'react-bootstrap';
import Docs from './pages/Docs/Docs';

function App() {

  const { isUserAuthenticated, isLoading: userLoading } = useUserAuth()
  const { isAdminAuthenticated, isLoading: adminLoading } = useAdminAuth();

  if (userLoading || adminLoading) {
    return <div className='d-flex vh-100 justify-center align-items-center'>
      <Spinner animation="border" role="status" className=" mx-auto" />
    </div>;
  }

  return (
    <>
      <Routes>

        <Route path="/*" element={<Error />} />

        <Route path="/" element={<Home />} />
        <Route path="/free-trial" element={<InputPage />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/invoice/preview" element={<PreviewPage />} />

        {/* User routes herer  */}
        <Route path="/user/login" element={!isUserAuthenticated ? <Login /> : <Navigate to="/user" />} />
        <Route path="/user/register" element={!isUserAuthenticated ? <Register /> : <Navigate to="/user" />} />
        <Route path="/user" element={isUserAuthenticated ? <Dashboard /> : <Navigate to="/user/login" />} />
        <Route path="/unlimited-invoice" element={isUserAuthenticated ? <InputUnlimitedPage /> : <Navigate to="/user/login" />} />


        {/* admin panel routes herer  */}

        <Route path="/admin/register" element={!isAdminAuthenticated ? <AdminRegister /> : <Navigate to="/admin" />} />
        <Route path="/admin/login" element={!isAdminAuthenticated ? <AdminLogin /> : <Navigate to="/admin" />} />
        <Route path="/admin" element={isAdminAuthenticated ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/all-users" element={isAdminAuthenticated ? <AdminAllUsers /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/user-invoice" element={isAdminAuthenticated ? <AdminInvoices /> : <Navigate to="/admin/login" />} />
        <Route path="/admin/user-invoice/:id" element={isAdminAuthenticated ? <AdminSingleInvoice /> : <Navigate to="/admin/login" />} />

      </Routes>
    </>
  )
}

export default App
