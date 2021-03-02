import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import {Book} from "./Book"
import {CreateBook} from "./CreateBook"
import {EditBook} from "./EditBook"
import {ShowBook} from "./ShowBook"

const uri = "http://145.24.222.223:8000/api/books/"

export class App extends React.Component {
  constructor() {
    super()
    console.log("constructor")
    this.state = {books: {items:[], item: {}, title: "", author: "", body: ""}}
  }
  
  loadCollection() {
    fetch(uri, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => { console.log(data); this.setState({books: data})})
    .catch((error) => console.log(error))
  }

  componentDidMount() {
    console.log("DidMount")
    this.loadCollection();
  }

  componentDidUpdate() {
    console.log("DidUpdate", this.state)
  }

  componentWillUnmount() {
    console.log("WillUnmount")
  }

  render() {
    console.log("render")
    let books = this.state.books.items.map((book, i) =>
    <Book key={i} book={book}/>
    )

    return (
      <Router>
          <Switch>
            <Route exact path="/">
            <div className="container">
              <h1>Bookcollection</h1>
              <p>Manage the bookcollection here. Every book has an author, a title and a small description.</p>
              <div>
              <table className="table table-dark">
                <thead>
                    <tr>
                      <th colSpan="2">
                        <div className="d-flex justify-content-between">
                          <div className="align-self-center">
                            <h2 className="orangeText">List of books:</h2>
                          </div>
                          <div className="align-self-center">
                              <Link className="btn btn-orange" to={"/create"}>Create a new book</Link>
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                </table>
               {books}
              </div>
            </div>
            </Route>
            <Route path="/create" render={(props) => (<CreateBook {...props}/>)}></Route>
            <Route path="/edit/:id" render={(props) => (<EditBook {...props}/>)}></Route>
            <Route path="/show/:id" render={(props) => (<ShowBook {...props}/>)}></Route>
          </Switch>
      </Router>
    );
  }
}
