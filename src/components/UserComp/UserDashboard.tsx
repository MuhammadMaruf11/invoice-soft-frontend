import { Link } from "react-router-dom";
import { PrivateAPI, PublicAPI } from "../../helper/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

// global variables 
const onetimeAccess = localStorage.getItem('onetimeaccess');

const UserDashboard = () => {

    useEffect(() => {
        const fetchUser = async () => {
            try {
                await PrivateAPI.get('/backend')
            } catch (error) {
                console.error('err,', error);
            }
        }
        fetchUser()
    }, [])

    const handleUnlimitedAccess = () => {

        try {
            localStorage.setItem('unlimitedAccess', 'true');
            if (onetimeAccess) {
                localStorage.removeItem('onetimeaccess')
            }
        } catch (error) {
            console.error('error', error)
        }
    }


    const handleLogout = async () => {
        try {
            const response = await PublicAPI.post("/api/auth/logout",)
            const data = response.data;
            console.log('data', data);
            localStorage.removeItem('userToken');
            toast.success("Logout Successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                window.open('/user/login', '_self')
            }, 1000);
        } catch (error) {
            //  console.error('error: ', error.message);
            toast.error("Logout failed!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        <section className="user-dashboard-area">
            <div className="container">
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-8 col-lg-10">
                        <h2 className="text-center">Congratulations! You now have unlimited access to this <strong className="text-theme-2">Invoice Software</strong>.</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-center gap-3">
                            <Link className="btn btn-success btn-lg" to='/unlimited-invoice' onClick={handleUnlimitedAccess}>Unlimited Invoice</Link>
                            <button className="btn btn-dark btn-lg" onClick={handleLogout}>Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserDashboard;