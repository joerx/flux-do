import Dispatcher from './dispatcher'
import {VIEW_ACTION} from './constants'

class AppDispatcher extends Dispatcher {

  constructor() {
    super()
  }

  handleViewAction(action, data) {
    console.info('AppDispatcher - generate dispatcher action')
    this.dispatch({
      source: VIEW_ACTION,
      action: action,
      data: data
    })
  }
}

export const appDispatcher = new AppDispatcher()
