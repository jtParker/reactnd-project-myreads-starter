import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'

class SearchBooks extends Component {

  state = {
    query: '',
    value: '',
    books: []
  }

// Get select value and pass it to the parent component to update
  handleChange = (book, e) => {
    const shelf = e.target.value
    const selectedBook = book
    console.log(shelf, e.target)
    this.props.changeShelf(shelf, selectedBook)
  }

  searchBooks = (query) => {
    let searchQuery = query.trim()
    BooksAPI.search(searchQuery).then((books) => {
      this.setState({ books })
    })
  }

  updateQuery = (query) => {
    
  }

  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
                    placeholder="Search by title or author"
                    onChange={(event) => this.searchBooks(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{
                      backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                    <div className="book-shelf-changer">
                      <select onChange={(e) => this.handleChange(book, e)} value={book.shelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.author}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
