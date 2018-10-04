import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './Bookshelf'
import SearchBooks from './Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  selectShelf = (shelf, selectedBook) => {
    BooksAPI.update(selectedBook, shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelf
          />
        )}/>
        <Route path="/search" render={({history}) => (
          <SearchBooks
            books={this.state.books}
            value={this.state.shelfValue}
            changeShelf={this.selectShelf}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
