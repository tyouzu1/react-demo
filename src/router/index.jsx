import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types';

import App from '../compnents/App'
import Home from '../compnents/HomeContainer'

class RouterMap extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <Router history={this.props.history}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home}/>
                </Route>
            </Router>
        )
    }
}
RouterMap.PropTypes = {
    history:PropTypes.func.isRequired,
}

export default RouterMap
