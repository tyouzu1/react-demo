import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import PropTypes from 'prop-types';

import App from '../compnents/App'
import Home from '../compnents/HomeContainer'
import Profile from '../compnents/Profile'
import Notice from '../compnents/Profile/subPage/Notice'
import Favor from '../compnents/Profile/subPage/Favor'
import NotFound from '../compnents/404'
import NewsDetail from '../compnents/NewsDetail'

class RouterMap extends React.Component {

    render() {
        return (
            <Router history={this.props.history} >
                <Route path='/' component={App}>
                    <IndexRoute component={Home}/>
                    <Route path='/news/:name' component={NewsDetail}/>
                    <Route path='/(:name)' component={Home}/>
                    <Route path='/profile/home' component={Profile}/>
                    <Route path='/profile/notice' component={Notice}/>
                    <Route path='/profile/favor' component={Favor}/>
                    <Route path='/detail/:id' component={Favor}/>
                    <Route path='*' component={NotFound}/>
                </Route>
            </Router>
        )
    }
}
RouterMap.PropTypes = {
    history:PropTypes.func.isRequired,
}

export default RouterMap