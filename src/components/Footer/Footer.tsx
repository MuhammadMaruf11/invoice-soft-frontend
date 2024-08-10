import React from 'react'
import { Link } from 'react-router-dom';

type Props = {}

const Footer = (props: Props) => {
    return (
        <>
            <footer id="footer" className="footer-3">
                <div className="top-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div
                                    className="rst-widget grid__item small-down--one-whole medium-down--one-whole"
                                >
                                    <h5 className="rst-footer-title">
                                        <span>About Removal.AI</span>
                                    </h5>
                                    <div className="textwidget">
                                        <p>
                                            Removal.AI is an A.I. powered tool that uses advanced
                                            computer vision algorithms to detect the foreground pixel
                                            and separates the background completely from the
                                            foreground.
                                        </p>
                                        <p style={{ marginBottom: '0' }}>
                                            <i className="fa fa-envelope" style={{ marginRight: '10px' }}></i>
                                            E-mail:
                                            <Link style={{ color: '#000 ' }} to="mailto:hello@removal.ai"
                                            >hello@removal.ai</Link
                                            >
                                        </p>
                                        <p style={{ marginBottom: '0' }}>
                                            <i
                                                className="fa fa-phone-square-alt"
                                                style={{ marginRight: '10px' }}
                                            ></i>
                                            Phone Number:
                                            <Link style={{ color: '#000' }} to="tel:+442032870646"
                                            >+44 20 3287 0646</Link
                                            >
                                        </p>
                                        <p style={{ marginBottom: '0' }}>
                                            <i
                                                className="fa fa-map-marker-alt"
                                                style={{ marginRight: '10px' }}
                                            ></i>
                                            Vietnam Office: #5 Nguyentrai street, Vinh city, Vietnam
                                        </p>
                                        <p style={{ marginBottom: '0' }}>
                                            <i
                                                className="fa fa-map-marker-alt"
                                                style={{ marginRight: '10px' }}
                                            ></i>
                                            UK Office: 24-26 Arcadia Avenue, Dephna House #105,
                                            London, Greater London, United Kingdom, N3 2JU
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-2">
                                <div
                                    className="rst-widget grid__item small-down--one-whole medium-down--one-whole"
                                >
                                    <h5 className="rst-footer-title"><span>Tools &amp; API</span></h5>
                                    <div className="menu-menu-1-container">
                                        <ul id="menu-menu-1" className="menu">
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/api-documentation/">API Documentation</Link>
                                            </li>
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/download/">Desktop Tools</Link>
                                            </li>
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/category/design-resources/"
                                                >Design Resources</Link
                                                >
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div
                                    style={{ marginTop: '40px' }}
                                    className="rst-widget grid__item small-down--one-whole medium-down--one-whole"
                                >
                                    <h5 className="rst-footer-title"><span>Support</span></h5>
                                    <div className="menu-menu-1-container">
                                        <ul id="menu-menu-1" className="menu">
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/contact/">Contact us</Link>
                                            </li>
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/terms-conditions/">Terms &amp; Conditions</Link>
                                            </li>
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/privacy-policy/">Privacy Policy</Link>
                                            </li>
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/refund-policy/">Refund Policy</Link>
                                            </li>
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/cancel-policy/">Cancellation Policy</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div
                                    className="rst-widget grid__item small-down--one-whole medium-down--one-whole"
                                >
                                    <h5 className="rst-footer-title"><span>How to use</span></h5>
                                    <div className="menu-menu-1-container">
                                        <ul id="menu-menu-1" className="menu">
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/services/car-dealerships/">For Car Dealer</Link>
                                            </li>
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/services/developers/">For Developers</Link>
                                            </li>
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/services/designers/">For Designers</Link>
                                            </li>
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/services/individuals/">For Individuals</Link>
                                            </li>
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/services/marketing/">For Marketing</Link>
                                            </li>
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/services/media/">For Media</Link>
                                            </li>
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/services/ecommerce/">For Ecommerce</Link>
                                            </li>
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/services/photographer/">For Photographer</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div
                                    className="rst-widget grid__item small-down--one-whole medium-down--one-whole"
                                >
                                    <h5 className="rst-footer-title"><span>Company</span></h5>
                                    <div className="menu-menu-1-container">
                                        <ul id="menu-menu-1" className="menu">
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/about-us/">About us</Link>
                                            </li>
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/blog/">Blog</Link>
                                            </li>
                                            <li
                                                className="menu-item menu-item-type-post_type menu-item-object-page"
                                            >
                                                <Link to="/affiliate/">Affiliate Program</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="clear"></div>
                                <h5 className="rst-footer-title">Follow us</h5>
                                <ul className="social-media">
                                    <li>
                                        <Link
                                            aria-label="Twitter"
                                            to="https://twitter.com/Removal_ai"
                                        ><i className="fab fa-twitter"></i
                                        ></Link>
                                    </li>
                                    <li>
                                        <Link
                                            aria-label="Pinterest"
                                            to="https://www.pinterest.com/RemovalAI/"
                                        ><i className="fab fa-pinterest"></i
                                        ></Link>
                                    </li>
                                    <li>
                                        <Link
                                            aria-label="Facebook"
                                            to="https://www.facebook.com/removalai"
                                        ><i className="fab fa-facebook"></i
                                        ></Link>
                                    </li>
                                </ul>
                                <div className="clear"></div>
                                <Link id="changeLanguage" to=""
                                ><i className="fa fa-globe"></i> English
                                    <i className="fa fa-angle-right"></i
                                    ></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-footer">
                    <div className="container text-center">
                        <h5>Copyright 2019-2023 Removal AI - All rights reserved.</h5>
                        <p>
                            "Removal" is a brand of "REMOVAL.AI LTD. Registered in England and
                            Wales No: "13257563".
                        </p>
                        <p>
                            All trademarks, service marks, trade names, product names, logos
                            and trade dress appearing on our website are the property of their
                            respective owners.
                        </p>
                        <img
                            width="321"
                            height="25"
                            alt="Removal payment method"
                            data-src="https://removal.ai/wp-content/uploads/pay.png"
                            className="lazyloaded"
                            src="https://removal.ai/wp-content/uploads/pay.png"
                        /><noscript
                        ><img
                                width="321"
                                height="25"
                                src="https://removal.ai/wp-content/uploads/pay.png"
                                alt="Removal payment method"
                            /></noscript>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer