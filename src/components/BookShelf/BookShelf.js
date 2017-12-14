// react
import React from 'react'
import BooksList from '../BooksList/BooksList'
// styles
import styled from 'styled-components'

const Wrapper = styled.section``

const Header = styled.h1`
  padding: 1rem 2rem;
  border-bottom: 1px solid #dadada;
  color: #ef5e3f;
`

const InnerWrapper = styled.section`
  min-height: 8rem;
  padding: 0 1rem;
  background-color: #f0f0f0;
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
`

const BookShelf = ({ title, books, shelves, onUpdateShelf }) => (
  <Wrapper>
    <Header>{title}</Header>
    <InnerWrapper>
      <BooksList
        books={books}
        shelves={shelves}
        onUpdateShelf={onUpdateShelf}
      />
    </InnerWrapper>
  </Wrapper>
)

export default BookShelf
