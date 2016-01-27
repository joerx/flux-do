import React from 'react'
import {createTodo, markTodoComplete, markTodoIncomplete} from './todo-actions'
import * as constants from './constants'

const _store = Symbol()
const KEYCODE_ENTER = 13

/**
 * Top level app component, wires everything up, receives and dispatches UI events from lower 
 * level components. 
 */
export default class TodoApp extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>TODO List</h1>
        <TodoList 
          todoStore={this.props.todoStore} 
          onItemCheck={item => this._markItemComplete(item)}
          onItemUncheck={item => this._markItemIncomplete(item)}
        />
        <TodoInput onSave={(e) => this._saveItem(e)} />
      </div>
    )
  }

  _saveItem(value) {
    console.info('TodoApp - save todo item "%s"', value)
    createTodo(value)
  }

  _markItemComplete(item) {
    console.info('TodoApp - mark todo item "%s" complete', item.id)
    markTodoComplete(item.id)
  }

  _markItemIncomplete(item) {
    console.info('TodoApp - mark todo item "%s" incomplete', item.id)
    markTodoIncomplete(item.id)
  }
}

/**
 * The actual list of TODOs
 */
class TodoList extends React.Component {

  constructor(props) {
    super(props)
    this.props.todoStore.on(constants.EVT_CHANGE, (e) => this.onChange(e))
    this.props.todoStore.on(constants.EVT_CREATE, (e) => this.onCreate(e))

    this.state = {todos: this.props.todoStore.getAll()}
  }

  render() {
    let todoNodes = this.state.todos.map(todo => {
      return <TodoItem 
        key={todo.id} 
        todo={todo} 
        onCheck={item => this.props.onItemCheck(item)}
        onUncheck={item => this.props.onItemUncheck(item)}
      />
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

/**
 * Single TODO item with a nifty checkbox to mark it complete/incomplete
 */
class TodoItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      checked: (this.props.todo.status === constants.STATUS_DONE),
      text: this.props.todo.text
    }
  }

  render() {
    return (<li>
      <input 
        type="checkbox" 
        onChange={e => this._checkBoxChange(e)} 
        checked={this.state.checked} 
      />
      {this.state.text}
    </li>)
  }

  _checkBoxChange(e) {
    this.setState({checked: e.target.checked})
    if (e.target.checked) {
      this.props.onCheck(this.props.todo)
    } else {
      this.props.onUncheck(this.props.todo)
    }
  }
}

/**
 * Input field for new TODO items. Press enter to save.
 */
class TodoInput extends React.Component {

  constructor() {
    super()
    this.state = {value: ''}
  }

  render() {
    return (<input
      placeholder='enter something'
        onChange={e => this._onChange(e)}
        onKeyDown={e => this._onKeyDown(e)}
        value={this.state.value}
        autoFocus={true}
    />)
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
    if (e.keyCode === KEYCODE_ENTER) {
      this._save()
    }
  }
}
