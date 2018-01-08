import React from 'react'

import './style.less'
class SectionItem extends React.Component {

    render() {
        return (
            <div className="item-wrapper">
                <div className="item on">
                    <span className="name">{this.props.item.name}</span>
                    <span className="icon">
                    </span>
                </div>
            </div>
        )
    }
}

export default SectionItem;