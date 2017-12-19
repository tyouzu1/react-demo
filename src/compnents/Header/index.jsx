import React from 'react'
import NavBar from './subPage/NavBar'
import Category from './subPage/Category'

import './style.less'
class HomeContainer extends React.Component {

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