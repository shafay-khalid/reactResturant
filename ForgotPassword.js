import {Col, Row } from 'antd'
import React, { useState } from 'react'
import Rectangle from '../../assets/images/Rectangle.png'
import fastfood from '../../assets/images/fastfood.jpg'
import {Link} from 'react-router-dom'

export default function Register() {
  const [state,setState] = useState({email:''})
  const handleChange = e => setState(s => ({...s ,[e.target.name]:e.target.value}))
  const handleSubmit = (e) => {
e.preventDefault()
let {email}=state
console.log(state)
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
            <h2 className="fw-bold text-info ">Update password</h2>
            <p className='fw-light mb-3'>Enter your details</p>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 mb-4">
                <label className='m-1'>Email</label>
                  <input type="email" className='form-control' placeholder='Enter email' name='email' onChange={handleChange} />
                </div>
               
                  <p className='mb-1 '>Create new account? <Link to="/auth/register" className='text-decoration-none fw-bold text-info'>Register Now</Link></p>
                <div className="col-12">
                  <button className='btn btn-info w-100 mt-2'>Reset Password</button>
                </div>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </>
  )
}
