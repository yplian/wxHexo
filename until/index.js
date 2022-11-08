// index.js
const http = require('./http')
const message = require('./message.js')
const store = require('./store.js')
const until = {
  message,
  http,
  store,
  install(Vue) {
    this.store._init()
    for (let i in this) {
      if (i == 'install') {
        continue
      }
      Vue.prototype[i] = this[i]
    }

    delete this.install
  }
}

export default until