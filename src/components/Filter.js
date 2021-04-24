import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #5fa7c9;
  color: #fff;
  height: 38px;
  border-bottom: 1px solid #1a78ab;
  .destination-filter-container {
    display: flex;
    align-items: center;
    color: #fff;
    margin-left: 15px;
    h1 {
      text-transform: capitalize;
      font-size: 12px;
      margin-right: 15px;
    }
    select {
      margin-right: 15px;
      padding: 2px;
      cursor: pointer;
    }
  }
  .filter-select {
    margin-right: 15px;
    padding: 2px;
    cursor: pointer;
  }
  .filter-container {
    display: flex;
    align-items: center;
    label {
      font-size: 12px;
      margin-right: 15px;
      font-weight: bold;
    }
  }
`;

const Filter = () => {
  const [{ apiData, filter }, dispatch] = useStateValue();

  const updateFilter = (e) => {
    const value = e.target.value;

    dispatch({ type: 'UPDATE_FILTER', payload: value });
  };

  useEffect(() => {
    dispatch({ type: 'FILTER_OFFERS' });
  }, [filter]);

  return (
    <FilterWrapper>
      <div className='destination-filter-container'>
        <h1>Destination:</h1>
        <div className='from-to-container'>
          <select
            name='from-filter'
            id='from-filter'
            value={filter}
            onChange={updateFilter}
          >
            <option value=''>From</option>
            <option value='from-earth'>Earth</option>
            <option value='from-jupiter'>Jupiter</option>
            <option value='from-mars'>Mars</option>
            <option value='from-mercury'>Mercury</option>
            <option value='from-neptune'>Neptune</option>
            <option value='from-saturn'>Saturn</option>
            <option value='from-uranus'>Uranus</option>
            <option value='from-venus'>Venus</option>
          </select>
        </div>
        <div className='from-to-container'>
          <select
            name='to-filter'
            id='to-filter'
            value={filter}
            onChange={updateFilter}
          >
            <option value=''>To</option>
            <option value='to-earth'>Earth</option>
            <option value='to-jupiter'>Jupiter</option>
            <option value='to-mars'>Mars</option>
            <option value='to-mercury'>Mercury</option>
            <option value='to-neptune'>Neptune</option>
            <option value='to-saturn'>Saturn</option>
            <option value='to-uranus'>Uranus</option>
            <option value='to-venus'>Venus</option>
          </select>
        </div>
      </div>
      <div className='filter-container'>
        <label htmlFor='filter'>Filter by:</label>
        <select
          name='filter'
          id='filter'
          className='filter-select'
          value={filter}
          onChange={updateFilter}
        >
          <option value='dist-lowest' onClick={updateFilter}>
            Distance (lowest)
          </option>
          <option value='dist-highest'>Distance (highest)</option>
          <option value='name-a'>Name (a-z)</option>
          <option value='name-z'>Name (z-a)</option>
        </select>
      </div>
    </FilterWrapper>
  );
};

export default Filter;
