import React from 'react'
import {Link} from 'react-router'

import './style.less'

class NavBar extends React.Component {

    render() {

        return (
            <div className="nav-header">
                <div className="nav-header-container clear-fix">
                    <a href='https://m.baidu.com/'>
                        <i className="icon-home float-left">
                        </i>
                    </a>

                    <Link to='/profile/home'>
                        <i className="icon-user float-left">
                        </i>
                    </Link>
                    <i className="icon-plus float-right"></i>
                    <i className="icon-search float-right"></i>
                </div>
            </div>
        )
    }
}

export default NavBar;