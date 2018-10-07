import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HaveReadShelf extends Component {


// Get select value and pass it to the parent component to update
  handleChange = (book, e) => {
    const shelf = e.target.value
    const selectedBook = book
    this.props.changeShelf(shelf, selectedBook)
  }

  render() {
    const { books } = this.props
    let haveRead = books.filter(book => book.shelf === 'read')

    return (

        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {haveRead.map((read) => (
                <li key={read.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{backgroundImage: `url(${read.imageLinks.thumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        <select onChange={(e) => this.handleChange(read, e)} value={read.shelf}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{read.title}</div>
                    <div className="book-authors">{read.authors}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      )
   }
}

export default HaveReadShelf
