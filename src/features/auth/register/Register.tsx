import React from 'react'
import AuthPagesWrapper from '../auth-wrapper/AuthPagesWrapper'
import RegisterForm from './components/RegisterForm'

function Register() {
  return (
    <AuthPagesWrapper title="Register in Ezymote vehicle tracker">
      <RegisterForm />
    </AuthPagesWrapper>
  )
}

export default Register