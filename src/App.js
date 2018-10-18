import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import * as BookUtils from './BookUtils'

import './App.css'
import BookCase from './components/BookCase'
import Search from './components/Search'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false
  }

  componentDidMount = () => {
    if (this.state.newBook) {
      this.refreshAllBooks();
    }
  }

  refreshAllBooks = () => {
    BooksAPI.getAll().then((list) => {
      this.setState({
        books: BookUtils.sortAllBooks(list),
        newBook: false
      });
    });
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      let newList = this.state.books.slice(0);
      const books = newList.filter(listBook => listBook.id === book.id);
      if (books.length) {
        books[0].shelf = shelf;
      } else {
        newList.push(book);
        newList = BookUtils.sortAllBooks(newList);
      }
      this.setState({books: newList});
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/'
          render = {(() => (<BookCase
          books={this.state.books}
          onRefreshAllBooks={this.refreshAllBooks}
          onChangeShelf={this.changeShelf} />))}/>
        <Route exact path='/search'
          render = {(() => (<Search
          selectedBooks={this.state.books}
          onChangeShelf={this.changeShelf} />))}/>
      </div>
    )
  }
}

export default BooksApp
