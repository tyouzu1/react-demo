import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router'

class Notice extends React.Component {
    shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    render (){
        return (
            <div>
                <Link to='/'>
                    <i className="icon-arrow-left2">
                    </i>
                </Link>
            </div>
        )
    }
}

export default Notice;