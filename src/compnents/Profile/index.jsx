import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import BackHeader from '../BackHeader'
import NavItem from './subPage/NavItem'
import * as userInfoAction from '../../actions/userInfoAction';
import LocalStore from '../../util/localStore'
import { BD_NEWS_WEBAPP_SHOW_IMAGE,LOGIN } from '../../config/localStoreKey'

import './style.less'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Profile extends React.Component {

    static handleClick(data) {
        if(this.props.userInfo.isLogIn){
            hashHistory.push(data)
        }else {
            alert('请先登录');
        }
    }

    handleSelect() {
        if(this.props.userInfo.isLogIn){
            this.props.userInfoActions.updateImageModel(!this.props.userInfo.imageMode);
            LocalStore.setItem(BD_NEWS_WEBAPP_SHOW_IMAGE, JSON.stringify(!this.props.userInfo.imageMode));
        }else {
            alert('请先登录');
        }
    }

    handleLogOut(){
        let logout = confirm("你确定要退出登录吗？")
        if(logout){
            this.props.userInfoActions.logout();
            LocalStore.setItem(LOGIN, JSON.stringify(false));
        }else {
            console.log('取消');
        }
    }

    handleLogIn(){
        hashHistory.push('/login');
    }


    render() {
        const {image , displayname , isLogIn , imageMode } =this.props.userInfo;
        return (
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
            >
                <div key={1}>
                    <div className="profile-container">
                        <div className="profile-header">
                            <BackHeader link />
                            <div className="profile-info">
                                <div className="profile-img-container">
                                    <div className="img-wrapper">
                                        <img
                                            src={image?image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMDBBQzI5ODU4NjNFMTExOENDN0E4Qzc0NTMzRDM1OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxNjE2N0UyRDJGNUExMUU1QjBFQzhDRjNCQzQ4NUFBMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNjE2N0UyQzJGNUExMUU1QjBFQzhDRjNCQzQ4NUFBMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNCAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplMTEyOTIzMy02MWViLTRhYTktOGI2Zi0wODY2NjJlMzZjYjMiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjOWY0MzI5ZS02YzcwLTExNzgtOGRmNC1iZjE3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'}/>
                                    </div>
                                </div>
                                <div className="profile-name">
                                    <span>{displayname?displayname: <button className="profile-login" onClick={this.handleLogIn}>立即登录</button>}</span>
                                </div>
                            </div>
                        </div>
                        <div className="profile-nav">
                            <NavItem icon="icon-bubbles4" content="我的消息" handleClick={Profile.handleClick.bind(this,'/profile/notice')}/>
                            <NavItem icon="icon-star-empty" content="我的收藏" handleClick={Profile.handleClick.bind(this,'/profile/favor')}/>
                            {isLogIn&&<NavItem icon="icon-exit" content="退出登录" handleClick={this.handleLogOut.bind(this)}/>}
                            <NavItem icon="icon-images" content="无图模式"
                                     handleSelect={this.handleSelect.bind(this)}
                                     btn
                                     selected={isLogIn?imageMode:true}
                            />
                        </div>
                    </div>
                </div>

            </ReactCSSTransitionGroup>
        )
    }
}

const mapStateToProps = state => ({
    userInfo:state.userInfo
});

const mapDispatchToProps = dispatch => ({
    userInfoActions: bindActionCreators(userInfoAction, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);
