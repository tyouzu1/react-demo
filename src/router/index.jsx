import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import PropTypes from 'prop-types';

import App from '../compnents/App'
import Home from '../compnents/Home'
import Profile from '../compnents/Profile'
import Notice from '../compnents/Profile/subPage/Notice'
import Favor from '../compnents/Profile/subPage/Favor'
import NotFound from '../compnents/404'
import NewsDetail from '../compnents/NewsDetail'
import Subscribe from '../compnents/Subscribe'
import Search from '../compnents/Subscribe/subPage/Search'
import Manage from '../compnents/Manage'
import SearchPage from '../compnents/SearchPage'
import SectionItemNews from '../compnents/Subscribe/subPage/SectionItemNews'
import CommentDetail from '../compnents/NewsDetail/subPage/CommentDetail'
class RouterMap extends React.Component {

    render() {
        return (
            <Router history={this.props.history} >
                <Route path='/' component={App}>
                    <IndexRoute component={Home}/>
                    <Route path='/detail/:name' component={NewsDetail}/>
                    <Route path='/news(/:name)' component={Home}/>
                    <Route path='/profile/home' component={Profile}/>
                    <Route path='/profile/notice' component={Notice}/>
                    <Route path='/profile/favor' component={Favor}/>
                    <Route path='/subscribe/home' component={Subscribe}/>
                    <Route path='/subscribe/manage' component={Manage}/>
                    <Route path='/subscribe/search' component={Search}/>
                    <Route path='/searchpage/home' component={SearchPage}/>
                    <Route path='/subscribe/news/:name' component={SectionItemNews}/>
                    <Route path='/comment/:id' component={CommentDetail}/>
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
