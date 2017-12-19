import React from 'react'

import './style.less'

class NavBar extends React.Component {

    render() {

        return (
            <div className="nav-header">
                <div className="nav-header-container clear-fix">
                    <i className="icon-home float-left"></i>
                    <i className="icon-user float-left"></i>
                    <i className="icon-plus float-right"></i>
                    <i className="icon-search float-right"></i>
                </div>
            </div>
        )
    }
}

export default NavBar;