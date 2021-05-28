import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/company-logo.png';

const HeaderWrapper = styled.header`
  height: 95px;
  border: 2px solid #1a78ab;
  border-top: none;
  display: flex;
  align-items: center;
  overflow: hidden;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .logo {
    height: 150px;
    width: 150px;
    margin-left: -10px;
    margin-top: 5px;
  }
  h1 {
    margin: 0 auto;
    color: #fff;
    font-size: 45px;
    font-family: 'Zen Dots', cursive;
    @media (max-width: 650px) {
      transform: scale(0.8);
    }
  }
`;

const preventDrag = (e) => {
  e.preventDefault();
};

const Header = () => {
  return (
    <HeaderWrapper>
      <Link to='/' onDragStart={preventDrag}>
        <img src={logo} alt='logo' className='logo' />
      </Link>
      <h1>Cosmos Odyssey</h1>
    </HeaderWrapper>
  );
};

export default Header;
