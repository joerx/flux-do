export default class Dispatcher {

  constructor() {
    this._callbacks = []
    this._promises = []
  }

  register(cb) {
    this._callbacks.push(cb)
    return this._callbacks.length - 1
  }

  dispatch(payload) {
    let resolves = []
    let rejects = []

    let promises = this._callbacks.map((_, i) => 
      new Promise((resolve, reject) => {
        resolves[i] = resolve
        rejects[i] = reject
      })
    )

    this._callbacks.forEach((cb, i) => 
      Promise.resolve(cb(payload))
        .then(_ => {
          resolves[i](payload)
        }, (e) => {
          console.log('oh!')
          rejects[i](e)
        })
    )
  }
}
