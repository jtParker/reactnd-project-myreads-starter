import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

  state = {
    query: '',
    value: '',
    books: []
  }

  changeBackgroundImage = (book) => {
    let bookCover = book.hasOwnProperty('imageLinks')
    if(!bookCover) {
      book.imageLinks = []
      book.imageLinks.thumbnail = 'https://via.placeholder.com/150x200?text=no+image+available'
    }
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
    if (searchQuery === ''){
      this.setState({ books: []})
      return
    } else {
      BooksAPI.search(searchQuery).then((books) => {
        if (!books.length) {
          this.setState({ books: []})
          return
        } else {
          books.forEach(book => this.changeBackgroundImage(book))
          this.setState({ books })
        }
      })
    }
  }

  render() {
    let bookCover

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
                  <div className="book-authors">{book.authors}</div>
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
