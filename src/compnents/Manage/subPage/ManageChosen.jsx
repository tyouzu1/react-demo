import React from 'react'
import {Link} from 'react-router'

class ManageItem extends React.Component {

    render() {

        const {item} = this.props;

        return (
            <li >
                <span>{item.name}</span>
                <span className="top">置顶</span>
            </li>
        )
    }
}

export default ManageItem;