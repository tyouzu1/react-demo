import React from 'react'
import {Link} from 'react-router'

class ManageItem extends React.Component {

    render() {

        const {item} = this.props;

        return (
            <li draggable="true">
                <span>{item.name}</span>
                <span className="delete"></span>
                <span className="handle">移动</span>
                <span className="confirm-delete">删除</span>
            </li>
        )
    }
}

export default ManageItem;