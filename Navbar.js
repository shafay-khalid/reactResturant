import { Button } from 'antd'
import { signOut } from 'firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { useAuthContext } from '../../contexts/AuthContext'
import { ShoppingCartOutlined } from '@ant-design/icons';

export default function Navbar() {
  // const [isContactUsSectionRendered, setIsContactUsSectionRendered] = useState(false);

  // useEffect(() => {
  //   setIsContactUsSectionRendered(true);
  // }, []);

  const { state, logout } = useAuthContext()
  const [isModelVisible, setIsModelVisible] = useState()
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/auth/login')
  }
  const handleProfile = () => {
    navigate("/profile")
  }
  const handleHome = () => {
    navigate("/")
    const contactUsSection = document.getElementById('home');
    contactUsSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMenuItems = () => {
    const contactUsSection = document.getElementById('menu-items');
    contactUsSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategories = () => {
    const contactUsSection = document.getElementById('categories');
    contactUsSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactUs = () => {
    const contactUsSection = document.getElementById('contact-us');
    contactUsSection.scrollIntoView({ behavior: 'smooth' });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Signed out');
        navigate('/auth/register')
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
      });
  };


  return (
    <>

      <header>
        <nav className="navbar navbar-expand-lg shadow fixed-top bg-body-tertiary  p-2">
          <div className="container-fluid">
            <a className="navbar-brand text-info fs-2 fw-medium navbar-brand" href="/">Resturant</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body mt-0">
                <ul className="navbar-nav justify-content-center mt-2 flex-grow-1 pe-3">
                  <li className="nav-item">
                    <button className="nav-link active " aria-current="page" onClick={handleHome}>Home</button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" onClick={handleCategories}>Categories</button>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link" href="/dashboard">DashBoard</a>
                  </li> */}
                  <li className="nav-item">
                    <button className="nav-link" onClick={handleMenuItems}>Menu</button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" onClick={handleContactUs}>Contact Us</button>
                  </li>


                 
                </ul>
                {/* <form className="d-flex mt-2" role="search">
                  <Button type='primary' className='bg-info' size='medium' shape='rounded' onClick={handleLogin}> login</Button>
                  <Button type='primary' className='bg-danger mx-2' size='medium' shape='rounded' onClick={handleSignOut}> log out</Button>
                </form> */}
                <div className="p-2">
                  {state.isAuthenticated ? (
                    <React.Fragment>
                      <div className='text-center'>
                      <Link className='mx-3'  to={'/Cart'}><ShoppingCartOutlined style={{fontSize:29, color:'black'}}/></Link>
                      <Button type='primary' className='bg-danger ' size='medium' shape='rounded' onClick={handleProfile} > Profile</Button>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Button type='primary' className='bg-danger mx-2' size='medium' shape='rounded' onClick={handleLogin} >Login</Button>
                    </React.Fragment>
                  )
                  }
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

