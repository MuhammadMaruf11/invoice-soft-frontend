import { Link } from "react-router-dom";


const UserDashboard = () => {

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        setTimeout(() => {
            window.open('/user/login', '_slef')
        }, 1000);
    }

    return (
        <section className="user-dashboard-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-10">
                        <h2 className="text-center">Congratulations! You now have unlimited access to this <strong className="text-theme-2">Invoice Software</strong>.</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex gap-3">
                            <Link className="btn btn-info text-white" to='/free-trial'>Continue Create Invoice</Link>
                            <button className="btn btn-secondary" onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserDashboard;