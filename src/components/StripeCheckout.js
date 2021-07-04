import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from '@stripe/react-stripe-js';
import { CgDollar } from 'react-icons/cg';
import { RiVisaFill } from 'react-icons/ri';
import { FaCcMastercard } from 'react-icons/fa';
import { FaCcDiscover } from 'react-icons/fa';
import { FaCcJcb } from 'react-icons/fa';
import { SiAmericanexpress } from 'react-icons/si';
import axios from '../axios';
import { db } from '../firebase';

const StripeCheckoutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 54px);
  width: calc(100% - 1px);
  .price-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    height: 30px;
    width: 100%;
    border: 1px solid rgba(50, 50, 93, 0.1);
    border-radius: 5px;
    p {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #32325d;
      span {
        font-weight: 600;
      }
    }
  }
  .card-icons {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 50px;
    width: 100%;
    margin-bottom: 5px;
    .card-icon {
      font-size: 45px;
      color: #5fa7c9;
    }
    .card-icon-express {
      font-size: 36px;
      color: #5fa7c9;
    }
  }
  .message-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    height: 30px;
    width: 100%;
    border: 1px solid rgba(50, 50, 93, 0.1);
    border-radius: 5px;
    p {
      font-size: 14px;
      color: #32325d;
    }
  }
  .price-icon {
    font-size: 18px !important;
    color: #32325d;
  }
  form {
    width: 30vw;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }

  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }

  .result-message {
    display: flex;
    justify-content: center;
    line-height: 22px;
    font-size: 14px;
    color: #24a95d;
  }

  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }

  .hidden {
    display: none;
  }

  #card-error {
    color: #f41f1f;
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }

  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }

  #payment-request-button {
    margin-bottom: 32px;
  }

  /* Buttons and links */
  button {
    background: #1a78ab;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }

  button:hover {
    filter: contrast(115%);
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }

  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .spinner:before,
  .spinner:after {
    position: absolute;
    content: '';
  }

  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }

  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`;

const formatPrice = (x) => {
  var parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (parts[1]?.length > 3) {
    parts[1] = parts[1].slice(0, 2);
  }
  return parts.join('.');
};

const promise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const [{ cart, total_amount, user }, dispatch] = useStateValue();

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '14px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#f41f1f',
        iconColor: '#f41f1f',
      },
    },
  };

  // STRIPE
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const createPaymentIntent = async () => {
      const response = await axios({
        method: 'post',
        url: `/checkout/create?total=${total_amount * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    createPaymentIntent();
  }, [cart]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection('users')
          .doc(user?.email)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
          cart: cart,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({ type: 'CLEAR_CART' });
        dispatch({ type: 'PAYMENT_MODAL_CLOSE' });

        dispatch({
          type: 'SHOW_HISTORY',
        });
      });
  };

  const handleChange = async (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  return (
    <div>
      <form id='payment-form' onSubmit={handleSubmit}>
        <div className='card-icons'>
          <RiVisaFill className='card-icon' />
          <FaCcMastercard className='card-icon' />
          <FaCcDiscover className='card-icon' />
          <FaCcJcb className='card-icon' />
          <SiAmericanexpress className='card-icon-express' />
        </div>
        <div className='message-container'>
          <p>Please insert your card details</p>
        </div>
        <CardElement
          id='card-element'
          options={cardStyle}
          onChange={handleChange}
        />
        <button disabled={processing || disabled || succeeded} id='submit'>
          <span id='button-text'>
            {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
          </span>
        </button>
        {/* Payment error */}
        {error && (
          <div id='card-error' role='alert'>
            {error}
          </div>
        )}
        {/* Success message */}
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment was successful!
        </p>
        <div className='price-container'>
          <p>
            Order total: <CgDollar className='price-icon' />
            <span>{formatPrice(total_amount)}</span>
          </p>
        </div>
      </form>
    </div>
  );
};

const StripeCheckout = () => {
  return (
    <StripeCheckoutWrapper>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </StripeCheckoutWrapper>
  );
};

export default StripeCheckout;
