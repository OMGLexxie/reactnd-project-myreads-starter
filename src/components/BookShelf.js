import React, { Component } from 'react'

import Book from './Book'

class BookShelf extends Component {
  state = {}

  render () {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <Book
                key={book.id}
                book={book}
                books={this.props.books}
                onChangeShelf={this.props.onChangeShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;