import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class CategorySwitchover  extends React.Component {
    shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    handleClick = () => {
        this.props.handleClick();
    };

    render() {
        return (
            <div className={"nav-category-switchover"+this.props.className}>
                <div className="switchover-container">
                    <div className="switchover-title">切换栏目<a href="#" onClick={this.handleClick}><i className="icon-arrow-up2"></i></a></div>
                    <ul className="switchover-btn"><li><a href="#">删除及排序</a></li></ul>
                </div>
            </div>
        )
    }
}

export default CategorySwitchover;