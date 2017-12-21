import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types';

import './style.less'

class CategoryItem extends React.Component {

    shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    state = {
        data:[]
    }

    handleClick = () => {
        this.props.handleClick();
    };

    render (){

        return (
            <div className="nav-category-menu">
                <p className="lgrad" id="lgrad"></p>
                <ul>
                    {
                        this.props.categoryData.map((item,index)=>(
                            <li key={index} className="selected">
                                <a href="">{item.name}</a>
                            </li>
                        ))
                    }
                </ul>
                <p className="rgrad"></p>
                <p className="more"  onClick={this.handleClick} ><i className="icon-arrow-down2"></i></p>
            </div>

        )
    }
}

CategoryItem.PropTypes = {
    categoryData:PropTypes.array.isRequired,
}

export default CategoryItem;