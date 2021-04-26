import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';
import { BsFolderPlus } from 'react-icons/bs';
import { TiArrowBackOutline } from 'react-icons/ti';
import Password from './Password';

const UserPanelWrapper = styled.div`
  flex: 0.7;
  height: 100%;
  background-color: #fff;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media (max-width: 900px) {
    flex: 1;
  }
  .user-panel-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100%;
    background-color: #5fa7c9;
    border-bottom: 1px solid #1a78ab;
    h1 {
      color: #fff;
      font-size: 15px;
    }
    @media (max-width: 900px) {
      display: none;
    }
  }
  .user-panel-welcome {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #5fa7c9;
    color: #fff;
    height: 38px;
    border-bottom: 1px solid #1a78ab;
    h1 {
      font-size: 15px;
    }
  }
  .user-details {
    font-size: 15px;
    height: 288px;
    @media (max-width: 900px) {
      margin-top: -10px;
    }
  }
  .details-container {
    display: flex;
    align-items: center;
    p {
      flex: 0.9;
      font-size: 13px;
      margin-top: 25px;
      margin-left: 15px;
      font-weight: bold;
      span {
        font-size: 13px;
        font-weight: 500;
      }
      @media (max-width: 900px) {
        margin-top: 5px;
      }
    }
    button {
      flex: 0.1;
      margin-right: 15px;
    }
  }
  .edit-btn {
    text-transform: capitalize;
    margin-top: 8px;
    margin-left: 15px;
    height: 30px;
    width: 60px;
    border-radius: 5px;
    border: 1px solid lightgray;
    transition: 0.2s ease-in;
    cursor: pointer;
    :hover {
      background-color: #aad7e3;
      border: 1px solid #222;
    }
  }
  .user-profile-image-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 97px;
    p {
      margin-left: 15px;
      font-size: 13px;
      font-weight: bold;
    }
    img {
      height: 50%;
      border: 1px solid #222;
      padding: 3px;
      border-radius: 50%;
      -webkit-box-shadow: 0px 10px 13px -7px #000000,
        5px 5px 15px 5px rgba(0, 0, 0, 0);
      box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
    }
    button {
      display: grid;
      place-items: center;
      font-size: 20px;
      margin-right: 15px;
      text-transform: capitalize;
      height: 30px;
      width: 75px;
      border-radius: 5px;
      border: 1px solid lightgray;
      transition: 0.2s ease-in;
      cursor: pointer;
      :hover {
        background-color: #aad7e3;
        border: 1px solid #222;
      }
    }
  }
  .back-home-btn {
    display: block;
    margin: 0 auto;
    padding: 10px;
    text-transform: capitalize;
    border-radius: 5px;
    border: 1px solid lightgray;
    transition: 0.2s ease-in;
    cursor: pointer;
    :hover {
      background-color: #aad7e3;
      border: 1px solid #222;
    }
  }
  .back-icon {
    position: absolute;
    left: 0;
    font-size: 30px;
    color: #fff;
    margin-left: 15px;
    cursor: pointer;
    :hover {
      color: #aad7e3;
    }
  }
`;

const UserPanel = () => {
  const [{ user }, dispatch] = useStateValue();

  const preventDrag = (e) => {
    e.preventDefault();
  };

  return (
    <UserPanelWrapper>
      <div className='user-panel-title'>
        <h1>User panel</h1>
      </div>
      <div className='user-panel-welcome'>
        <Link to='/' className='back-icon'>
          <TiArrowBackOutline />
        </Link>
      </div>
      <div className='user-profile-image-section'>
        <p>Profile image:</p>
        <img
          src={user?.photoURL}
          alt='user profile picture'
          onDragStart={preventDrag}
        />
        <button>
          <BsFolderPlus />
        </button>
      </div>
      <div className='user-details'>
        <div className='details-container'>
          <p>
            First Name: <span>-</span>
          </p>
          <button className='edit-btn'>Edit</button>
        </div>
        <div className='details-container'>
          <p>
            Last Name: <span>-</span>
          </p>
          <button className='edit-btn'>Edit</button>
        </div>
        <div className='details-container'>
          <p>
            Email: <span>{user?.email}</span>
          </p>
          <button className='edit-btn'>Edit</button>
        </div>
        <Password />
      </div>
    </UserPanelWrapper>
  );
};

export default UserPanel;
