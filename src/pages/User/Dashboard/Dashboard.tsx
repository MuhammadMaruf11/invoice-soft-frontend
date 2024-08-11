import CommonBanner from '../../../components/Banner/CommonBanner';
import Layout from '../../../components/Layout/Layout';
import UserDashboard from '../../../components/UserComp/UserDashboard';

const Dashboard = () => {


    return (
        <Layout>
            <CommonBanner bannerTitle='User Dashboard Page' />
            <UserDashboard />
        </Layout>
    )
}

export default Dashboard