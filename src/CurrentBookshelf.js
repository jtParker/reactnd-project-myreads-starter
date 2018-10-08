import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CurrentBookShelf extends Component {

// Get select value and pass it to the parent component to update
  handleChange = (book, e) => {
    const shelf = e.target.value
    const selectedBook = book
    this.props.changeShelf(shelf, selectedBook)
  }

  render() {
    const { books } = this.props
    let currentBooks = books.filter(book => book.shelf === 'currentlyReading')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentBooks.map((current) => (
                    <li key={current.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{backgroundImage: `url(${current.imageLinks.thumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            <select onChange={(e) => this.handleChange(current, e)} value={current.shelf}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{current.title}</div>
                        <div className="book-authors">{current.authors}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default CurrentBookShelf
