import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import './style.css'

const uri =  "http://145.24.222.223:8000/api/books/"
let str = window.location.href
const id = str.slice(27)

export class EditBook extends React.Component {
  constructor(props) {
    super(props)
    console.log("constructor  Edit Book")
    console.log(uri + "komtie " +id)
    this.state = {book:[],title: "", body: "", author: "", id: this.props.match.params.id}
  }

  componentDidMount() {
    console.log("DidMount Edit Book")
    console.log("id" + this.state.book)
    this.loadItem()
   
    
  }

  componentDidUpdate() {
    console.log("DidUpdate Edit Book")
  }

  componentWillUnmount() {
    console.log("WillUnmount Edit Book")
  }

  handleOnChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleOnSubmit(event){

    event.preventDefault()
    fetch(uri+this.state.id, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify(this.state)
  }).then(response => {
    console.log(response.body)
    this.props.history.push('/')
    window.location.reload()
  })
  }

  loadItem() {
   fetch(uri+this.state.id, {
     method: 'GET',
     mode: 'cors',
     cache: 'no-cache',
     headers: {
         'Content-Type': 'application/json',
       'Accept': 'application/json'
     },
   }).then((response => response.json()))
   .then((data) => { console.log(data); this.setState({book:data, title: data.title, body: data.body, author: data.author})})
   .catch((error) => console.log(error));
 }

  render() {
    return (
        <div className="container">
            <h1>Edit book: {this.state.book.title}</h1>
            <form onSubmit={(event) => this.handleOnSubmit(event)}>
                <div className="mt-2">
                    <h3 className="form-label orangeText">Title</h3>
                    <input className="form-control" type="text" name="title" defaultValue={this.state.book.title}  onChange={(event) => this.handleOnChange(event)}/>
                </div>
                <div className="mt-2">
                    <h3 className="form-label orangeText">Author</h3>
                    <input className="form-control" type="text" name="author" defaultValue={this.state.book.author} onChange={(event) => this.handleOnChange(event)}/>
                </div>
                <div className="mt-2">
                    <h3 className="form-label orangeText">description</h3>
                    <textarea className="form-control" name="body" defaultValue={this.state.book.body} onChange={(event) => this.handleOnChange(event)}/>
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <Button variant="orange" onClick={() => this.props.history.push('/')}>Back</Button>
                    <Button variant="orange" type="submit">Save changes</Button>
                </div>
            </form>
            </div>
      );
    }
}
