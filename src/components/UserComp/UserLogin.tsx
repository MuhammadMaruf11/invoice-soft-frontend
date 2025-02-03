import { toast } from "react-toastify";
import { PublicAPI } from "../../helper/api";
import { useState } from "react";
import { Link } from "react-router-dom";


const UserLogin = () => {


    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        try {
            const response = await PublicAPI.post("/api/auth/login", formData)
            const data = response.data;
            localStorage.setItem("userToken", data.token);
            localStorage.setItem("userId", data.userId);

            toast.success("Sign-in Successfully", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setFormData({
                username: "",
                password: "",
            })
            setTimeout(() => {
                window.open("/user", '_self');
            }, 1000);
        } catch (error) {
            //  console.error('error: ', error.message);
            toast.error("Sign-in failed!", {
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

        // You may handle the response here, e.g., store user data in state or local storage.

    };

    return (
        <section className="login-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-4 col-lg-6 col-md-8">
                        <div className="login-form-wrap">
                            <h2 className="text-center">Login</h2>
                            <form className="login-form" onSubmit={handleSignIn}>
                                <div className="mb-3">
                                    <label htmlFor="username">User Name <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password">Password <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                    <button type="submit" className="w-100 d-block btn btn-primary">
                                    Login
                                </button>
                            </form>
                            <div className="text-center mt-4">
                                Have no account? <Link className='' to='/user/register'>Register Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserLogin;