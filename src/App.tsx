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

function App() {

  const { isAuthenticated } = useUserAuth()
  const adminAuth = useAdminAuth()
  console.log('userAuth', isAuthenticated);
  return (
    <>
      <Routes>

        <Route path="/*" element={<Error />} />

        <Route path="/" element={<Home />} />

        {/* User routes herer  */}
        <Route path="/user" element={isAuthenticated ? <Dashboard /> : <Navigate to="/user/login" />} />
        <Route path="/user/login" element={!isAuthenticated ? <Login /> : <Navigate to="/user" />} />
        <Route path="/user/register" element={!isAuthenticated ? <Register /> : <Navigate to="/user" />} />


        {/* admin panel routes herer  */}

        <Route path="/admin/login" element={!adminAuth ? <AdminLogin /> : <Navigate to="/admin" />} />
        <Route path="/admin" element={adminAuth ? <AdminDashboard /> : <Navigate to="/admin/login" />} />

        <Route path="/free-trial" element={<InputPage />} />
        <Route path="/invoice/preview" element={<PreviewPage />} />
      </Routes>
    </>
  )
}

export default App
