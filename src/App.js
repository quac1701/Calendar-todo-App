import React, { Component } from "react";
import "./App.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import AddTodo from "./AddTodo/AddTodo.js";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ChangeStateModal from "./ChangeStateModal/ChangeStateModal";
import Todo from "./ShowTodo/Todo";


import TodoComplete from "./TodoList/TodoComplete.js";
import TodoIncomplete from "./TodoList/TodoIncomplete.js";
import ReactModal from "react-modal";

var arrListYes = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [
        {
          title: "Play baseball",
          description: "Go to park to play baseball with friends",
          date: "2022-07-010",
          state: 1,
        },
        {
          title: "learn japanese",
          description: "kaiwa n2",
          date: "2022-07-20",
          state: -1,
        },
        {
          title: "create 1 more react project",
          description: "create and deploy react redux mongoDB app",
          date: "2022-07-12",
          state: 0,
        },
      ],
      listYesterday: [],
      isModal: false,
      isCalendar: true,
      isToDoList: false,
      isAddToDo: false,
      isTodo: false,
    };

    this.focusEvent = {};
    this.renderToDoList = this.renderToDoList.bind(this);
    this.renderAddToDo = this.renderAddToDo.bind(this);
  }

  componentDidMount() {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    this.state.toDoList.map((item, i) => {
      if (item.date === date.toISOString().split("T")[0] && item.state === -1)
        arrListYes.push(item);
    });
    if (arrListYes.length > 0)
      this.setState({
        isModal: true,
        listYesterday: arrListYes,
      });
  }

  handlerChangedState = (array) => {
    let arr3 = this.state.toDoList.map((item, i) =>
      Object.assign({}, item, array[i])
    );
    this.setState({ isCalendar: true, toDoList: arr3, isModal: false });
  };

  renderToDoList() {
    this.setState({
      isToDoList: true,
    });
  }

  renderCalendar = () => {
    this.setState({
      isToDoList: false,
    });
  };

  deleteTodo = (index) => {
    let newlist = this.state.toDoList;
    console.log(
      newlist.slice(0, index).concat(newlist.slice(index + 1, newlist.length))
    );
    this.setState({
      toDoList: newlist
        .slice(0, index)
        .concat(newlist.slice(index + 1, newlist.length)),
    });
  };

  renderAddToDo() {
    this.setState({
      isToDoList: false,
      isAddToDo: true,
    });
  }

  handlerAddItemToList = (item) => {
    this.setState((prevState) => ({
      isAddToDo: false,
      toDoList: prevState.toDoList.concat(item),
    }));
  };

  handleClickEvent = (info) => {
    this.focusEvent = this.state.toDoList.find(
      (x) => x.title === info.event.title
    );
    this.setState({ isTodo: true });
  };

  closeTodo = () => {
    this.focusEvent = {};
    this.setState({ isTodo: false });
  };

  render() {
    return (
      <div className="App">
        <Container>
          <Row className="Calendar justify-content-md-center">
            <FullCalendar
              defaultView="dayGridMonth"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              header={{
                left: "prev,next today ",
                center: "title ",
                right: "dayGridMonth",
              }}
              events={this.state.toDoList}
              eventClick={(info) => {
                this.handleClickEvent(info);
              }}
            />
            <Button variant="primary" onClick={this.renderToDoList}>
              List of Works
            </Button>
            <Button variant="primary" onClick={this.renderAddToDo}>
              Add Work
            </Button>
          </Row>

          <ReactModal
            isOpen={this.state.isTodo}
            className="toDo"
            overlayClassName="overlay"
          >
            <Todo content={this.focusEvent} close={this.closeTodo} />
          </ReactModal>

          <ReactModal
            isOpen={this.state.isToDoList}
            className="todoList"
            overlayClassName="overlay"
          >
            <Row className="ListItem justify-content-md-center">
              <Col sm={12} className="title">
                <h1>To Do List</h1>
              </Col>
              <TodoComplete
                list={this.state.toDoList}
                delete={this.deleteTodo}
              />
              <TodoIncomplete
                list={this.state.toDoList}
                delete={this.deleteTodo}
              />
              <Col sm={1}></Col>

              <Button variant="primary" onClick={this.renderAddToDo}>
                Create new Work
              </Button>
              <Button
                className="justify-content-md-center"
                variant="primary"
                onClick={this.renderCalendar}
              >
                Back to Calendar
              </Button>
            </Row>
          </ReactModal>

          <ReactModal
            isOpen={this.state.isAddToDo}
            className="addTodo"
            overlayClassName="addTodo_overlay"
            shouldCloseOnOverlayClick={true}
          >
            <div className="addTodo-content">
              <span
                class="close"
                onClick={() =>
                  this.setState({ isToDoList: false, isAddToDo: false })
                }
              >
                &times;
              </span>
              <AddTodo addItem={this.handlerAddItemToList} />
            </div>
          </ReactModal>
          <ChangeStateModal
            content={{
              className: "change-state-modal",
              title: "Check your work yesterday",
              message: "You completed your work?",
            }}
            toDoList={this.state.listYesterday}
            modalIsOpen={this.state.isModal}
            handlerChangedState={this.handlerChangedState}
          />
        </Container>
      </div>
    );
  }
}

export default App;
