import React from 'react'
import {hashHistory} from 'react-router'

import './style.less'

class Item extends React.Component {

    handleClick = () => {
        hashHistory.push('/' + encodeURIComponent(this.props.data.name));
        //如果在下拉菜单界面 点击后关闭菜单
        this.props.handleClick ? (this.props.handleClick()) : null;
    };

    shouldComponentUpdate(nextProps, nextState) {
        //当className改变了才允许更新组件  否则父组件更新state时 会被调用 造成浪费
        return this.props.className !== nextProps.className;
    }

    componentDidUpdate() {
        //点击后更新完成 使标签滚动到div中间
        this.scrollToFocus();
    }

    //使被点击的标签 滚动到div中间
    scrollToFocus() {
        if (this.props.className) {
            const anchorElement = document.getElementById(this.props.id);
            if (anchorElement) {
                anchorElement.scrollIntoView({block: "center"});
            }
        }
    }

    componentDidMount() {
        //F5刷新后保持路由中的页面
        this.scrollToFocus();
    }

    render() {
        const {data, id, width, className} = this.props;
        return (
            <li id={id ? id : null}
                className={className ? 'selected' : null}
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
                <a onClick={this.handleClick}>{data.name}</a>
            </li>
        )
    }
}

export default Item;