import CommonBanner from "../../../components/Banner/CommonBanner";
import Layout from "../../../components/Layout/Layout";
import UserLogin from "../../../components/UserComp/UserLogin";



const Login: React.FC = () => {

  return (
    <Layout>
      <CommonBanner bannerTitle="User Login Page" />
      <UserLogin />
    </Layout>
  );
};

export default Login;
