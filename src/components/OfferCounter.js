import React from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import moment from 'moment';

const OfferCounterWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 10px;
  top: 33%;
  height: 60px;
  width: 56%;
  border: 2px solid #fff;
  border-radius: 5px;
  background-color: #5fa7c9;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  h1 {
    text-align: center;
    font-size: 11px;
    color: #fff;
    margin-top: 8px;
    letter-spacing: 1px;
    font-family: 'Zen Dots', cursive;
  }
  p {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    color: #082b44;
    font-size: 12px;
    font-weight: bold;
    width: 80%;
    margin-top: -5px;
    padding: 2px;
    border: 1px solid #fff;
    border-radius: 5px;
    -webkit-box-shadow: 0px 10px 13px -7px #000000,
      5px 5px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  }
`;

const OfferCounter = () => {
  const [{ priceListDate }, dispatch] = useStateValue();

  return (
    <OfferCounterWrapper>
      <h1>Hurry! The offers end:</h1>
      <p>{moment(priceListDate).add(3,'hour').endOf().fromNow()}</p>
    </OfferCounterWrapper>
  );
};

export default OfferCounter;
