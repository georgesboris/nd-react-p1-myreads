import React from "react"
import styled from "styled-components"

const OuterWrapper = styled.div`
  padding: 2rem;
  background: #ff7e5f;
  background: linear-gradient(to right, #feb47b, #ff7e5f);
`

const Header = styled.h1`
  padding-bottom: 2rem;
  color: #ef5e3f;
  font-size: 2rem;
  font-weight: 300;
  text-align: center;
  line-height: 2rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
`

const InnerWrapper = styled.div`
  background-color: white;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;
`

const MainLayout = ({ children }) => (
  <OuterWrapper>
    <Header>My Reads</Header>
    <InnerWrapper>{children}</InnerWrapper>
  </OuterWrapper>
)

export default MainLayout
