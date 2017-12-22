import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import BackHeader from '../BackHeader'
import NavItem from './subPage/NavItem'
import * as userInfoAction from '../../actions/userInfoAction';

import './style.less'

class Profile extends React.Component {

    static handleClick(data) {
        hashHistory.push(data)
    }

    handleSelect() {
        this.props.userInfoActions.updateImageModel();
    }

    render() {
        const {image , displayname} =this.props.userInfo;
        return (
            <div className="profile-container">
                <div className="profile-header">
                    <BackHeader/>
                    <div className="profile-info">
                        <div className="profile-img-container">
                            <div className="img-wrapper">
                                <img
                                    src={image?image:''}/>
                            </div>
                        </div>
                        <div className="profile-name">
                            <span>{displayname?displayname:'加载失败...'}</span>
                        </div>
                    </div>
                </div>
                <div className="profile-nav">
                    <NavItem icon="icon-bubbles4" content="我的消息" handleClick={Profile.handleClick.bind(this,'/profile/notice')}/>
                    <NavItem icon="icon-star-empty" content="我的收藏" handleClick={Profile.handleClick.bind(this,'/profile/favor')}/>
                    <NavItem icon="icon-exit" content="退出登录" handleClick={Profile.handleClick.bind(this,'/profile/favor')}/>
                    <NavItem icon="icon-images" content="无图模式"
                             handleSelect={this.handleSelect.bind(this)}
                             btn
                             selected={this.props.userInfo.imageMode

                             }
                    />
                </div>
            </div>
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
