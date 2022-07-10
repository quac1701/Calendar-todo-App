import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddTodoForm.css"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      startDate: new Date()
    };

    this.myRefs = React.createRef()
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  onSubmit(event) {
    event.preventDefault();
    console.log(this.refs);
    let newItemTitle = this.refs.itemTitle.value;
    let newItemDes = this.refs.itemDescripton.value;
    if(newItemTitle && newItemDes) {
      let item = {
        title: newItemTitle,
        description: newItemDes,
        date: this.state.startDate.toISOString().split("T")[0],
        state: -1
      }
      this.props.addItem(item);
      this.refs.form.reset();
    }
  }
  render () {
    return (
    <Form ref="form" onSubmit={this.onSubmit} className="ToDoItem">
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Your work's Title</Form.Label>
        <Form.Control type="text" placeholder="Enter your work's Title"  ref="itemTitle" />
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Your work's Description</Form.Label>
        <Form.Control as="textarea" rows="3" ref="itemDescripton"/>
      </Form.Group>

      <Form.Group>
        <Form.Label >Due date:</Form.Label>
        <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    );   
  }
}

export default AddTodo;