import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'

import './App.css'
import BookCase from './components/BookCase'
import Search from './components/Search'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.shelveBooks();
  }

  shelveBooks = () => {
    BooksAPI.getAll().then(bookInfo => {
      this.setState({ books: bookInfo });
    });
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.shelveBooks();
    });
  }


  render() {
    return (
      <div className="app">
        <Route exact path='/'
          render = {() =>
            <BookCase
              shelvedBooks={this.state.books}
              onChangeShelf={this.changeShelf}
            />
          }
        />
        <Route exact path='/search'
          render = {() =>
            <Search
              books={this.state.books}
              onChangeShelf={this.changeShelf}
            />
          }
        />
      </div>
    )
  }
}

export default BooksApp
