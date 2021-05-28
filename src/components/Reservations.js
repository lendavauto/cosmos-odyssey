import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
import { db } from '../firebase';
import SingleReservation from './SingleReservation';
import moment from 'moment';

const ReservationsWrapper = styled.div`
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
  .reservations-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100%;
    background-color: #5fa7c9;
    border-bottom: 1px solid #1a78ab;
    @media (max-width: 900px) {
      display: none;
    }
    h1 {
      color: #fff;
      font-size: 15px;
    }
  }
  .reservations-count {
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
      margin: 0 5px;
    }
  }
  .back-icon {
    position: absolute;
    left: 0;
    font-size: 30px;
    color: #fff;
    margin-left: 15px;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    :hover {
      color: #aad7e3;
    }
  }
  .reservations-container {
    height: calc(100% - 89px);
    overflow-y: scroll;
    @media (max-width: 900px) {
      height: calc(100% - 158px);
    }
  }
`;

const Reservations = () => {
  const [{ user }, dispatch] = useStateValue();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('reservations')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setReservations(
          snapshot.docs.map((doc) => {
            return {
              firebase_id: doc.id,
              data: doc.data(),
            };
          })
        );
      });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    dispatch({
      type: 'SET_RESERVATIONS',
      payload: reservations,
    });
  }, [reservations]);

  return (
    <ReservationsWrapper>
      <div className='reservations-title'>
        <h1>Reservations</h1>
      </div>
      <div className='reservations-count'>
        <Link to='/' className='back-icon'>
          <TiArrowBackOutline />
        </Link>
      </div>
      <div className='reservations-container'>
        {reservations?.map(
          ({
            data: {
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
              timestamp,
            },
          }) => {
            const isOfferValid = moment(valid_until)
              .add(3, 'hour')
              .endOf()
              .fromNow();

            if (user_email === user.email && !isOfferValid.includes('ago')) {
              return (
                <SingleReservation
                  key={timestamp + user_email}
                  flight_id={flight_id}
                  company_name={company_name}
                  first_name={first_name}
                  last_name={last_name}
                  price={price}
                  route_from={route_from}
                  route_to={route_to}
                  valid_until={valid_until}
                  flight_time={flight_time}
                  user_email={user_email}
                />
              );
            } else {
              return null;
            }
          }
        )}
      </div>
    </ReservationsWrapper>
  );
};

export default Reservations;
