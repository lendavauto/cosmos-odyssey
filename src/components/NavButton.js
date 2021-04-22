import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import { useStateValue } from '../StateProvider';

const NavButtonWrapper = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 49px;
  background-color: #5fa7c9;
  border: none;
  border-bottom: 1px solid #1a78ab;
  transition: 0.2s ease-in;
  cursor: pointer;
  :hover {
    background-color: #082b44;
  }
  p {
    color: #fff;
    font-size: 18px;
    text-decoration: none;
    text-transform: capitalize;
  }
  .container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .reservations-count {
    position: absolute;
    text-align: center;
    height: 18px;
    width: 18px;
    color: #fff;
    background-color: #78bfdd;
    font-size: 12px;
    font-weight: bold;
    left: 14px;
    bottom: 2px;
    padding: 4px;
    border: 2px solid #fff;
    border-radius: 50%;
    transform: scale(0.7);
  }
`;

const NavButton = ({ title, icon, onClick }) => {
  const [{ reservationsList }, dispatch] = useStateValue();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    db.collection('reservations').onSnapshot((snapshot) => {
      setReservations(
        snapshot.docs.map((doc) => {
          return {
            firebase_id: doc.id,
            data: doc.data(),
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'SET_RESERVATIONS',
      payload: reservations,
    });
  }, [, reservations]);
  return (
    <NavButtonWrapper>
      <div className='container' onClick={onClick}>
        {reservationsList.length > 0 && title === 'reservations' ? (
          <p className='reservations-count'>{reservationsList.length}</p>
        ) : null}
        {icon}
        <p>{title}</p>
      </div>
    </NavButtonWrapper>
  );
};

export default NavButton;
