import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center signIn"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '60px auto',
      }}
    >
      <h1 className="titleSignIn">Kids Play Soccer</h1>
      <Button type="button" size="lg" variant="outline-info" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
