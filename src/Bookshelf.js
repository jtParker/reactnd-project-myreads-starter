import React, { Component } from 'react'

class BookShelf extends Component {

  state = {
    optionSelect: 'select',
    booksRead: [],
    currentlyReading: [],
    wantToRead: []
  }

  changeShelf = (event) => {

  }

  render() {
    const books = this.props

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
                  {this.state.currentlyReading.map((current) => (
                    <li>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{backgroundImage: `url(${current.image})` }}></div>
                          <div className="book-shelf-changer">
                            <select onChange={this.changeShelf} value={this.state.value}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{current.title}</div>
                        <div className="book-authors">{current.author}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.wantToRead.map((toRead) => (
                    <li>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{backgroundImage: `url(${toRead.image})` }}></div>
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
                        <div className="book-title">{toRead.title}</div>
                        <div className="book-authors">{toRead.author}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.booksRead.map((read) => (
                    <li>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{backgroundImage: `url(${read.image})` }}></div>
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
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default BookShelf
