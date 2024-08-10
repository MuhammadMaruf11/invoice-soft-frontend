
// import OrderList from './OrderList'
import { Link } from 'react-router-dom'
import Layout from '../../../components/Layout/Layout';






const Dashboard = () => {




    // Logout component or function
    const handleLogout = async () => {
        try {
            // Clear token from client-side storage
            window.localStorage.removeItem("userToken");

            window.open("/user/login", "_self");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <Layout>
            <div id="content" className='checkout-v2'>
                <div className="content-inner account-v2 account-container">
                    <div className="container">
                        <div className="account-detail">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="account-detail__info">
                                        <h2>Hello, </h2>
                                        <Link to='/user/change-own-password' className="change-password-button" >Change password</Link>
                                        <button className="rm-logout" onClick={handleLogout} >Log out</button>

                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <img alt="detail_banner" className="account-detail__banner lazyloaded" src="https://removal.ai/wp-content/uploads/new-theme/account-banner.png" />
                                </div>
                            </div>
                        </div>
                        <div className="payment-detail">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="payment-detail__sub">
                                        <h3>Subcriptions</h3>
                                        <p className="sub-title">Credits are valid for one month only                        </p>
                                        <p className="credit-number">
                                            0                            Credits                            <span> / this month</span>
                                        </p>
                                        <Link to="/price">Buy more credit</Link>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="payment-detail__pocket">
                                        <h3>Pay as you go</h3>
                                        <p className="sub-title">Credits are valid for lifetime</p>
                                        <p className="credit-number">
                                            1                            Credits                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rm-transaction-history subcriptions-history">
                            <h5>Subscriptions history</h5>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="th-20">Item</th>
                                        <th className="th-20">Start Date</th>
                                        <th className="th-20">Next Payment</th>
                                        <th className="th-20">Method</th>
                                        <th className="th-20">Total</th>
                                        <th className="th-10">Status</th>
                                        <th className="th-10">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Your table data goes here */}
                                </tbody>
                            </table>

                            <div className="rm-error-message rm-hidden">

                            </div>
                        </div>

                        <div className="rm-transaction-history payment-history">
                            <h5>Billing history</h5>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Number of images</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                            <div className="fat-sb-pagination payment-pagination" data-obj="RemovalAccount" data-func="loadingPaymentHistory">
                            </div>
                        </div>

                        {/* <div className="rm-transaction-history convert-history">
                            <h5>Remove background history</h5>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>File name <i className="fas fa-info-circle"
                                            title="For security reasons, your original file names were encrypted. All of your images will be removed automatically within 60 minutes of being uploaded."></i>
                                        </th>
                                        <th>Credit type</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <div className="fat-sb-pagination convert-pagination" data-obj="RemovalAccount"
                                data-func="loadingConvertHistory">
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard