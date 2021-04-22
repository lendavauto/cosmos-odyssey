import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import User from './User';
import Flights from './Flights';
import Reservations from './Reservations';
import Error from './Error';
import UserPanel from './UserPanel';
import Checkout from './Checkout';
import FlightsList from './FlightsList';

const MainSectionWrapper = styled.section`
  display: flex;
  height: calc(100vh - 200px);
  border-left: 2px solid #1a78ab;
  border-right: 2px solid #1a78ab;
  overflow: hidden;
`;

const MainSection = () => {
  return (
    <MainSectionWrapper>
      <User />
      <Switch>
        <Route exact path='/'>
          <Flights />
        </Route>
        <Route path='/reservations'>
          <Reservations />
        </Route>
        <Route exact path='/user-panel'>
          <UserPanel />
        </Route>
        <Route exact path='/checkout'>
          <Checkout />
        </Route>
        <Route path='/flights/:id'>
          <FlightsList />
        </Route>
        <Route>
          <Error path='*' />
        </Route>
      </Switch>
    </MainSectionWrapper>
  );
};

export default MainSection;
