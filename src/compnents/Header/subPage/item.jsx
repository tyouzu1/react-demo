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
        const {data, id, className, width} = this.props;
        return (
            <li id={id} className={className ? 'selected' : null}

                style={{
                    width: (
                        width
                            ? (data.name.length === 2
                                ? '16.6667%'
                                : '33.3333%'
                            )
                            : ''
                    )
                }}
            >
                <a onClick={this.handleClick} >{data.name}</a>
            </li>
        )
    }
}

export default Item;