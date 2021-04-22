import React from 'react';
import styled from 'styled-components';
import { VscListFilter } from 'react-icons/vsc';

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #5fa7c9;
  color: #fff;
  height: 38px;

  border-bottom: 1px solid #1a78ab;
  .filter-icon {
    font-size: 25px;
    color: #fff;
    margin-left: 15px;
  }
  .filter-select {
    margin-right: 15px;
    padding: 4px;
  }
`;

const Filter = () => {
  return (
    <FilterWrapper>
      <VscListFilter className='filter-icon' />
      <label htmlFor='filter'>
        <select name='filter' id='filter' className='filter-select'>
          <option value=''>Filter By</option>
        </select>
      </label>
    </FilterWrapper>
  );
};

export default Filter;
