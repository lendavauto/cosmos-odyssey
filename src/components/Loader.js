import React from 'react';
import styled from 'styled-components';
import loader from '../images/loader.gif';

const LoaderWrapper = styled.div`
  img {
    height: 100%;
    width: 100%;
  }
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <img src={loader} alt='loading' />
    </LoaderWrapper>
  );
};

export default Loader;
