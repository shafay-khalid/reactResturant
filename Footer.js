import React from 'react'
import { FacebookOutlined,InstagramOutlined } from '@ant-design/icons';

export default function Footer() {
  return (
    <>
      <div className="bg-info">
        <div className="container p-4">
          <div className="row text-white">
            <div className="col-12 col-lg-4 col-md-6 col-sm-12"><b>About our store</b>
            <p>Sharki Brand is owned by Muhammad Shafay. <br/>
            Marketing Manager is Abdul Wasay.</p>
            <b>Social Accounts</b>
            <p className='mt-2'><InstagramOutlined style={{ fontSize: '24px', color: '#C13584' ,marginRight:'3px' }} />
            <FacebookOutlined style={{ fontSize: '24px', color: '#3b5998' }} /></p>
            </div>
            <div className="col-12 col-lg-4 col-md-6 col-sm-12"><b>Policies</b><br />
            <b>Contact information <br />
            Privacy policy <br />
            Terms of service</b>
            </div>
            <div className="col-12 col-lg-4 col-md-6 col-sm-12"><b>Get Notified</b><br />
            <p>If you want to get mails of our latest articles and want to know about sales then give us your email to receive offers from our store</p>
            <input className='w-100 mb-2 ' type="email" placeholder='Enter your email' style={{borderRadius:'9px',height:'40px'}} />
            <button className='btn btn-light w-100'>Ok</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
