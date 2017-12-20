import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class CategoryItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data:[]
        }
    }
    render (){

        return (
            <ul>
                {
                    this.props.categoryData.map((item,index)=>(
                        <li key={index}>
                            {item.title}
                        </li>
                    ))
                }
            </ul>
        )
    }
}

export default CategoryItem;