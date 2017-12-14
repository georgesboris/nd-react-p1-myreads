import React from "react"
import styled from "styled-components"
import { Link, withRouter } from "react-router-dom"
import FaSearch from "react-icons/lib/fa/search"

const NavLink = styled(Link)`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  padding: 0.5rem;
  color: white;
  text-decoration: none;
  &:hover {
    opacity: 0.8;
  }
`

const NavLinkLabel = styled.span`
  padding-right: 0.5rem;
  font-size: 0.8rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`

const NavLinkIcon = styled.span`
  font-size: 1.2rem;
`

const NavButton = ({ to }) => (
  <NavLink to={to}>
    <NavLinkLabel>Search</NavLinkLabel>
    <NavLinkIcon>
      <FaSearch />
    </NavLinkIcon>
  </NavLink>
)

export default withRouter(NavButton)
