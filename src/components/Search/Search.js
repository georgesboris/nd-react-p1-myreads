import React, { Component } from "react"
import { Link } from "react-router-dom"
import BooksList from "../BooksList/BooksList"
import styled from "styled-components"

const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
`

const BackgroundLink = styled(Link)`
  position: fixed;
  z-index: 105;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const InnerWrapper = styled.article`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 110;
  top: 0;
  right: 0;
  bottom: 0;
  width: 32rem;
  max-width: 80%;
  background-color: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
`

const CloseLink = styled(Link)`
  position: fixed;
  top: 0.5rem;
  right: 33.2rem;
  font-size: 1.4rem;
  text-decoration: none;
  color: white;
  &:hover {
    color: white;
  }
`

const InputWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  position: relative;
  z-index: 10;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid #dadada;
`

const SearchField = styled.input`
  padding: 1rem;
  border: none;
  box-shadow: none;
  font-size: 0.9rem;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`

const ListWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  background-color: #f5f5f5;
`

const SearchTip = styled.p`
  padding: 1rem;
  font-size: 0.9rem;
  line-height: 1.4rem;
  color: #999;
  strong {
    font-weight: bold;
  }
`

class Search extends Component {
  state = { input: "" }

  componentWillUnmount() {
    this.props.onUnmount && this.props.onUnmount()
  }

  updateInput = e => {
    this.setState({ input: e.target.value })
    this.props.onSearchBooks(e.target.value)
  }

  render() {
    const { input } = this.state
    const { books, shelves, results, homePath, onUpdateShelf } = this.props

    return (
      <Wrapper>
        <BackgroundLink to={homePath} />
        <InnerWrapper onClick={e => e.stopPropagation}>
          <CloseLink to={homePath}>&times;</CloseLink>

          <InputWrapper>
            <SearchField
              type="text"
              placeholder="Search by title or author"
              value={input}
              onChange={this.updateInput}
            />
          </InputWrapper>
          <ListWrapper>
            {results.length ? (
              <BooksList
                books={results.map(id => books[id])}
                shelves={shelves}
                onUpdateShelf={onUpdateShelf}
              />
            ) : input.length ? (
              <SearchTip>
                Looking for books related to <strong>{input}</strong>…
              </SearchTip>
            ) : (
              <SearchTip>
                Search our library for books regarding modern front-end
                development!
              </SearchTip>
            )}
          </ListWrapper>
        </InnerWrapper>
      </Wrapper>
    )
  }
}

export default Search
