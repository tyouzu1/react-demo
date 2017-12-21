import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types';

import Item from './item'

import './style.less'

class CategoryItemList extends React.Component {

    shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    //state data:数据  index：选中的li  lgrad：是否显示模糊遮罩层
    state = {
        data: [],
        index: 0,
        lgrad:false
    };

    handleClick = () => {
        this.props.handleClick();
    };
    handleSelect = (index) => {
        this.setState({
            index:index
        })
    };
    handleScroll = (e) => {
        if (e.target.scrollLeft===0){
            if (this.state.lgrad){
                this.setState({
                    lgrad:false
                })
            }
        }else {
            if (!this.state.lgrad){
                this.setState({
                    lgrad:true
                })
            }
        }
    };

    componentDidMount () {
    }
    render() {

        return (
            <div className="nav-category-menu">
                <p className={"lgrad"+
                (this.state.lgrad
                    ?''
                    :' none')
                }>
                </p>
                <ul onScroll={this.handleScroll} >
                    {
                        this.props.categoryData.map((item, index) => (
                            <Item data={item}
                                  key={index}
                                  handleClick={this.handleSelect.bind(this, index)}
                                  className={this.state.index === index}
                            />
                        ))
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

export default CategoryItemList;