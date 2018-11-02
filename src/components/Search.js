import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

import Book from './Book'

class Search extends Component {
  state = {
    query: '',
    queryResults: [],
    books: []
  }

  changeQuery = (query) => {
    this.setState({ query: query });
    this.updateSearch(query)
  }

  updateSearch = (query) => {
    BooksAPI.search(query).then(runQuery => {
      if (runQuery === undefined || runQuery.error) {
        this.setState({ queryResults: [] })
      } else {
        this.setState({ queryResults: runQuery })
      }
    })
  }

  render() {

    const { query, queryResults } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange = {(e) => this.changeQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <span className="search-count">
            Found {queryResults.length} results
          </span>

          <ol className="books-grid">
            {queryResults.map(book => (
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

export default Search;