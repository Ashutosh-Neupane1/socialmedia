import "./Navbar.css";
import { NavLink } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  

  
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">Logo</div>

      {isMobile && (
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      {isMobile ? (
        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`} style={{ display: isMenuOpen ? 'block' : 'none' }}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                exact = "true"
                to="/"
                className={(navData) => (navData.isActive ? 'nav-link active' : 'nav-link')}
              >
                Home
              </NavLink>
            </li>

            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={(navData) => (navData.isActive ? 'nav-link active' : 'nav-link')}
                  >
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/SignIn"
                    className={(navData) => (navData.isActive ? 'nav-link active' : 'nav-link')}
                  >
                    Signin
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/UserTofollow"
                    className={(navData) => (navData.isActive ? 'nav-link active' : 'nav-link')}
                  >
                    User to follow
                  </NavLink>
                </li>
              </>
            ) : null}

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/about"
                    className={(navData) => (navData.isActive ? 'nav-link active' : 'nav-link')}
                  >
                    About
                  </NavLink>
                </li>
                

                <li className="nav-item">
                  <NavLink
                    to="/signout"
                    className={(navData) => (navData.isActive ? 'nav-link active' : 'nav-link')}
                  >
                    SignOut
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/userTofollow"
                    className={(navData) => (navData.isActive ? 'nav-link active' : 'nav-link')}
                  >
                  Usertofollow
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/EditProfile"
                    className={(navData) => (navData.isActive ? 'nav-link active' : 'nav-link')}
                  >
                    EditProfile
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      ) : (
        <div className="navbar-menu">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                exact = "true"
                to="/"
                className={(navData) => (navData.isActive ? 'nav-link active' : 'nav-link')}
              >
                Home
              </NavLink>
            </li>

            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={(navData) => (navData.isActive ? 'nav-link active' : 'nav-link')}
                  >
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/SignIn"
                    className={(navData) => (navData.isActive ? 'nav-link active' : 'nav-link')}
                  >
                    Signin
                  </NavLink>
                </li>
              </>
            ) : null}

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/about"
                    className={(navData) => (navData.isActive ? 'nav-link active' : 'nav-link')}
                  >
                    About
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to="/signout"
                    className={(navData) => (navData.isActive ? 'nav-link active' : 'nav-link')}
                  >
                    SignOut
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/EditProfile"
                    className={(navData) => (navData.isActive ? 'nav-link active' : 'nav-link')}
                  >
                    EditProfile
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
