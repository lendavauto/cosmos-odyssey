import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { FaSpaceShuttle } from 'react-icons/fa';
import { CgDollar } from 'react-icons/cg';
import { MdAddShoppingCart } from 'react-icons/md';

const SingleReservationWrapper = styled.article`
  height: 191px;
  border-bottom: 1px solid #1a78ab;
  h1 {
    color: #222;
  }
  .reservation-nr {
    font-size: 10px;
    margin: 4px 15px;
    border-bottom: 1px solid lightgray;
    span {
      text-transform: capitalize;
      font-weight: bold;
      margin-right: 2px;
    }
  }
  .reservation-details-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0 15px;
    border-bottom: 1px solid lightgray;
    p {
      font-size: 10px;
      margin-right: 15px;
      margin-top: 4px;
      span {
        text-transform: capitalize;
        font-weight: bold;
        margin-right: 2px;
      }
    }
  }
  .flight-details-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0 15px;
    border-bottom: 1px solid lightgray;
    p {
      font-size: 10px;
      flex: 0.4;
      span {
        text-transform: capitalize;
        font-weight: bold;
        margin-right: 2px;
      }
    }
    .flight-icon {
      flex: 0.2;
      font-size: 15px;
      margin-top: 5px;
    }
  }
  .flight-price-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 15px;
    padding-bottom: 4px;
    border-bottom: 1px solid lightgray;
    .price-icon {
      font-size: 18px;
      color: #222;
    }
    .hours-span {
      margin-left: 10px;
    }
    p {
      flex: 0.5;
      display: flex;
      align-items: center;
      font-size: 13px;
    }
    span {
      text-transform: capitalize;
      font-weight: bold;
      margin-right: 10px;
    }
  }
  .add-to-cart-valid-until-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0 15px;
    padding: 4px;
    border-bottom: 1px solid lightgray;
    p {
      font-size: 10px;
      margin: 4px 0;
      span {
        text-transform: capitalize;
        font-weight: bold;
        margin-right: 2px;
      }
    }
    .add-to-cart-btn {
      display: flex;
      align-items: center;
      text-transform: capitalize;
      font-weight: bold;
      font-size: 11px;
      padding: 3px;
      max-width: 100px;
      margin-right: 30px;
      margin-left: -4px;
      border-radius: 5px;
      border: 1px solid lightgray;
      transition: 0.2s ease-in;
      cursor: pointer;
      P {
        margin-left: 2px;
      }
      :hover {
        background-color: #aad7e3;
        border: 1px solid #222;
      }
      .icon {
        font-size: 20px;
        margin-left: 5px;
      }
    }
  }
`;

const SingleReservation = ({
  flight_id,
  user_email,
  company_name,
  first_name,
  last_name,
  price,
  route_from,
  route_to,
  valid_until,
  flight_time,
}) => {
  const addToCart = (e) => {
    e.preventDefault();
  };

  return (
    <SingleReservationWrapper>
      <p className='reservation-nr'>
        <span>flight nr</span>: {flight_id}
      </p>
      <p className='reservation-nr'>
        <span>company</span>: {company_name}
      </p>
      <div className='reservation-details-container'>
        <p>
          <span>first name</span>: {first_name}
        </p>
        <p>
          <span>last name</span>: {last_name}
        </p>
        <p>
          <span>email</span>: {user_email}
        </p>
      </div>
      <div className='flight-details-container'>
        <p>
          <span>from:</span>
          {route_from}
        </p>
        <FaSpaceShuttle className='flight-icon' />
        <p>
          <span>to:</span>
          {route_to}
        </p>
      </div>
      <div className='flight-price-container'>
        <p>
          <span>price: </span>
          {price}
          <CgDollar className='price-icon' />
        </p>
        <p>
          <span>Flight time:</span>
          {flight_time}
          <span className='hours-span'>Hours</span>
        </p>
      </div>
      <div className='add-to-cart-valid-until-container'>
        <button className='add-to-cart-btn' onClick={addToCart} type='submit'>
          Add to cart <MdAddShoppingCart className='icon' />
        </button>
        <p>
          <span>valid until:</span>
          {moment(valid_until).format('MMMM Do YYYY, h:mm: a')}
        </p>
      </div>
    </SingleReservationWrapper>
  );
};

export default SingleReservation;
