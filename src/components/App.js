import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import Header from './Header';
import Footer from './Footer';
import MainSection from './MainSection';
import Login from './Login';
import { auth, provider } from '../firebase';

const AppWrapper = styled.div`
  background-color: #fff;
  margin: 0 auto;
  height: 100%;
  max-width: 1170px;
  background-image: url('https://images.pexels.com/photos/733475/pexels-photo-733475.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
  background-size: cover;
  background-repeat: no-repeat;
  font-family: 'Roboto', sans-serif;
`;

const App = () => {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: 'SET_USER',
          payload: result.user,
        });
      })
      .catch((error) => alert(error.message));
  }, []);

  return (
    <AppWrapper>
      <Header />
      {!user ? <Login /> : <MainSection />}
      <Footer />
    </AppWrapper>
  );
};

export default App;
