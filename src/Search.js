import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'

class SearchBooks extends Component {

  state = {
    query: '',
    value: ''
  }

  handleChange = (e) => {
    const values = e.target
    console.log('Search value: ' + this.state.value)
    this.props.changeShelf(values)
  }

  updateQuery = (query) => {
  this.setState({ query: query.trim() })
  }

  render() {

    const { books } = this.props
    const { query } = this.state

    let queryList

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      queryList = books.filter((book) => match.test(book.title))
    } else {
      queryList = books
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {queryList.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{
                      backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                    <div className="book-shelf-changer">
                      <select onChange={this.handleChange} value={this.state.value}>
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
