import React from 'react'
import ReactDOM from 'react-dom'
import Console from './lib'

import './index.scss'
import './style/style.scss'

function App () {
  return (
    <div id='app'>
      <Console input />
    </div>
  )
}

setTimeout(() => {
  /*
  console.log('store/get', { list: [{ id: 123, name: 'Phone' }, { id: 456, name: 'Keyboard' }] })

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
  */

  console.log('string =>', 'lorem ipsum', ' - number =>', 123456.789, ' - bool =>', true, ' - function =>', () => {})
  console.error('Error =>', Error('ERROR_MESSAGE'))
  console.warn('array =>', ['string', 1, false], 'array of object =>', [{ id: 1, label: 'cat' }, { id: 2, label: 'dog' }])
  console.info('object =>', {
    string: 'string',
    number: 345,
    bool: true,
    function: () => {},
    object: {
      a: 1,
      b: 2
    },
    array: ['oh', 'bella', 'ciao']
  }
  )
  console.debug('null =>', null, 'undefined =>', undefined, 'Symbol =>', Symbol('put'))
}, 500)

ReactDOM.render(<App />, document.getElementById('root'))
