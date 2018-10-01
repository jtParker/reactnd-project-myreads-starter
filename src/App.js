import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './Bookshelf'
import SearchBooks from './Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfValue: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(this.state.books)
    })
  }

  selectShelf = (value) => {
    console.log('value:' + value)
    this.setState({shelfValue: value})
    console.log(this.state.shelfValue)
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
            changeShelf={(value) => {
              this.selectShelf(value)
              history.push('/')
            }}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
