import { Col,  message,  Row } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Rectangle from '../../assets/images/Rectangle.png'
import fastfood from '../../assets/images/fastfood.jpg'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from '../../config/firebase'
import { useAuthContext } from '../../contexts/AuthContext'
import { doc, setDoc } from 'firebase/firestore'

export default function Register() {
  const [state, setState] = useState({ fullName: '', email: '', password: '' })
  const [isLoading,setIsLoading] = useState(false)
  const {dispatch} = useAuthContext()
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    let {fullName, email, password } = state

    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
      const user = userCredential.user;
      let formData = {fullName,email,uid:user.uid,role:'customer'}
      await setDoc(doc(firestore,"users",user.uid),formData);
      dispatch({
        payload: {user:{email:user.email,uid:user.uid}},
        type:'setLoggedIn'
      });
      message.success("User registered successfully")
      navigate('/')
    })
    
    .catch((error) => {
     console.error(error.code)
     switch(error.code){
      case 'auth/email-already-in-use':
        message.error("Email already registered");
        break;
        default : 
        message.error("Somethong went wrong while addding a new user");
        break;
     }
    })
    .finally(() => {
      setIsLoading(false);
    })

  }
  return (
    <>
      <Row gutter={0} align={'middle'} justify={'center'} >
        <Col className='' xs={0} sm={0} md={15} lg={15} style={{ height: '100vh' }}>
          <div className="image-container d-flex justify-content-center align-items-center" style={{ overflow: 'hidden', height: '100vh', width: '' }}>
            <img
              alt="example"
              src={fastfood}
              style={{}}
            />
          </div>
        </Col>
        <Col className=' d-flex flex-column align-items-start justify-content-center' xs={24} sm={24} md={9} lg={9} style={{ height: '100vh' }}>
          <div className="mx-auto p-3 p-md-4" style={{ maxWidth: 500 }}>
            <h2 className="fw-bold text-info mb-4">Create new account</h2>
            <p className='fw-light'>Enter your details</p>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 mb-4">
                  <label className='m-1' >Full Name</label>
                  <input type="text" className='form-control' placeholder='Enter full name' name='fullName' onChange={handleChange} />
                </div>
                <div className="col-12 mb-4">
                <label className='m-1'>Email</label>
                  <input type="email" className='form-control' placeholder='Enter email' name='email' onChange={handleChange} />
                </div>
                <div className="col-12 mb-4">
                <label className='m-1'>Password</label>
                  <input type="password" className='form-control mb-0' placeholder='Enter password' name='password' onChange={handleChange} />
                </div>
                  <p className='mb-1 '>Already have an account? <Link to="/auth/login" className='text-decoration-none fw-bold text-info'>Login Now</Link></p>
                <div className="col-12">
                  <button className='btn btn-info w-100 mt-2' loading={isLoading}>Register</button>
                </div>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </>
  )
}
