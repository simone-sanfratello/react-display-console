import React from 'react'
import ReactDOM from 'react-dom'
import Console from './lib'

import './index.scss'

function App () {
  return (
    <div id='app'>
      <Console input clear theme='dark' />
    </div>
  )
}

setTimeout(() => {
  console.log('store/get', { list: [{ id: 123, name: 'Phone' }, { id: 123, name: 'Keyboard' }] })

  console.info('Loading from http://my.api/', { method: 'GET', query: 'order=name&page=9' })

  console.error(new Error('invalid JSON object'))

  console.error({
    error: Error('ERROR_REQUEST_TIMEOUT'),
    message: 'fetch failed',
    retry: false,
    attempts: 3,
    request: 'POST /users/subscribe'
  },
  new Date()
  )

  console.info('function', () => {}, 'result', ['mice', 'badger', 'panda'])

  console.warn('invalid args in lib/util.serialize', [1, 2, 3], null, undefined)

  console.debug('CONSTANT', 11, Symbol('put'))
}, 500)

ReactDOM.render(<App />, document.getElementById('root'))
