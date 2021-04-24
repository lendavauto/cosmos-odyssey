import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import SingleProvider from './SingleProvider';
import { Link } from 'react-router-dom';
import { RiSpaceShipLine } from 'react-icons/ri';
import { TiArrowBackOutline } from 'react-icons/ti';

const FlightsListWrapper = styled.div`
  background-color: #fff;
  height: 100%;
  width: 100%;
  overflow: hidden;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  h1 {
    color: #222;
  }
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
    font-size: 25px;
    color: #fff;
    margin-right: 15px;
  }
  .flights-count {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    background-color: #5fa7c9;
    color: #fff;
    border-bottom: 1px solid #1a78ab;
    h1 {
      color: #fff;
      font-size: 15px;
    }
    span {
      color: #082b44;
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
  }
  .flights-list {
    width: 100%;
    height: calc(100% - 89px);
    overflow-y: scroll;
  }
`;

const FlightsList = () => {
  const [{ apiData }, dispatch] = useStateValue();
  const url = 'http://localhost:3000/TravelPrices';
  // 29,79 on local 38, 87 on build
  const offerId = window.location.href.slice(30, 87);

  useEffect(() => {
    apiData.map((item) => {
      if (item.id === offerId) {
        dispatch({
          type: 'SET_ROUTE_FROM',
          payload: item.routeInfo.from.name,
        });
        dispatch({
          type: 'SET_ROUTE_TO',
          payload: item.routeInfo.to.name,
        });
      }
    });
  }, []);

  return (
    <FlightsListWrapper>
      <div className='flights-title'>
        <RiSpaceShipLine className='flights-icon' />
        <h1 className='flights-title-text'>currently available flights</h1>
      </div>
      <div className='flights-count'>
        <Link to='/' className='back-icon'>
          <TiArrowBackOutline />
        </Link>
      </div>
      <div className='flights-list'>
        {apiData.map((item) => {
          if (item.id === offerId) {
            return item.providers.map((item) => {
              return <SingleProvider key={item.id} provider={item} />;
            });
          }
        })}
      </div>
    </FlightsListWrapper>
  );
};

export default FlightsList;
