import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HaveReadShelf extends Component {

  handleChange = (book, e) => {
    const shelf = e.target.value
    const selectedBook = book
    console.log(shelf, e.target)
    this.props.changeShelf(shelf, selectedBook)
  }

  render() {


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
                        <select>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{read.title}</div>
                    <div className="book-authors">{read.author}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )
   }
}

export default HaveReadShelf
