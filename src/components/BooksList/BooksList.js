// react
import React from "react"
// styles
import styled from "styled-components"

const Wrapper = styled.div``

const WrapperBook = styled.article`
  display: flex;
  align-items: center;
  padding: 1rem;
  & + & {
    border-top: 1px solid #dadada;
  }
`

const WrapperCover = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 7rem;
  padding-right: 1rem;
`

const WrapperDescription = styled.div`
  flex-grow: 1;
  padding-right: 1rem;
`

const DescriptionDate = styled.time`
  font-size: 0.75rem;
  color: #999;
`

const DescriptionTitle = styled.h1`
  font-size: 1.2rem;
  line-height: 1.4rem;
  color: #444;
`

const DescriptionAuthors = styled.h2`
  font-size: 0.8rem;
  font-weight: normal;
  color: #999;
`

const WrapperControls = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const Cover = styled.div`
  width: 6rem;
  height: 9rem;
  padding: 0.5rem;
  background-color: #222;
  background-image: ${props => (props.url ? `url(${props.url})` : "none")};
  background-size: cover;
  box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.4);
  border-radius: 0.1rem;
  font-weight: 700;
  color: white;
`

const ControlButton = styled.button`
  text-transform: uppercase;
  letter-spacing: 0.03rem;
  text-align: right;
  border: none;
  box-shadow: none;
  background: none;
  cursor: pointer;
  opacity: 0.4;
  &:hover {
    opacity: 1;
    transition: opacity 0.4s;
  }
  &:focus {
    outline: none;
  }
  &[disabled] {
    opacity: 1;
    color: #ef5e3f;
    font-weight: bold;
    cursor: default;
  }
`

const BooksList = ({ books, shelves, onUpdateShelf }) => (
  <Wrapper>
    {books.map(book => (
      <WrapperBook key={book.id}>
        <WrapperCover>
          <Cover url={book.cover}>{book.cover ? "" : book.title}</Cover>
        </WrapperCover>
        <WrapperDescription>
          <DescriptionDate>{book.date.getFullYear()}</DescriptionDate>
          <DescriptionTitle>{book.title}</DescriptionTitle>
          <DescriptionAuthors>{book.authors}</DescriptionAuthors>
        </WrapperDescription>
        <WrapperControls>
          {shelves.map(({ id, title }) => (
            <ControlButton
              key={id}
              disabled={book.shelf === id}
              onClick={() =>
                onUpdateShelf && onUpdateShelf(book.id, id, book.shelf)
              }
            >
              {title}
            </ControlButton>
          ))}
          <ControlButton
            onClick={() =>
              onUpdateShelf && onUpdateShelf(book.id, "none", book.shelf)
            }
          >
            None
          </ControlButton>
        </WrapperControls>
      </WrapperBook>
    ))}
  </Wrapper>
)

export default BooksList
