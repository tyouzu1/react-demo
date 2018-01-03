import React from 'react'
import PropTypes from 'prop-types';
import {hashHistory} from 'react-router'
import {withRouter} from 'react-router'
import Item from './item'

import './style.less'

class CategoryItemList extends React.Component {


    //state  index：选中的li  lgrad：是否显示模糊遮罩层
    state = {
        lgrad: false,

    };

    handleClick = () => {
        this.props.handleClick();
    };

    handleScroll = (e) => {
        if (e.target.scrollLeft === 0) {
            if (this.state.lgrad) {
                this.setState({
                    lgrad: false
                })
            }
        } else {
            if (!this.state.lgrad) {
                this.setState({
                    lgrad: true
                })
            }
        }
    };

    render() {
        const url = this.props.location.pathname.split('/').pop().replace('news','');
        return (
            <div className="nav-category-menu">
                <p className={"lgrad" +
                (this.state.lgrad
                    ? ''
                    : ' none')
                }>
                </p>
                <ul onScroll={this.handleScroll} >
                    {
                        this.props.categoryData.map((item, index) => {
                            let className;
                            if (url){
                                const type = url||'%E6%8E%A8%E8%8D%90';
                                className = type && encodeURIComponent(item.name) === type;
                            }if(!url){
                                className = encodeURIComponent(item.name) === '%E6%8E%A8%E8%8D%90'
                            }
                            return (
                            <Item data={item}
                                  key={index}
                                  id={"nav_" + index}
                                  className={className}
                            />
                        )})
                    }
                </ul>
                <p className="rgrad">
                </p>
                <p className="more" onClick={this.handleClick}><i className="icon-arrow-down2"></i></p>
            </div>

        )
    }
}

CategoryItemList.PropTypes = {}

export default withRouter(CategoryItemList);