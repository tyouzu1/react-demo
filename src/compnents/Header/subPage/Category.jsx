import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import * as allActions from '../../../actions';
import Item from './CategoryItem'
import {getCategoryData} from '../../../fetch/category'
import Switchover from './CategorySwitchover'

import './style.less'

class Category extends React.Component {

    shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    state = {
        category: [],
        show: false
    };

    componentDidMount() {
        let result = getCategoryData();
        result.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                category: this.state.category.concat(json.tag),
            });
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取分类数据报错, ', ex.message)
            }
        });
    }

    handleShow () {
        this.setState({
            show:true
        });
        console.log('show')
    };

    handleHide(){
        this.setState({
            show:false
        });
        console.log('hide')
    };

    render() {
        return (
            <div className="nav-category">
                <Item categoryData={this.state.category} handleClick={this.handleShow.bind(this)}/>
                <Switchover categoryData={this.state.category} handleClick={this.handleHide.bind(this)} className={this.state.show?'':' hide'}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    nav: state.nav
});

const mapDispatchToProps = dispatch => ({
    navActions: bindActionCreators(allActions, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category);

