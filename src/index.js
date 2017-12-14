import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/App'
import { injectGlobal } from 'styled-components'

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
    font-size: 62.5%;
  }
`

ReactDOM.render(<App />, document.getElementById('root'))
