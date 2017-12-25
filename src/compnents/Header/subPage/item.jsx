import React from 'react'

import './style.less'

class Item extends React.Component {



    handleClick = () => {
        //TODO 更新路由 从参数中改变  进行ajax
        hashHistory.push('/'+ this.props.category);
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