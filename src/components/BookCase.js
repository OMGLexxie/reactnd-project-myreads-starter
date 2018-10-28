import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import BookShelf from './BookShelf'

class BookCase extends Component {
  state = {}

  render () {

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            key="currentlyReading"
            shelfName="Currently Reading"
            books={this.props.shelvedBooks.filter(book => book.shelf === 'currentlyReading')}
            onChangeShelf={this.props.onChangeShelf}
          />
          <BookShelf
            key="wantToRead"
            shelfName="Want To Read"
            books={this.props.shelvedBooks.filter(book => book.shelf === 'wantToRead')}
            onChangeShelf={this.props.onChangeShelf}
          />
          <BookShelf
            key="read"
            shelfName="Read"
            books={this.props.shelvedBooks.filter(book => book.shelf === 'read')}
            onChangeShelf={this.props.onChangeShelf}
          />
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookCase;

