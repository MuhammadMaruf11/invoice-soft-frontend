import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop.tsx';

// all css import here 
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import './user.css'
import './admin.css'
import './index.css'
import { UserAuthProvider } from './lib/userContext/UserAuthContext.tsx';
import { AdminAuthProvider } from './lib/adminContext/AdminAuthContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <AdminAuthProvider>
    <UserAuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </UserAuthProvider>
  </AdminAuthProvider>
)
