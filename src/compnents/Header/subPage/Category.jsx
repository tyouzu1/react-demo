import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';

import * as allActions from '../../../actions';
import Item from './CategoryItem'
import {getCategoryData} from '../../../fetch/category'

import './style.less'

class Category extends React.Component {

    shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    state = {
        category:[],
    };

    componentDidMount() {
        let result = getCategoryData();
        result.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                category:this.state.category.concat(json),
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
                    <Item categoryData = {this.state.category} />
              </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    category:state.category
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(allActions, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category);

