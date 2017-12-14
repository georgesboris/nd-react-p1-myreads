import React from "react"
import BookShelf from "../BookShelf/BookShelf"

const Home = ({
  books,
  bookRatings,
  booksByShelf,
  shelves,
  searchPath,
  onUpdateShelf,
  onUpdateRating
}) => {
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
            bookRatings={bookRatings}
            shelves={shelves}
            onUpdateShelf={onUpdateShelf}
            onUpdateRating={onUpdateRating}
          />
        )
      })}
    </div>
  )
}

export default Home
