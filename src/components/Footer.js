import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  display: grid;
  place-items: center;
  height: 105px;
  border: 2px solid #1a78ab;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  h1 {
    color: #fff;
    font-size: 12px;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <h1>Uptime test assignment by: Andreas Aus</h1>
    </FooterWrapper>
  );
};

export default Footer;
