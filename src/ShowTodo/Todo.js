import React, { Component } from "react";
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import "./Todo.css"


class Todo extends Component {
  render() {
    console.log(this.props)
    return (
      <Row className="todo">
        <div className="backdrop"></div>
        <div className="content">
          <h2 className="title">TASK DESCRIPTION</h2>
          <div className="Todo card-body">
            <div className="Todo-title card-title">
              <p>Task name: {this.props.content.title}</p>
            </div>
            <div className="Todo-description card-text">
              Task description: <br/>
              {this.props.content.description}
            </div>
            <div className="Todo-description card-text">
              Task's state: <br/>
              {this.props.content.state === 1 ? 'Completed' : 'Incompleted'}
            </div>
            <div className="Todo-date card-date">{this.props.content.date}</div>
          </div>
          <Button onClick={this.props.close}>
            Close
          </Button>
        </div>
      </Row>
    )
  }
}

export default Todo;
