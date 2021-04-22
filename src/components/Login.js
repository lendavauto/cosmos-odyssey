import React from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import logo from '../images/google-logo.png';
import loginBcg from '../images/login-bcg.png';
import rocketBcg from '../images/reservations-bcg.png';
import { auth, provider } from '../firebase';
import firebase from 'firebase';

const LoginWrapper = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  height: calc(100vh - 200px);
  background-color: #fff;
  border-left: 2px solid #1a78ab;
  border-right: 2px solid #1a78ab;
  .login-container {
    display: grid;
    place-items: center;
    height: 400px;
    width: 300px;
    background-color: #fff;
    border: 2px solid #1a78ab;
    border-radius: 5px;
    z-index: 99;
    -webkit-box-shadow: 0px 10px 13px -7px #000000,
      5px 5px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
    h1 {
      text-align: center;
      font-size: 18px;
      letter-spacing: 1px;
      color: #222;
      font-family: 'Zen Dots', cursive;
    }
  }
  .login-bcg {
    position: absolute;
    width: 40%;
    top: 0;
    left: 0;
    @media (max-width: 750px) {
      display: none;
    }
  }
  .rocket-img {
    height: 100px;
    width: 100px;
  }
  .btn-container {
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: #273b7a;
    padding: 5px;
    width: 150px;
    margin-bottom: 15px;
    -webkit-box-shadow: 0px 10px 13px -7px #000000,
      5px 5px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
    transition: 0.3s ease-in-out;
    :hover {
      opacity: 0.9;
    }
    button {
      padding: 6px;
      font-size: 14px;
      background-color: #273b7a;
      color: #fff;
      border: none;
      cursor: pointer;
    }
    img {
      height: 30px;
      width: 30px;
      cursor: pointer;
    }
  }
`;

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: 'SET_USER',
          payload: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <LoginWrapper>
      <img src={loginBcg} alt='cosmos picture' className='login-bcg' />
      <div className='login-container'>
        <h1>Your journey begins here!</h1>
        <img src={rocketBcg} alt='space rocket' className='rocket-img' />
        <div className='btn-container'>
          <img src={logo} alt='google logo' />
          <button onClick={signIn}>Login with Google</button>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default Login;
