import ReactDom from 'react-dom'
import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './views/home'

class Index extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Home}></Route>
      </BrowserRouter>
    )
  }
}

ReactDom.render(<Index></Index>, document.getElementById('app'))
