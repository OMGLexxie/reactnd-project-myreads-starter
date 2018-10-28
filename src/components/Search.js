import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

class Search extends Component {
  state = {
    query: '',
    queryResults: []
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
              <li key={book.id} className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                  </div>
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={(e) => this.props.onChangeShelf(book, e.target.value)}>
                      <option value="move" disabled>Move to...</option>
                      <option value="none">None</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search;