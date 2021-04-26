import React from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';
import NavButton from './NavButton';
import navBcg from '../images/navbar-bcg.png';
import navBcgSecond from '../images/navbar-bcg2.png';
import { GiSpaceSuit } from 'react-icons/gi';
import { GoCalendar } from 'react-icons/go';
import { FaOpencart } from 'react-icons/fa';
import { CgLogOut } from 'react-icons/cg';
import OfferCounter from './OfferCounter';
import { auth } from '../firebase';

const NavbarWrapper = styled.nav`
  position: relative;
  margin: 0;
  height: 100%;
  width: 100%;
  .nav-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #5fa7c9;
    color: #fff;
    height: 38px;
    border-bottom: 1px solid #1a78ab;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    @media (max-width: 900px) {
      display: none;
    }
    h1 {
      font-size: 18px;
      margin-left: 18px;
      span {
        font-size: 17px;
        color: #082b44;
        cursor: pointer;
        :hover {
          opacity: 0.8;
        }
      }
    }
  }
  .nav-button-icon {
    color: #fff;
    font-size: 25px;
    margin-right: 15px;
    margin-left: 15px;
  }
  .navbar-bcg-img {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    @media (max-width: 900px) {
      display: none;
    }
  }
  .navbar-bcg-img-2 {
    position: absolute;
    left: 15px;
    top: 20%;
    width: 35%;
    transform: translateY(100px);
    @media (max-width: 900px) {
      display: none;
    }
  }
`;

const Navbar = () => {
  const [{ user }, dispatch] = useStateValue();

  const preventDrag = (e) => {
    e.preventDefault();
  };

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch({
        type: 'LOG_OUT',
      });
    });
  };

  return (
    <NavbarWrapper>
      <div className='nav-header'>
        <h1>
          Welcome,{' '}
          <Link to='/user-panel' style={{ textDecoration: 'none' }}>
            <span>{user.displayName}</span>
          </Link>
        </h1>
      </div>
      <Link to='/reservations' style={{ textDecoration: 'none' }}>
        <NavButton
          icon={<GoCalendar className='nav-button-icon' />}
          title='reservations'
        />
      </Link>
      <Link to='/user-panel' style={{ textDecoration: 'none' }}>
        <NavButton
          icon={<GiSpaceSuit className='nav-button-icon' />}
          title='user panel'
        />
      </Link>
      <Link to='/checkout' style={{ textDecoration: 'none' }}>
        <NavButton
          icon={<FaOpencart className='nav-button-icon' />}
          title='checkout'
        />
      </Link>
      <NavButton
        icon={<CgLogOut className='nav-button-icon' />}
        title='sign out'
        onClick={signOut}
      />
      <OfferCounter />
      <img
        src={navBcgSecond}
        alt='space bear'
        className='navbar-bcg-img-2'
        onDragStart={preventDrag}
      />
      <img
        src={navBcg}
        alt='flying rocket'
        className='navbar-bcg-img'
        onDragStart={preventDrag}
      />
    </NavbarWrapper>
  );
};

export default Navbar;
