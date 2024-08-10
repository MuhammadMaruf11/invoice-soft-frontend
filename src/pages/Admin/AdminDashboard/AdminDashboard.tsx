import { useEffect } from 'react'
import AdminLayout from '../../../components/AdminComp/AdminLayout/AdminLayout'
import { useNavigate } from 'react-router-dom';
import { PublicAPI } from '../../../helper/api';

type Props = {}

const AdminDashboard = (props: Props) => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const headers = new Headers();

  // Use a ternary operator to set the 'Authorization' header if 'token' is defined
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  useEffect(() => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      PublicAPI.get(
        "/admin",
        {
          headers
        }
      )
        .then(response => {
          if (response.status === 200) {
            navigate('/admin')
          } else {
            // Sign-in failed
            navigate('/admin/login')
          }
        })
    } catch (error) {
      navigate('/admin/login')
    }
  }, []);

  return (
    <AdminLayout>
      <div>Dashboard</div>
    </AdminLayout>
  )
}

export default AdminDashboard