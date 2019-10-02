import React, { createContext, useState } from 'react'
import { reference } from '../../util'

const _console = {}
/**
  * wrap console methods to get contents and display on component output
  * @todo features: clear, download
  * @todo format: table, dir?, trace
  * @todo other: time, group, assert, context, count, memory, profile ...?
  */
function wrap () {
  if (_console.wrap) {
    return
  }
  for (const _method of ['log', 'info', 'error', 'warn', 'debug']) {
    _console[_method] = console[_method]
    // eslint-disable-next-line no-loop-func
    console[_method] = function (...args) {
      _context({ mode: _method, content: args, reference: reference() })
      _console[_method](...args)
    }
  }
  _console.wrap = true
}

const ConsoleContext = createContext()

let _context
export function ConsoleProvider (props) {
  const [history, setConsole] = useState(props.value || [])
  _context = (...args) => {
    setConsole([...history, ...args])
  }
  wrap()

  return (
    <ConsoleContext.Provider value={{ history }}>
      {props.children}
    </ConsoleContext.Provider>
  )
}

export const ConsoleConsumer = ConsoleContext.Consumer
