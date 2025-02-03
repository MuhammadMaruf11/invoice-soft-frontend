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

function App() {

  const { isUserAuthenticated } = useUserAuth()
  const { isAdminAuthenticated } = useAdminAuth()
  return (
    <>
      <Routes>

        <Route path="/*" element={<Error />} />

        <Route path="/" element={<Home />} />
        <Route path="/free-trial" element={<InputPage />} />
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

      </Routes>
    </>
  )
}

export default App
