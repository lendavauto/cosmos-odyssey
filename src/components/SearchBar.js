import React from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #1a78ab;
  .search-bar {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    width: 100%;
    background-color: #5fa7c9;
  }
  .search-icon {
    color: #fff;
    font-size: 20px;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    margin-left: 18px;
    margin-right: 25px;
    :hover {
      color: #aad7e3;
    }
  }
  .search-input {
    width: 90%;
    height: 60%;
    font-size: 20px;
    margin-right: 10px;
    border-radius: 5px;
    border: none;
    border-radius: 5px;
    @media (max-width: 650px) {
      width: 80%;
    }
  }
`;

const SearchBar = () => {
  return (
    <SearchBarWrapper>
      <div className='search-bar'>
        <BsSearch className='search-icon' />
        <input type='text' className='search-input' />
      </div>
    </SearchBarWrapper>
  );
};

export default SearchBar;
