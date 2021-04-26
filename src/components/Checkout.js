import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
import logo from '../images/stripe-logo.png';

const CheckoutWrapper = styled.div`
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
  .checkout-title {
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
      @media (max-width: 900px) {
        margin-top: -10px;
      }
    }
    @media (max-width: 900px) {
     display: none;
    }
  }
  .checkout-count {
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
    span {
      color: #082b44;
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
  .checkout-message-container {
    display: grid;
    place-items: center;
    height: 50%;
    h1 {
      color: #222;
      font-size: 18px;
      letter-spacing: 0.5px;
      font-family: 'Zen Dots', cursive;
    }
  }
  img {
    width: 150px;
  }
`;

const Checkout = () => {
  return (
    <CheckoutWrapper>
      <div className='checkout-title'>
        <h1>Checkout</h1>
      </div>
      <div className='checkout-count'>
        <Link to='/' className='back-icon'>
          <TiArrowBackOutline />
        </Link>
      </div>
      <div className='checkout-message-container'>
        <h1>Payment system coming soon</h1>
        <img src={logo} alt='stripe payments logo' />
      </div>
    </CheckoutWrapper>
  );
};

export default Checkout;
