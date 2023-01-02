import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { Image } from 'react-bootstrap';

function App() {
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg- text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
          
          

            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              
              <p className="fw-bold text-body mb-5">Procurement Management System</p>
              
              <h2 className="fw-bold text-dark mb-5">Log In</h2>
              <p className="text-secondary mb-5">Enter your email and password below</p>
              <div className="form-group">
              <label  className="form-label" style={{textAlign:'left'}}>Email:</label>
              <MDBInput wrapperClass='mb-4 mx-5 w-80' labelClass='text-secondry' label='Email address' id='formControlLg' type='email' size="lg"/>
              <label  className="form-label" style={{textAlign:'left'}}>Password:</label>
              <MDBInput wrapperClass='mb-4 mx-5 w-80' labelClass='text-secondry' label='Password' id='formControlLg' type='password' size="lg"/>
              </div>
              <p className="small mb-3 pb-lg-2"><a className="text-dark" href="#!">Forgot password?</a></p>
              <button type="button" className="btn btn-primary">Login</button>

              <br/>

              <div>
                

              </div>,,
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default App;