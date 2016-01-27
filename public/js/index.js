import React from 'react'
import {render} from 'react-dom'

import {appDispatcher} from './app-dispatcher'
import TodoStore from './todo-store'
import TodoApp from './todo-app'

let store = new TodoStore(appDispatcher)

store.create('get some awesome shit done!')

render(
  <TodoApp todoStore={store} />,
  document.getElementById('app')
)
