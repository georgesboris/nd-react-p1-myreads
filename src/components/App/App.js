/**
 * This component holds all the app's logic, requests and routes.
 * All it's child components are controlled by it and may be considered "dumb".
 *
 * The apparent complexity of the logic comes from the differences between the requests
 * return values - the data is normalized to a default format after each request.
 */

// styles
import "./App.css"
// react
import React, { Component } from "react"
// components
import Home from "../Home/Home"
import Search from "../Search/Search"
import NavButton from "../NavButton/NavButton"
import MainLayout from "../MainLayout/MainLayout"
import { BrowserRouter } from "react-router-dom"
import { Route } from "react-router"
// utils
import * as BooksAPI from "../../services/BooksAPI"
import debounce from "lodash/debounce"
import set from "lodash/fp/set"

const PATH_HOME = "/"
const PATH_SEARCH = "/search"

const LOCALSTORAGE_KEY = "@MyReads/ratings"

const shelves = [
  { id: "currentlyReading", title: "Currently Reading" },
  { id: "wantToRead", title: "Want To Read" },
  { id: "read", title: "Finished Reading" }
]

class App extends Component {
  /**
   * State handling
   */

  state = {
    books: {},
    bookRatings: {},
    booksByShelf: {},
    results: []
  }

  fetchUserBooks = () => {
    BooksAPI.getAll().then(data => {
      let books = {}
      let booksByShelf = {}

      data.forEach(book => {
        books[book.id] = BooksAPI.parseBook(book)
        if (book.shelf) {
          if (!booksByShelf[book.shelf]) booksByShelf[book.shelf] = [book.id]
          else booksByShelf[book.shelf].push(book.id)
        }
      })

      this.setState({ books, booksByShelf })
    })
  }

  fetchUserBookRatings = () => {
    const ratings = window.localStorage.getItem(LOCALSTORAGE_KEY)
    if (!ratings) {
      window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({}))
    } else {
      this.setState({ bookRatings: JSON.parse(ratings) })
    }
  }

  /**
   * The book update method needs to be really responsive,
   * so we make the changes locally before updating the server data.
   * If there's any error on the server update, we roll back the local changes.
   */

  _localUpdateShelf = (id, shelf, prevShelf) => {
    this.setState(state => {
      const books = set([id, "shelf"], shelf, state.books)
      const targetBooksByShelf = state.booksByShelf[shelf]
        ? state.booksByShelf[shelf].concat(id)
        : [id]
      const prevBooksByShelf = state.booksByShelf[prevShelf]
        ? state.booksByShelf[prevShelf].filter(_id => _id !== id)
        : []

      return {
        books,
        booksByShelf: {
          ...state.booksByShelf,
          [shelf]: targetBooksByShelf,
          [prevShelf]: prevBooksByShelf
        }
      }
    })
  }

  updateBookShelf = (id, shelf, prevShelf) => {
    // prevent updating unchanged shelfs
    if (shelf === prevShelf) {
      return
    }

    // optimistic state update
    this._localUpdateShelf(id, shelf, prevShelf)

    BooksAPI.update({ id }, shelf)
      .then(booksByShelf => {
        this.setState(state => ({
          booksByShelf,
          books: set([id, "shelf"], shelf, state.books)
        }))
      })
      .catch(err => {
        // roll back optimistic state update
        this._localUpdateShelf(id, prevShelf, shelf)
      })
  }

  updateBookRating = (id, rating) => {
    this.setState(state => ({
      bookRatings: {
        ...state.bookRatings,
        [id]: rating
      }
    }))

    window.localStorage.setItem(
      LOCALSTORAGE_KEY,
      JSON.stringify({
        ...this.state.bookRatings,
        [id]: rating
      })
    )
  }

  /**
   * When searching, books retrieved do not contain the shelf property.
   * We check the current state to not overwrite any of the user's books.
   */

  searchBooks = debounce(term => {
    BooksAPI.search(term, 100).then(res => {
      // api may return an object with an error when no books are found.
      if (!res || res.error) {
        this.clearSearchResults()
        return
      }

      let results = []
      let books = {}

      // `forEach` is used to make the side effects explicit.
      res.forEach(book => {
        results.push(book.id)
        if (!this.state.books[book.id])
          books[book.id] = BooksAPI.parseBook(book)
      })

      this.setState(state => ({
        results,
        books: {
          ...books,
          ...state.books
        }
      }))
    })
  }, 100)

  clearSearchResults = () => {
    this.setState({ results: [] })
  }

  /**
   * Setup
   */

  componentDidMount() {
    this.fetchUserBooks()
    this.fetchUserBookRatings()
  }

  /**
   * Rendering
   */

  render() {
    const { books, bookRatings, booksByShelf, results } = this.state
    return (
      <BrowserRouter>
        <MainLayout>
          <NavButton to={PATH_SEARCH} />

          <Home
            books={books}
            bookRatings={bookRatings}
            booksByShelf={booksByShelf}
            shelves={shelves}
            searchPath={PATH_SEARCH}
            onUpdateShelf={this.updateBookShelf}
            onUpdateRating={this.updateBookRating}
          />

          <Route
            exact
            path={PATH_SEARCH}
            render={() => (
              <Search
                books={books}
                bookRatings={bookRatings}
                shelves={shelves}
                results={results}
                homePath={PATH_HOME}
                onSearchBooks={this.searchBooks}
                onUpdateShelf={this.updateBookShelf}
                onUpdateRating={this.updateBookRating}
                onUnmount={this.clearSearchResults}
              />
            )}
          />
        </MainLayout>
      </BrowserRouter>
    )
  }
}

export default App
