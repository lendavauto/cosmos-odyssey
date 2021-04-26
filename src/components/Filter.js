import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import { AiOutlineClear } from 'react-icons/ai';

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #5fa7c9;
  color: #fff;
  height: 38px;
  border-bottom: 1px solid #1a78ab;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    height: 65px;
  }
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
    button {
      display: flex;
      align-items: center;
      height: 24px;
      padding: 2px;
      border: none;
      border-radius: 5px;
      transition: 0.2s ease-in;
      margin-right: 15px;
      cursor: pointer;
      p {
        font-size: 12px;
      }
      .icon {
        font-size: 15px;
        margin-left: 5px;
        color: #082b44;
      }
      :hover {
        background-color: #aad7e3;
        border: 1px solid #222;
      }
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
      margin-bottom: 4px;
    label {
      font-size: 12px;
      margin-right: 15px;
      font-weight: bold;
    }
    select {
      @media (max-width: 900px) {
        margin-left: 20px;
      }
    }
    @media (max-width: 900px) {
      margin-left: 15px;
    }
  }
`;

const Filter = () => {
  const [{ filter }, dispatch] = useStateValue();

  const updateFilter = (e) => {
    const value = e.target.value;
    dispatch({ type: 'UPDATE_FILTER', payload: value });
  };

  const clearFilter = () => {
    dispatch({
      type: 'CLEAR_FILTER',
    });
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
        <button onClick={clearFilter}>
          {' '}
          <p>Clear filters:</p>
          <AiOutlineClear className='icon' />
        </button>
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
