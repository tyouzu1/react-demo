import React from 'react'
import NavBar from './subPage/NavBar'
import Category from './subPage/Category'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
class HomeContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render (){

        return (
            <div className="header-container">
                <NavBar />
                <Category />
            </div>
        )
    }
}

export default HomeContainer;