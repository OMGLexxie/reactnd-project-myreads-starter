import React, { Component } from 'react'

class Book extends Component {
  state = {
    shelf: this.props.book.shelf || 'none'
  }

  returnShelf(book, books) {
    if(books.filter(b => book.id === b.id).length !== 0) {
      return books.filter(t => t.id === book.id)[0].shelf;
    } else {
      return 'none'
    }
  }

  render () {

    const authors = this.props.book.authors && this.props.book.authors.join(' | ');
    let imgUrl = (this.props.book.imageLinks && `url(${this.props.book.imageLinks.thumbnail})`);

    return (
      <li key={this.props.book.id} className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: imgUrl }}>
          </div>
          <div className="book-shelf-changer">
            <select
              defaultValue={this.returnShelf(this.props.book,this.props.books)}
              onChange={(e) => this.props.onChangeShelf(this.props.book, e.target.value)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{authors}</div>
      </li>
    )
  }
}

export default Book;