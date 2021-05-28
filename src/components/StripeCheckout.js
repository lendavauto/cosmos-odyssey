import React from 'react';
import styled from 'styled-components';

const StripeCheckoutWrapper = styled.div``;

const CheckoutForm = () => {
  return <h2>hello from stripe checkout</h2>;
};

const StripeCheckout = () => {
  return (
    <StripeCheckoutWrapper>
      <CheckoutForm />
    </StripeCheckoutWrapper>
  );
};

export default StripeCheckout;
