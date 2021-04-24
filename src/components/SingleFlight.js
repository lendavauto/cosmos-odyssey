import React from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';
import stamp from '../images/ticket-stamp.png';
import moment from 'moment';

const SingleFlightWrapper = styled.article`
  height: 142px;
  border-bottom: 1px solid #1a78ab;

  .flight-offer-nr {
    font-size: 10px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 4px;
    border-bottom: 1px solid lightgray;
    span {
      text-transform: capitalize;
      font-weight: bold;
    }
  }
  .flight-from-to {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 13px;
    margin-top: 4px;
    margin-left: 15px;
    margin-right: 15px;
    border-bottom: 1px solid lightgray;
    span {
      text-transform: capitalize;
      font-weight: bold;
    }
  }
  .flight-offer-icon {
    color: #222;
    height: 30px;
    object-fit: contain;
    flex: 0.1;
  }
  .flight-offer-btn {
    text-transform: capitalize;
    margin-top: 8px;
    margin-left: 15px;
    padding: 4px;
    border-radius: 5px;
    border: 1px solid lightgray;
    transition: 0.2s ease-in;
    cursor: pointer;
    :hover {
      background-color: #aad7e3;
      border: 1px solid #222;
    }
  }
  .flight-from {
    flex: 0.3;
  }
  .flight-to {
    flex: 0.3;
  }
  .flight-distance {
    flex: 0.3;
  }
  .btn-date-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    p {
      margin-right: 15px;
      font-size: 10px;
      span {
        text-transform: capitalize;
        font-weight: bold;
      }
    }
  }
`;

const SingleFlight = (flight) => {
  const [{ priceList }, dispatch] = useStateValue();

  const formatDistance = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <SingleFlightWrapper>
      <p className='flight-offer-nr'>
        <span>offer nr</span>: {flight.flight.id}
      </p>
      <div className='flight-from-to'>
        <img
          src={stamp}
          alt='offer ticket logo'
          className='flight-offer-icon'
        />
        <p className='flight-from'>
          <span>from:</span> {flight.flight.routeInfo.from.name}
        </p>
        <p className='flight-to'>
          <span className='flight-to'>to:</span>{' '}
          {flight.flight.routeInfo.to.name}
        </p>
        <p className='flight-distance'>
          <span>distance:</span>{' '}
          {formatDistance(flight.flight.routeInfo.distance)} km
        </p>
      </div>
      <div className='btn-date-container'>
        <Link to={`/flights/${flight.flight.id}`}>
          <button className='flight-offer-btn'>view all flights</button>
        </Link>
        <p>
          <span>valid until:</span>{' '}
          {moment(priceList).format('MMMM Do YYYY, h:mm: a')}
        </p>
      </div>
    </SingleFlightWrapper>
  );
};

export default SingleFlight;
