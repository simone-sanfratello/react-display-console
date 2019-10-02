import React from 'react'
import PropTypes from 'prop-types'
import Output from '../Output'
import { ConsoleConsumer, ConsoleProvider } from '../WrapConsole'

function Console (props) {
  return (
    <ConsoleProvider value={[]}>
      <ConsoleConsumer>
        {value => <Output history={value.history} input={props.input} theme={props.theme} />}
      </ConsoleConsumer>
    </ConsoleProvider>
  )
}

Console.propTypes = {
  input: PropTypes.bool,
  theme: PropTypes.string
}

Console.defaultProps = {
  input: false,
  theme: ''
}

export default Console
