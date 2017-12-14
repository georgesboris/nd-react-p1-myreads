// react
import React from "react"
import BooksList from "../BooksList/BooksList"
// styles
import styled from "styled-components"

const Wrapper = styled.section``

const Header = styled.h1`
  position: relative;
  padding: 1rem 2rem;
  background-color: #ef5e3f;
  box-shadow: 0 0.1rem 0.8rem rgba(50, 0, 0, 0.3);
  font-weight: 300;
  letter-spacing: 0.03rem;
  color: white;
`

const InnerWrapper = styled.section`
  min-height: 8rem;
  padding: 0 1rem;
`

const BookShelf = ({
  title,
  books,
  bookRatings,
  shelves,
  onUpdateShelf,
  onUpdateRating
}) => (
  <Wrapper>
    <Header>{title}</Header>
    <InnerWrapper>
      <BooksList
        books={books}
        bookRatings={bookRatings}
        shelves={shelves}
        onUpdateShelf={onUpdateShelf}
        onUpdateRating={onUpdateRating}
      />
    </InnerWrapper>
  </Wrapper>
)

export default BookShelf
