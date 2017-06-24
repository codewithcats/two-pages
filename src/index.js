import React from 'react';
import ReactDOM from 'react-dom';
import {Provider as ReduxProvider} from 'react-redux'

import './index.css';
import './app/firebase'
import registerServiceWorker from './registerServiceWorker';
import router from './app/router'
import reduxStore from './app/state/store'
import {actions as routingActions} from './app/state/ducks/routing'

import {Header, Content, BottomBar} from './app/view/components'

if (process.env.NODE_ENV !== 'production') {
  let createClass = React.createClass
  Object.defineProperty(React, 'createClass', {
    set: (nextCreateClass) => {
      createClass = nextCreateClass
    }
  })
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React)
}

async function render(component, element) {
  return new Promise((resolve) => {
    ReactDOM.render(component, element, (...args) => {
      resolve(args)
    })
  })
}

async function init() {
  await render((
    <ReduxProvider store={reduxStore}>
      <Header />
    </ReduxProvider>
  ), document.getElementById('header'))

  await render((
    <ReduxProvider store={reduxStore}>
      <Content />
    </ReduxProvider>
  ), document.getElementById('root'))

  registerServiceWorker();
  router.start('/lounge', () => {
    reduxStore.dispatch(routingActions.started())
  })
}

init()

