import React from 'react'
import { render } from 'react-dom'
import { hashHistory } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers'
import RouteMap from './router'

import './static/css/common.less'
import './static/css/font.css'

const store = createStore(reducer,
    window.devToolsExtension ? window.devToolsExtension() : undefined
);

render(
    <Provider store={store}>
        <RouteMap history={hashHistory}/>
    </Provider>
   ,
    document.getElementById('root')
)