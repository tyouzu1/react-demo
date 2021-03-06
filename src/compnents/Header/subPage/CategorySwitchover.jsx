import React from 'react'
import {withRouter,Link} from 'react-router'
import Item from './item'

import './style.less'

class CategorySwitchover extends React.Component {

    handleClick = () => {
        //隐藏组件
        this.props.handleClick();
    };

    render() {
        const url = this.props.location.pathname.split('/').pop().replace('news','');
        return (
            <div className={"nav-category-switchover" + this.props.className}>
                <div className="switchover-container">
                    <div className="switchover-title">切换栏目<span href="#" onClick={this.handleClick}><i
                        className="icon-arrow-up2">
                    </i></span></div>
                    <div className="switchover-ul">
                        <ul>
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
                                              width
                                              handleClick={this.handleClick}
                                              className={className}
                                        />)
                                })
                            }
                        </ul>
                    </div>
                    <ul className="switchover-btn">
                        <li><Link to="/subscribe/manage">删除及排序</Link></li>
                    </ul>
                </div>
                <div className="mark" onClick={this.handleClick}>
                </div>
            </div>
        )
    }
}

export default withRouter(CategorySwitchover);