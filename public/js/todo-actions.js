import {appDispatcher} from './app-dispatcher'
import * as constants from './constants'

export function createTodo(text) {
  console.info('TodoActions - trigger view action "%s"', constants.ACTION_CREATE)
  appDispatcher.handleViewAction(constants.ACTION_CREATE, {text})
}

export function markTodoComplete(id) {
  console.info('TodoActions - trigger view action "%s"', constants.ACTION_MARK_COMPLETE)
  appDispatcher.handleViewAction(constants.ACTION_MARK_COMPLETE, {id})
}

export function markTodoIncomplete(id) {
  console.info('TodoActions - trigger view action "%s"', constants.ACTION_MARK_INCOMPLETE)
  appDispatcher.handleViewAction(constants.ACTION_MARK_INCOMPLETE, {id})
}
