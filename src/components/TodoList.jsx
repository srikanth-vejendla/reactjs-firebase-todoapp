import React, { Component } from "react";
import "./TodoApp.css";

class TodoList extends Component {
  deleteNote = id => {
    this.props.deleteNote(id);
  };
  render() {
    return (
      <div>
        <ul className="listNotes">
          {this.props.todos.map(todo => {
            return (
              <li
                key={todo.id}
                className="itemNote"
                onClick={() => {
                  this.deleteNote(todo.id);
                }}
              >
                <b>{todo.todo}</b>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TodoList;
