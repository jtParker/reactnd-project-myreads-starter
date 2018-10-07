import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import CurrentBookShelf from './CurrentBookshelf'
import HaveReadShelf from './HaveReadShelf'
import WantToReadShelf from './WantToReadShelf'
import SearchBooks from './Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(books)
    })
  }

  selectShelf = (shelf, selectedBook) => {
    BooksAPI.update(selectedBook, shelf).then(
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(books)
    }))
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <CurrentBookShelf books={this.state.books} changeShelf={this.selectShelf}/>
            <WantToReadShelf books={this.state.books} changeShelf={this.selectShelf}/>
            <HaveReadShelf books={this.state.books} changeShelf={this.selectShelf}/>
          </div>
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
