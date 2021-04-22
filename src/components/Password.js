import React from 'react';
import styled from 'styled-components';
import { RiLockPasswordFill } from 'react-icons/ri';

const PasswordWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100px;
  width: 100%;
  .password-container {
    margin-left: 14px;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    width: 30%;
    p {
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 13px;
    }
    input {
      padding: 2px;
      margin-bottom: 5px;
      outline: none;
      border: 1px solid #222;
      border-radius: 5px;
    }
  }
  .password-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
    height: 30px;
    width: 80px;
    margin-top: 45px;
    margin-right: 15px;
    border-radius: 5px;
    border: 1px solid lightgray;
    transition: 0.2s ease-in;
    cursor: pointer;
    :hover {
      background-color: #aad7e3;
      border: 1px solid #222;
    }
  }
  .password-btn-icon {
    margin-left: 2px;
    font-size: 16px;
  }
`;

const Password = () => {
  return (
    <PasswordWrapper>
      <div className='password-container'>
        <p>Change Password</p>
        <input type='password' placeholder='Old password' />
        <input type='password' placeholder='New password' />
      </div>
      <button className='password-btn'>
        Confirm <RiLockPasswordFill className='password-btn-icon' />
      </button>
    </PasswordWrapper>
  );
};

export default Password;
