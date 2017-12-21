import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types';

import './style.less'

class Item extends React.Component {

    shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);


    handleClick = () => {
        this.props.handleClick();
    };

    render() {
        const data = this.props.data;
        return (
            <li className={this.props.className ? 'selected' : null}
                onClick={this.handleClick}
                style={{
                    width: (
                        this.props.width
                            ? (data.name.length === 2
                                ? '16.6667%'
                                : '33.3333%'
                            )
                            : ''
                    )
                }}
            >
                <a href="#">{data.name}</a>
            </li>
        )
    }
}

export default Item;