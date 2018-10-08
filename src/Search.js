import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import {DebounceInput} from 'react-debounce-input'

class SearchBooks extends Component {

  state = {
    query: '',
    value: '',
    books: [],
    shelvedBooks: this.props.books
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.books !== nextProps.books) {
      this.setState({shelvedBooks: nextProps.books})
      debugger
      this.setBookShelfState(this.state.books, this.state.shelvedBooks)
    }
  }

// Check for imageLinks property. If absent add the property with a placeholder image
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
    this.props.changeShelf(shelf, selectedBook)
  }

// Compare searched books to shelved books. If book is on shelf set the appropriate shelf value
  setBookShelfState = (searched, shelved) => {
    for (var i = 0; i < searched.length; i++) {
      for (var j = 0; j < shelved.length; j++) {
        if (shelved[j].title === searched[i].title) {
          searched[i].shelf = shelved[j].shelf
        } else {
          searched[i].shelf = 'none'
        }
      }
    }
  }

// Send query to search API
  searchBooks = (query) => {
    if (query === ''){
      this.setState({ books: []})
      return
    } else {
      BooksAPI.search(query).then((books) => {
        if (!books.length) {
          this.setState({ books: []})
          return
        } else {
          books.forEach(book => this.changeBackgroundImage(book))
          this.setBookShelfState(books, this.state.shelvedBooks)
          this.setState({ books })
        }
      })
    }
  }

  render() {

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
                    minLength={1}
                    debounceTimeout={300}
                    type="text"
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
