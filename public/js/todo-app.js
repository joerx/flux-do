import React from 'react'
import {createTodo, markTodoComplete} from './todo-actions'
import * as constants from './constants'

let _store = Symbol()

export default class TodoApp extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>TODO List</h1>
        <TodoList todoStore={this.props.todoStore} />
        <TodoInput onSave={(e) => this.saveTodoItem(e)} />
      </div>
    )
  }

  saveTodoItem(value) {
    console.info('TodoApp - save todo item "%s"', value)
    createTodo(value)
  }
}

class TodoList extends React.Component {

  constructor(props) {
    super(props)
    this.props.todoStore.on(constants.EVT_CHANGE, (e) => this.onChange(e))
    this.props.todoStore.on(constants.EVT_CREATE, (e) => this.onCreate(e))

    this.state = {todos: this.props.todoStore.getAll()}
  }

  render() {
    let todoNodes = this.state.todos.map(todo => {
      return <li key={todo.id}>{todo.text}</li>
    })

    return (
      <ul>{todoNodes}</ul>
    )
  }

  onChange(e) {
    console.info('TodoList - received event "' + constants.EVT_CHANGE + '"')
    this._refresh()
  }

  onCreate(e) {
    console.info('TodoList - received event "' + constants.EVT_CREATE + '"')
    this._refresh()
  }

  _refresh() {
    this.setState({todos: this.props.todoStore.getAll()})
  }
}

class TodoInput extends React.Component {

  constructor() {
    super()
    this.state = {value: ''}
  }

  render() {
    return (<input
      placeholder='enter something'
        onBlur={_ => this._onBlur()}
        onChange={e => this._onChange(e)}
        onKeyDown={e => this._onKeyDown(e)}
        value={this.state.value}
        autoFocus={true}
    />)
  }

  _onBlur() {
    if (this.state.value) this._save()
  }

  _save() {
    console.info('TodoInput - saved')
    this.props.onSave(this.state.value)
    this.setState({value: ''})
  }

  _onChange(e) {
    this.setState({value: e.target.value})
  }

  _onKeyDown(e) {
    if (e.keyCode === 13) {
      this._save()
    }
  }
}
