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
import { UserAuthProvider } from './hooks/UserAuthContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserAuthProvider>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </UserAuthProvider>
)
