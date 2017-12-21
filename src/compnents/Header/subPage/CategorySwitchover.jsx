import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Item from './item'

import './style.less'

class CategorySwitchover extends React.Component {
    shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    state = {
        index: 0,
    };

    handleClick = () => {
        this.props.handleClick();
    };
    handleSelect = (index) => {
        this.setState({
            index: index
        })
    };
    render() {
        return (
            <div className={"nav-category-switchover" + this.props.className}>
                <div className="switchover-container">
                    <div className="switchover-title">切换栏目<a href="#" onClick={this.handleClick}><i
                        className="icon-arrow-up2">
                    </i></a></div>
                    <div className="switchover-ul">
                        <ul>
                            {
                                this.props.categoryData.map((item, index) => (
                                    <Item data={item}
                                          key={index}
                                          handleClick={this.handleSelect}
                                          className={this.state.index === index}
                                          width
                                    />
                                ))
                            }
                        </ul>
                    </div>
                    <ul className="switchover-btn">
                        <li><a href="#">删除及排序</a></li>
                    </ul>
                </div>
                <div className="mark" onClick={this.handleClick}></div>
            </div>
        )
    }
}

export default CategorySwitchover;