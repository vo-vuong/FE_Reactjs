import React from 'react';
import RegisterForm from '../RegisterForm';

Register.propTypes = {};

function Register(props) {
  const handleRegisterFormSubmit = (values) => {
    console.log('Lam gi do sau khi form submit');
    console.log('Form Register Submit:', values);
  };

  return (
    <div>
      <RegisterForm onSubmit={handleRegisterFormSubmit} />
    </div>
  );
}

export default Register;
