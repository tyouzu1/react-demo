import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'

import {setCategoryData} from '../../fetch/category'

import BackHeader from '../BackHeader'
import ManageList from './subPage/ManageList'
import * as categoryAction from '../../actions/categoryAction';
import './style.less'

class Manage extends React.Component {

    state = {
        lsData:this.props.category.tag
    };
    static orderFn (arr,index,tindex){
        if(index>tindex){
            arr.splice(tindex+1,0,arr[index-1]);
            arr.splice(index,1)
        }else{
            arr.splice(tindex+1,0,arr[index]);
            arr.splice(index,1)
        }
    }
    setSubscribeFn (name) {
        let data = Object.assign({},this.props.category);
        data.tag = data.tag.filter(item => item.name!==name)
        this.props.categoryActions.update(
            data
        );
        this.setState({
            lsData:data.tag
        })
    }

    setLsDataOrderFn (ulIndex,phIndex) {
        // let data = JSON.parse(JSON.stringify(this.props.category));
        let data = Object.assign({},this.props.category);
        Manage.orderFn(data.tag,ulIndex,phIndex);
        //不一样时更新
        if(ulIndex !== phIndex){
            this.props.categoryActions.update(data);
            this.setState({
                lsData:data.tag
            })
        }
    }
    handleChange() {
        console.log(this.props.userInfo)
        if(this.props.userInfo.isLogIn){
            let categoryResult = setCategoryData(this.props.category);
            categoryResult.then(res => {
                return res.json()
            }).then((json) => {
                this.props.categoryActions.update(json);
                hashHistory.push('/subscribe/home')
            }).catch(ex => {
                if (__DEV__) {
                    console.error('获取分类数据报错, ', ex.message)
                }
            });
        }else{
            hashHistory.push('/login/true')
        }
        
    }

    render() {
        return (
            <div>
                <BackHeader title="订阅管理" btn={this.handleChange.bind(this)} />
                <div className="manage-subscribe-container">
                    <h3>已有<span>{this.state.lsData.length}</span>个订阅</h3>
                    {this.state.lsData&&<ManageList data={this.state.lsData} setSubscribeFn={this.setSubscribeFn.bind(this)} setLsDataOrderFn={this.setLsDataOrderFn.bind(this)}  />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    category:state.category,
    userInfo:state.userInfo,
});

const mapDispatchToProps = dispatch => ({
    categoryActions: bindActionCreators(categoryAction, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Manage);
