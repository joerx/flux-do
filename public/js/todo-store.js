import uniqid from 'uniqid'
import {EventEmitter} from 'events'
import * as constants from './constants'

let _dispatcher = Symbol()
let _todos = Symbol()

function emitChange(store, id) {
  store.emit(constants.EVT_CHANGE, store[_todos].get(id))
}

function emitCreate(store, id) {
  console.info('TodoStore - emit event "%s"', constants.EVT_CREATE)
  store.emit(constants.EVT_CREATE, store[_todos].get(id))
}

function handleDispatch(store, payload) {
  console.info('TodoStore - handle dispatch', payload)

  switch(payload.action) {
    case constants.ACTION_CREATE: 
      store.create(payload.data.text)
      break
    case constants.ACTION_MARK_COMPLETE:
      break
    default:
      // ignore
      break
  }
}

export default class TodoStore extends EventEmitter {

  constructor(dispatcher) {
    super()
    this[_dispatcher] = dispatcher
    this[_todos] = new Map()

    dispatcher.register(payload => handleDispatch(this, payload))
  }

  create(text) {
    console.info('TodoStore - create todo item')
    let id = uniqid()
    let item = {
      id: id,
      text: text,
      status: constants.STATUS_OPEN
    }

    this[_todos].set(id, item)
    emitCreate(this, id)

    return item
  }

  markComplete(id) {
    this[_todos].get(id).status = constants.STATUS_DONE
    emitChange(this, id)
  }

  getAll() {
    let all = []
    this[_todos].forEach((e, i) => all.push(e))
    return all
  }

  getOpen() {
    let res = []
    this[_todos].forEach((e, i) => {
      if (e.status !== constants.STATUS_DONE) res.push(e)
    })
    return res
  }
}
