import React, { useEffect, useRef, useState } from 'react'
import { serialize } from '../../serialize'
import { mark } from '../../util'

function Output (props) {
  const [command, setCommand] = useState('')
  const history = props.history || []

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(scrollToBottom, [history])
  const messagesEndRef = useRef(null)

  function sendCommand (event) {
    if (event.key === 'Enter') {
      try {
        // eslint-disable-next-line no-eval
        eval(command)
      } catch (error) {
        console.error(error)
      }
      setCommand('')
    }
  }

  return (
    <div className={'console ' + (props.theme || '')}>
      <ul className='output'>
        {history.map((line, i) => {
          return (
            <li key={i} className='line'>
              <div className={'mode ' + line.mode}>
                <div className='marker'>{mark(line.mode)}</div>
                {/* <div className='reference'>{line.reference}</div> */}
              </div>
              <div className='content' dangerouslySetInnerHTML={{ __html: serialize(line.content) }} />
            </li>
          )
        })}
      </ul>

      {props.input && (
        <div className='input'>
          <input
            type='text' value={command}
            onKeyPress={(event) => sendCommand(event)}
            onChange={event => setCommand(event.target.value)}
          />
        </div>
      )}

      <div ref={messagesEndRef} />

    </div>
  )
}

export default Output
