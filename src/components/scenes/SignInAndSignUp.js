import React from 'react';

import SignIn from '../SignIn';
import SignUp from '../SignUp';

import './scene.scss';

const SignInAndSignUp = () => (
  <div className="sign-in-and-sign-up">
    <SignIn />
    <SignUp />
  </div>
);

export default SignInAndSignUp;
