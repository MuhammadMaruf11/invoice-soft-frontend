/* eslint-disable react-hooks/exhaustive-deps */

import { Link } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth ";
import { FaUser } from "react-icons/fa";
import { BiLogInCircle } from "react-icons/bi";

const Header = () => {

  const { isAuthenticated } = useUserAuth()

  return (
    <>
      <header className="header-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-2">
              <Link to='/' className="header-logo">
                <img src="/img/logo/main-logo.png" alt="main_logo" />
              </Link>
            </div>
            <div className="col-xl-8">
              <ul className="main-menu">
                <li>
                  <Link to='/about'>About</Link>
                </li>
                <li>
                  <Link to='/docs'>Documentation</Link>
                </li>
                <li>
                  <Link to='/free-trial'>Free Trial</Link>
                </li>
                <li>
                  <Link to='/contact'>Contact</Link>
                </li>
              </ul>
            </div>
            <div className="col-xl-2">
              <div className="header-right">
                <ul>
                  {isAuthenticated ? <li>
                    <Link to='/user'><FaUser /> Profile</Link>
                  </li> : <li>
                    <Link to='/user/login'><BiLogInCircle /> Login</Link></li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
