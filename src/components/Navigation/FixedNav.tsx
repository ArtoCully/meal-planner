import React from 'react';
import styled from 'styled-components';
import { CalendarIcon, AddIcon, FilterListIcon } from 'evergreen-ui';
import { NavLink } from 'react-router-dom';
import './FixedNav.css';

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    margin-bottom: 10px;
  }
`;

export default function FixedNav() {
  return (
    <nav className="App-fixed-nav">
      <ul>
        <li>
          <StyledNavLink to="/menu/weekly" activeClassName="active">
            <CalendarIcon size={15} />
            weekly menu
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/recipes/add" activeClassName="active">
            <AddIcon size={15} />
            add receipe
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/recipes/list" activeClassName="active">
            <FilterListIcon size={15} />
            recipes
          </StyledNavLink>
        </li>
      </ul>
    </nav>
  )
}
