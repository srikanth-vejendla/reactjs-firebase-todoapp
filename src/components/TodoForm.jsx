import React, { Component } from "react";
import "./TodoApp.css";
import TodoList from "./TodoList";
import db from "./Firestore";
class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.dbRef = db.collection("todos");
  }
  state = {
    todos: []
  };

  componentDidMount() {
    this.dbRef.onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(change => {
        let todoObj = {
          id: change.doc.id,
          todo: change.doc.data().todo
        };

        if (change.type == "added") {
          this.setState({
            todos: [todoObj, ...this.state.todos]
          });
        } else if (change.type == "modified") {
          let updated = [
            todoObj,
            ...this.state.todos.filter(todo => todo.id !== change.doc.id)
          ];
          this.setState({ todos: updated });
        } else if (change.type == "removed") {
          this.setState({
            todos: this.state.todos.filter(todo => todo.id !== change.doc.id)
          });
        }
      });
    });
  }

  addNote = e => {
    if (this.refs.inputNote.value !== "") {
      var newNote = {
        todo: this.refs.inputNote.value
      };
      this.dbRef.add({
        todo: this.refs.inputNote.value
      });
    }
    this.refs.inputNote.value = "";
    e.preventDefault();
  };

  deleteNoteHandler = id => {
    this.dbRef.doc(id).delete();
  };

  render() {
    return (
      <div className="todoFormMain">
        <form className="todoFormForm" onSubmit={this.addNote}>
          <input
            className="taskInput"
            placeholder="Enter your task..."
            ref="inputNote"
          />
          <button className="taskButton" type="submit">
            Add Task
          </button>
        </form>
        <TodoList
          todos={this.state.todos}
          deleteNote={this.deleteNoteHandler}
        />
      </div>
    );
  }
}

export default TodoForm;
