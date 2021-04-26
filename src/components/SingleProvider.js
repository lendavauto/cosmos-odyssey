import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import { FaSpaceShuttle } from 'react-icons/fa';
import { CgDollar } from 'react-icons/cg';
import { HiOutlineSave } from 'react-icons/hi';
import moment from 'moment';
import firebase from 'firebase';
import { db } from '../firebase';

const SingleProviderWrapper = styled.article`
  height: 191px;
  border-bottom: 1px solid #1a78ab;
  width: 100%;
  @media (max-width: 900px) {
    height: 230px;
  }
  .flight-nr {
    font-size: 10px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 4px;
    border-bottom: 1px solid lightgray;
    span {
      text-transform: capitalize;
      font-weight: bold;
      margin-right: 2px;
    }
  }
  .flight-details-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0 15px;
    .flight-icon {
      flex: 0.2;
      font-size: 15px;
      margin-top: 5px;
    }
    .flight-start-end {
      flex: 0.4;
      font-size: 10px;
      margin-top: 4px;
      span {
        text-transform: capitalize;
        font-weight: bold;
        margin-right: 2px;
      }
    }
  }
  .flight-price-container {
    margin: 0 15px;
    .price-icon {
      font-size: 18px;
      color: #222;
    }
    p {
      display: flex;
      align-items: center;
      font-size: 13px;
      border-bottom: 1px solid lightgray;
    }
    span {
      text-transform: capitalize;
      font-weight: bold;
      margin-right: 10px;
    }
  }
  .flight-reservation-container {
    display: flex;
    align-items: center;
    margin: 0 15px;
    margin-bottom: 5px;
    @media (max-width: 900px) {
      flex-direction: column;
      align-items: flex-start;
    }
    p {
      text-transform: capitalize;
      font-weight: bold;
      font-size: 13px;
    }
    input {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 5px;
      border: 1px solid #222;
      border-radius: 5px;
      padding: 2px;
      outline: none;
    }
    .last-name-input {
      margin-left: 15px;
      @media (max-width: 900px) {
        margin-left: 0;
      }
    }
  }
  .input-flex {
    flex: 0.5;
    display: flex;
    align-items: center;
    position: relative;
    @media (max-width: 900px) {
      margin-top: -5px;
    }
    .error-msg {
      position: absolute;
      opacity: 0;
      left: 100px;
      bottom: 24px;
      color: red;
      font-size: 11px;
      @media (max-width: 900px) {
        white-space: nowrap;
        bottom: 5px;
        left: 270px;
      }
    }
  }
  .btn-success-msg-container {
    button {
      position: relative;
      display: flex;
      align-items: center;
      text-transform: capitalize;
      font-weight: bold;
      font-size: 11px;
      margin-left: 15px;
      margin-top: -8px;
      padding: 3px;
      border-radius: 5px;
      border: 1px solid lightgray;
      transition: 0.2s ease-in;
      cursor: pointer;
      :hover {
        background-color: #aad7e3;
        border: 1px solid #222;
      }
      .icon {
        font-size: 20px;
        margin-left: 5px;
      }
    }
    p {
      position: absolute;
      opacity: 0;
      top: -5px;
      right: -60px;
      position: absolute;
      color: limegreen;
      font-size: 11px;
    }
  }
`;

const SingleProvider = ({ provider }) => {
  const [
    { user, priceListDate, routeFrom, routeTo },
    dispatch,
  ] = useStateValue();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const firstNameInput = useRef(0);
  const lastNameInput = useRef(0);
  const firstNameError = useRef(0);
  const lastNameError = useRef(0);
  const successMsg = useRef(0);
  const startDate = provider.flightStart.slice(0, 19);
  const endDate = provider.flightEnd.slice(0, 19);
  console.log(priceListDate);
  let end = moment(endDate);
  let start = moment(startDate);
  let duration = moment.duration(end.diff(start));
  let flightTime = duration.asHours().toString().slice(0, 5);

  const formatPrice = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const addReservation = (e) => {
    e.preventDefault();

    if (firstName === '' || lastName === '') {
      if (firstName === '') {
        firstNameInput.current.style = 'border: 1px solid red';
        firstNameError.current.style = 'opacity: 1';
      } else {
        firstNameInput.current.style = 'border: 1px solid #222';
        firstNameError.current.style = 'opacity: 0';
      }
      if (lastName === '') {
        lastNameInput.current.style = 'border: 1px solid red';
        lastNameError.current.style = 'opacity: 1';
      } else {
        lastNameInput.current.style = 'border: 1px solid #222';
        lastNameError.current.style = 'opacity: 0';
      }
      return false;
    } else {
      firstNameInput.current.style = 'border: 1px solid #222';
      lastNameInput.current.style = 'border: 1px solid #222';
      firstNameError.current.style = 'opacity: 0';
      lastNameError.current.style = 'opacity: 0';
      successMsg.current.style = 'opacity: 1';

      db.collection('reservations').add({
        company_name: provider.company.name,
        user_email: user.email,
        first_name: firstName,
        flight_id: provider.id,
        last_name: lastName,
        price: provider.price,
        flight_time: flightTime,
        route_from: routeFrom,
        route_to: routeTo,
        valid_until: priceListDate,
        timestamp: firebase.firestore.Timestamp.now(),
      });
    }
    const successMsgInterval = setInterval(() => {
      successMsg.current.style = 'opacity: 0';
      clearInterval(successMsgInterval);
    }, 2000);
    setFirstName('');
    setLastName('');
  };

  return (
    <SingleProviderWrapper>
      <p className='flight-nr'>
        <span>flight nr</span>: {provider.id}
      </p>
      <p className='flight-nr'>
        <span>company:</span>
        {provider.company.name}
      </p>
      <div className='flight-details-container'>
        <p className='flight-start-end'>
          <span>flight start:</span>
          {moment(startDate).format('MMMM Do YYYY, h:mm: a')}
        </p>
        <FaSpaceShuttle className='flight-icon' />
        <p className='flight-start-end'>
          <span>flight end:</span>
          {moment(endDate).format('MMMM Do YYYY, h:mm: a')}
        </p>
      </div>
      <div className='flight-price-container'>
        <p>
          <span>price: </span>
          {formatPrice(provider.price)}
          <CgDollar className='price-icon' />
        </p>
      </div>
      <form action='POST'>
        <div className='flight-reservation-container'>
          <div className='input-flex'>
            <p>First name:</p>
            <p className='error-msg' ref={firstNameError}>
              enter first name!
            </p>
            <input
              ref={firstNameInput}
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className='input-flex last-name-input'>
            <p>Last name:</p>
            <p className='error-msg' ref={lastNameError}>
              enter last name!
            </p>
            <input
              ref={lastNameInput}
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='btn-success-msg-container'>
          <button onClick={addReservation} type='submit'>
            Confirm reservation <HiOutlineSave className='icon' />
            <p ref={successMsg}>success!</p>
          </button>
        </div>
      </form>
    </SingleProviderWrapper>
  );
};

export default SingleProvider;
