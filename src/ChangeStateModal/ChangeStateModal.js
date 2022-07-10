import React, { Component } from "react";
import Modal from "react-modal";
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Modal.css";
var arr = [];

class ChangeStateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true,
      isCompleted: this.props.toDoList,
    };

    this.handlerCompletedWork = this.handlerCompletedWork.bind(this);
    this.renderListTodo = this.renderListTodo.bind(this);
  }

  handlerCompletedWork(index, state) {
    console.log(state);
    arr.map((item, i) => {
      if (i === index) {
        if (state === 1) {
          item.state = 1;
        } else item.state = 0;
      }
    });
		this.setState({isCompleted: arr})
  }

  renderListTodo(listTodo) {
    return listTodo.map((work, index) =>
      work.state === -1 ? (
        <li key={index}>
          <span className="work-title">{work.title}/</span>
          <span className="work-time">{work.date}</span>
          <button
            className="completed"
            id="buton-confirm"
            onClick={() => this.handlerCompletedWork(index, 1)}
          >
            &#10003;
          </button>
          <button
            className="not_completed"
            id="buton-confirm"
            onClick={() => this.handlerCompletedWork(index, 0)}
          >
            
            &#10008;
          </button>
        </li>
      ) : work.state === 1 ? (
        <li key={index}>
          <span className="work-title">{work.title}/</span>
          <span className="work-time">{work.date}</span>
          <span id="checked-button">&#10003;</span>
        </li>
      ) : (
        <li key={index}>
          <span className="work-title">{work.title}/</span>
          <span className="work-time">{work.date}</span>
          <span id="checked-button">&#10008;</span>
        </li>
      )
    );
  }

  render() {
    const customStyle = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "0",
        position: "absolute",
        borderRadius: "12px",
      },
    };

    const content = this.props.content;
    arr = this.props.toDoList;
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={this.props.requestClose}
        style={customStyle}
        className={content.className}
        overlayClassName="change-state-modal_overlay"
      >
        <div className="modal-content">
          <h3 className="title">{content.title}</h3>
          <h5 className="message">{content.message}</h5>
          <div>
            <ul>{this.renderListTodo(arr)}</ul>
          </div>
          <Button
            id="button-save"
            onClick={() => this.props.handlerChangedState(arr)}
          >
            Save
          </Button>
        </div>
      </Modal>
    );
  }
}

export default ChangeStateModal;
