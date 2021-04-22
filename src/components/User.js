import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import SearchBar from './SearchBar';

const UserWrapper = styled.div`
  flex: 0.3;
  height: 100%;
  min-width: 385px;
  border-right: 1px solid #1a78ab;
  background-color: #5fa7c9;
`;

const User = () => {
  return (
    <UserWrapper>
      <SearchBar />
      <Navbar />
    </UserWrapper>
  );
};

export default User;
