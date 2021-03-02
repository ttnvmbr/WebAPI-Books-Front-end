import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { App } from "./App";


export class Book extends React.Component {
  constructor() {
    super()
    console.log("constructor Book")
    this.state = {deleted: false, book: [], edit: false, title: "", body: "", author: ""}
  }

  componentDidMount() {
    console.log("DidMount Book")
    
  }

  componentDidUpdate() {
    console.log("DidUpdate Book")
  }

  componentWillUnmount() {
    console.log("WillUnmount Book")
  }

  deleteBook(uri) {
    console.log("Delete " + uri)
    fetch(uri, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then((response) => this.setState({deleted: true}))
      .catch((error) => console.log(error))
  }

  render() {
    console.log("render Book")
    let bookItem = ""
    if (!this.state.deleted){
        bookItem = 
        <div>
          <table className="table table-dark">
            <tbody>
              <tr>
                <td>
                  
                <h4>{this.props.book.title}</h4>
                <div className="d-flex justify-content-end">
                <Link className="btn btn-orange" to={{pathname: `/edit/${this.props.book._id}`, state: { id: this.props.book._id}}}>Edit</Link>
                <div className="mx-2">
                <Link className="btn btn-orange" to={{pathname: `/show/${this.props.book._id}`, state: { id: this.props.book._id}}}>Show</Link>
                </div>
                    
                    
                <Button variant="orange" onClick={() =>this.deleteBook(this.props.book._links.self.href)}>Delete</Button>
                </div>
            
                </td>
              </tr>
              </tbody>
          </table>
        </div>
    }
    return (
      <div>
          {bookItem}
      </div>
    );
  }
} 
