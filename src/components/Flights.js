import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import { MdLocalOffer } from 'react-icons/md';
import axios from 'axios';
import SingleFlight from './SingleFlight';
import Filter from './Filter';
import Loader from './Loader';

const FlightsWrapper = styled.div`
  flex: 0.7;
  height: 100%;
  background-color: #fff;
  border-left: 1px solid #1a78ab;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .flights-title {
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
  .flights-title-text {
    font-size: 20px;
    text-transform: capitalize;
  }
  .flights-icon {
    font-size: 22px;
    color: #fff;
    margin-right: 15px;
  }
  .flights-list {
    overflow-y: scroll;
    height: calc(100% - 89px);
  }
  .loader-container {
    height: 676px;
    width: 100%;
    background-color: #72b2cf;
  }
`;

const Flights = () => {
  const [{ offersLoading, apiData }, dispatch] = useStateValue();
  const url = 'https://odyssey-cosmos.netlify.app';

  const fetchData = async (url) => {
    dispatch({
      type: 'LOADING_TRUE',
    });
    try {
      const response = await axios.get(url);
      const flightOffers = response.data.legs;
      const offersDateValid = response.data.validUntil.slice(0, 19);
      console.log('RESPONSE:' , response);
      if (response === undefined) {
        return null;
      }
      if (response.data) {
        dispatch({
          type: 'SET_DATA',
          payload: flightOffers,
        });
        dispatch({
          type: 'SET_PRICELIST',
          payload: offersDateValid,
        });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_OFFERS_ERROR', payload: error });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  return (
    <FlightsWrapper>
      <div className='flights-title'>
        <MdLocalOffer className='flights-icon' />
        <h1 className='flights-title-text'>currently available offers</h1>
      </div>
      <Filter />
      {offersLoading ? (
        <div className='loader-container'>
          <Loader />
        </div>
      ) : (
        <div className='flights-list'>
          {apiData?.map((flight) => {
            return <SingleFlight key={flight.id} flight={flight} />;
          })}
        </div>
      )}
    </FlightsWrapper>
  );
};

export default Flights;
