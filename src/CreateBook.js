import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import './style.css'

const uri = "http://145.24.222.223:8000/api/books/"

export class CreateBook extends React.Component {
  constructor() {
    super()
    console.log("constructor  Create Book")
    this.state = {book: [], title: "", body: "", author: ""}
  }

  componentDidMount() {
    console.log("DidMount Create Book")
  }

  componentDidUpdate() {
    console.log("DidUpdate Create Book")
  }

  componentWillUnmount() {
    console.log("WillUnmount Create Book")
  }

  handleOnChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleOnSubmit(event){
    event.preventDefault()
    console.log(this.state)

    fetch(uri, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify(this.state)
  }).then(response => {
    console.log(response)
    this.props.history.push('/')
    window.location.reload()
  })
  }

  render() {
    return (
        <div className="container">
            <h1>Create a new book</h1>
            <form onSubmit={(event) => this.handleOnSubmit(event)}>
                <div className="mt-2">
                    <h3 className="form-label orangeText">Title</h3>
                    <input className="form-control" type="text" name="title" value={this.state.title} onChange={(event) => this.handleOnChange(event)} />
                </div>
                <div className="mt-2">
                    <h3 className="form-label orangeText">Author</h3>
                    <input className="form-control" type="text" name="author" value={this.state.author} onChange={(event) => this.handleOnChange(event)}/>
                </div>
                <div className="mt-2">
                    <h3 className="form-label orangeText">description</h3>
                    <textarea className="form-control" name="body" value={this.state.body} onChange={(event) => this.handleOnChange(event)}/>
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <Button variant="orange" onClick={() => this.props.history.push('/')}>Back</Button>
                    <Button variant="orange" type="submit">Save book</Button>
                </div>
            </form>
            </div>
      );
    }
}
