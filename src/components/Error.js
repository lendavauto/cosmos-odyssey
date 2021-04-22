import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import errorImg from '../images/error-bcg.png';

const ErrorWrapper = styled.div`
  flex: 0.7;
  height: 100%;
  background-color: #fff;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  img {
    display: block;
    margin: 0 auto;
    height: 400px;
    width: 400px;
  }
  .error-title {
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
  }
  .error-message {
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
    span {
      color: #082b44;
    }
  }
  .error-message-text {
    text-align: center;
    margin: 15px 0;
    color: #222;
  }
  .back-home-btn {
    display: block;
    margin: 0 auto;
    padding: 10px;
    color: #222;
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
`;

const Error = () => {
  const preventDrag = (e) => {
    e.preventDefault();
  };

  return (
    <ErrorWrapper>
      <div className='error-title'>
        <h1>Error!</h1>
      </div>
      <div className='error-message'>
        <h1>Resource not found</h1>
      </div>
      <h1 className='error-message-text'>Oops, something went wrong...</h1>
      <img src={errorImg} alt='floating astronaut' onDragStart={preventDrag} />
      <Link to='/' style={{ textDecoration: 'none' }}>
        <button className='back-home-btn'>Back Home</button>
      </Link>
    </ErrorWrapper>
  );
};

export default Error;
