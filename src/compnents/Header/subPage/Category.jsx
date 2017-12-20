import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'

import Item from './CategoryItem'
import {getCategoryData} from '../../../fetch/category'

import './style.less'

class Category extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data:[]
        }
    }

    componentDidMount() {
        let result = getCategoryData();
        result.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                data:this.state.data.concat(json)
            });
        }).catch(ex => {
            if (__DEV__){
                console.error('获取分类数据报错, ', ex.message)
            }
        });


    }

    render (){

        return (
            <div className="nav-category">
              <div className="nav-category-menu">
                    <Item categoryData = {this.state.data} />
              </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category);

