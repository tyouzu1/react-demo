import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import BackHeader from '../BackHeader'
import ManageList from './subPage/ManageList'
import * as categoryAction from '../../actions/categoryAction';
import './style.less'

class Manage extends React.Component {

    state = {
    };

    componentWillMount() {
        const lsData = this.props.category.tag;
        this.setState({
            lsData:lsData,
        });
    }

    setSubscribeFn () {
        this.props.categoryActions.update(this.state.lsData);
    }

    setLsDataOrderFn () {
        this.props.categoryActions.update(this.state.lsData);
    }

//TODO 拖拽效果
    render() {
        return (
            <div>
                <BackHeader title="订阅管理" btn />
                <div className="manage-subscribe-container">
                    <h3>已有<span>{this.state.lsData.length}</span>个订阅</h3>
                    {this.state.lsData&&<ManageList data={this.state.lsData} setSubscribeFn={this.setSubscribeFn.bind(this)} setLsDataOrderFn={this.setLsDataOrderFn.bind(this)}  />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    category:state.category
});

const mapDispatchToProps = dispatch => ({
    categoryActions: bindActionCreators(categoryAction, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Manage);