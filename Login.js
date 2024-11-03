import { Col, Row } from 'antd'
import React, { useState } from 'react'
import Rectangle from '../../assets/images/Rectangle.png'
import fastfood from '../../assets/images/fastfood.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

export default function Register() {
  const navigate = useNavigate()
  const [state, setState] = useState({ email: '', password: '' })
  const {login,isProcessing} = useAuthContext()
  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    let {email,password} = state
    login(email,password);
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
            <h2 className="fw-bold text-info ">Login</h2>
            <p className='fw-light mb-3'>Enter your details</p>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 mb-4">
                  <label className='m-1'>Email</label>
                  <input type="email" className='form-control' placeholder='Enter email' name='email' onChange={handleChange} />
                </div>
                <div className="col-12 mb-4">
                  <label className='m-1'>Password</label>
                  <input type="password" className='form-control mb-0' placeholder='Enter password' name='password' onChange={handleChange} />
                </div>
                <p className='mb-1 '>Create new account? <Link to="/auth/register" className='text-decoration-none fw-bold text-info'>Register Now</Link></p>
                <Link to='/auth/forgotpassword' className='text-decoration-none fw-bold text-info'>Forgot Password</Link>
                <div className="col-12">
                  <button className='btn btn-info w-100 mt-2'>Login</button>
                </div>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </>
  )
}
