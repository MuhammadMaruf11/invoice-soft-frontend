import { toast } from "react-toastify";
import { PublicAPI } from "../../helper/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiList } from "../../helper/apiList";

const UserRegister = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await PublicAPI.post(apiList.USER_REGISTER, formData)

            toast.success("Register Successfully", {
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
                email: "",
                password: "",
            })
            setTimeout(() => {
                navigate("/user/login");
            }, 1500);
        } catch (error) {
            toast.error("Register failed!", {
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
    };
    return (
        <section className='login-area'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-5 col-lg-7 col-md-10">
                        <div className='login-form-wrap'>
                            <h2 className='text-center'>Register</h2>
                            <form className="register-form" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username">Username <span className="text-danger">*</span></label>
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
                                    <label htmlFor="email">Email <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
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
                                <button type="submit" className='w-50 mx-auto d-block btn btn-primary'>Register</button>
                            </form>
                            <div className="text-center mt-4">
                                Already Have account? <Link className='' to='/user/login'>Login here</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserRegister;