// react toastify
import { ToastContainer } from "react-toastify";
import Layout from "../../../components/Layout/Layout";
import CommonBanner from "../../../components/Banner/CommonBanner";
import UserRegister from "../../../components/UserComp/UserRegister";



const Register: React.FC = () => {


  return (
    <Layout>
      <ToastContainer />
      <CommonBanner bannerTitle="User Registration Page" />
      <UserRegister />
    </Layout>
  );
};

export default Register;