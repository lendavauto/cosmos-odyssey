import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';

const FlightsListFilterWrapper = styled.div`
  .fl-filter-container {
    display: flex;
    align-items: center;
    p {
      font-size: 12px;
      margin-right: 15px;
      font-weight: bold;
    }
    select {
      margin-right: 15px;
      padding: 2px;
      cursor: pointer;
    }
  }
`;

const FlightsListFilter = () => {
  const [{ flFilter }, dispatch] = useStateValue();

  const updateFilter = (e) => {
    const value = e.target.value;
    dispatch({ type: 'UPDATE_FLIGHTS_FILTER', payload: value });
  };

  const clearFilter = () => {
    dispatch({
      type: 'CLEAR_FILTER',
    });
  };

  useEffect(() => {
    dispatch({ type: 'FILTER_FLIGHTS' });
  }, [flFilter]);

  return (
    <FlightsListFilterWrapper>
      <div className='fl-filter-container'>
        <p>Filter by:</p>
        <select
          name='fl-filter'
          id='fl-filter'
          value={flFilter}
          onChange={updateFilter}
        >
          <option value='price-lowest' onClick={updateFilter}>
            Price (lowest)
          </option>
          <option value='price-highest'>Price (highest)</option>
          <option value='company-name-a'>Name (a-z)</option>
          <option value='company-name-z'>Name (z-a)</option>
        </select>
      </div>
    </FlightsListFilterWrapper>
  );
};

export default FlightsListFilter;
