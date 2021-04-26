import React from 'react';
import styled from 'styled-components';

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
`;

const NavButton = ({ title, icon, onClick }) => {
  return (
    <NavButtonWrapper onClick={onClick}>
      <div className='container'>
        {icon}
        <p>{title}</p>
      </div>
    </NavButtonWrapper>
  );
};

export default NavButton;
