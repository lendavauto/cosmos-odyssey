import React from 'react';
import styled from 'styled-components';
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
  @media (max-width: 900px) {
    height: 30px;
  }
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
  .cart-counter {
    position: absolute;
    left: -35px;
    bottom: -30px;
    width: 120px;
    line-height: 120px;
    border-radius: 50%;
    text-align: center;
    font-size: 40px;
    border: 2px solid #fff;
    color: #fff;
    background-color: #082b44;
    transform: scale(0.19);
    @media (max-width: 900px) {
      bottom: -45px;
      transform: scale(0.17);
    }
  }
`;

const NavButton = ({ title, icon, onClick }) => {
  const [{ total_items }, dispatch] = useStateValue();

  return (
    <NavButtonWrapper onClick={onClick}>
      <div className='container'>
        {title === 'checkout' && total_items > 0 ? (
          <div className='cart-counter'>
            {total_items}
          </div>
        ) : null}
        {icon}
        <p>{title}</p>
      </div>
    </NavButtonWrapper>
  );
};

export default NavButton;
