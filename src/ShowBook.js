import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const uri =  "http://145.24.222.223:8000/api/books/"
let str = window.location.href
const id = str.slice(27)

export class ShowBook extends React.Component {
    constructor(props) {
      super(props)
      console.log("constructor show Book")
      console.log(uri + "komtie " +id)
      this.state = {book: [], title: "", body: "", author: "", id: this.props.match.params.id}
    }
  
    componentDidMount() {
      console.log("DidMount show Book")
      this.loadShowItem()
    }
  
    componentDidUpdate() {
      console.log("DidUpdate show Book")
    }
  
    componentWillUnmount() {
      console.log("WillUnmount Book")
    }
    
    loadShowItem() {
   
        fetch(uri+this.state.id, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
              'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        }).then((response => response.json()))
        .then((data) => { console.log(data); this.setState({book: data})})
        .catch((error) => console.log(error));
      }
  

    render() {
      return (
        <div className="container">
        <div className="my-2">
                 <h1 className="orangeText"> {this.state.book.title}</h1>
                  <p><b className="orangeText">Author:</b> {this.state.book.author}</p>
                  <p><b className="orangeText">Description:</b> {this.state.book.body}</p>
           </div>
           <div className="d-flex justify-content-end mt-2">
                    <Button variant="orange" onClick={() => this.props.history.push('/')}>Back</Button>
                </div>
        </div>
      );
    }
  }