
import { FaFacebook, FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';
import { FaHashnode } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../../hooks/useUserAuth ';


const Footer = () => {

    const { isAuthenticated } = useUserAuth();

    return (
        <>
            <footer className="footer-area">
                <div className="top-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4">
                                <Link to='/' className="footer-logo">
                                    <img src="/img/logo/main-logo.png" alt="footer_logo" />
                                </Link>
                                <div className="footer-description my-3">
                                    <p>This <strong className='text-theme-2'>Invoice Software</strong> is an open-source project designed to streamline your invoicing process.</p>
                                </div>
                                <div className="footer-social">
                                    <ul>
                                        <li>
                                            <Link to=''>
                                                <FaFacebook />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=''>
                                                <FaLinkedin />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=''>
                                                <FaGithub />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=''>
                                                <FaHashnode />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=''>
                                                <FaStackOverflow />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="footer-widget">
                                    <h4>Pages</h4>
                                    <ul>
                                        <li>
                                            <Link to='/about'>About</Link>
                                        </li>
                                        <li>
                                            <Link to='/docs'>Documentation</Link>
                                        </li>
                                        {isAuthenticated ? <li>
                                            <Link to='/unlimited-invoice'>Unlimited Invoice</Link>
                                        </li> : <li>
                                            <Link to='/free-trial'>Free Trial</Link>
                                        </li>}
                                        <li>
                                            <Link to='/contact'>Contact</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="footer-widget">
                                    <ul>
                                        <li>
                                            <h4>Mobile: </h4>
                                            <Link to='tel:+8801821795775'>01821795775</Link>
                                        </li>
                                        <li>
                                            <h4>Email: </h4>
                                            <Link to='mailto:muhammad11maruf@gmail.com'>mailto:muhammad11maruf@gmail.com</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-12">
                                <div className="bottom-footer">
                                    <h6>Copyright 2024 <strong className='text-theme-2'>Invoice Software</strong> - All rights reserved.</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer