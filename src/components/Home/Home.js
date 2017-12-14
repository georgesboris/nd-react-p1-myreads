import React from "react"
import { Link } from "react-router-dom"
import BookShelf from "../BookShelf/BookShelf"

const Home = ({ books, booksByShelf, shelves, searchPath, onUpdateShelf }) => {
  return (
    <div>
      {shelves.map(shelf => {
        const shelfBooks = booksByShelf[shelf.id]
          ? booksByShelf[shelf.id].map(id => books[id])
          : []
        return (
          <BookShelf
            key={shelf.id}
            title={shelf.title}
            books={shelfBooks}
            shelves={shelves}
            onUpdateShelf={onUpdateShelf}
          />
        )
      })}
    </div>
  )
}

export default Home
