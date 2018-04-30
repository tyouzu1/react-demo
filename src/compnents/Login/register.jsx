import React from 'react'
import { bindActionCreators } from 'redux'
import { hashHistory,Link } from 'react-router'
import { connect } from 'react-redux'
import {postSignUp} from '../../fetch/userInfo'
import LocalStore from '../../util/localStore'
import { BD_NEWS_WEBAPP_SHOW_IMAGE,LOGIN } from '../../config/localStoreKey'
import * as userInfoAction from '../../actions/userInfoAction';
import BackHeader from '../BackHeader'
import './style.less'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
class Register extends React.Component {

    state={
        name:'',
        password:'',
        confirmPassword:'',
        email:'',
    }

    handleClick (){
        let userResult = postSignUp(this.state);
        userResult.then(res => {
            return res.json()
        }).then((json) => {
            if(json.code===0){
                // 把无图模式 imageMode 拼接到数据中 本地存储
                let data = JSON.parse(LocalStore.getItem(BD_NEWS_WEBAPP_SHOW_IMAGE));
                if (data == null) {
                    json.imageMode = true;
                    this.props.userInfoActions.update(json.data);
                    LocalStore.setItem(BD_NEWS_WEBAPP_SHOW_IMAGE, JSON.stringify(true));
                } else {
                    json.imageMode = data;
                    this.props.userInfoActions.update(json.data);
                }
                LocalStore.setItem(LOGIN, JSON.stringify(true));
                hashHistory.push('/profile/home');
            }else {
                alert(json.message);
            }
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取user数据报错, ', ex.message)
            }
        });
    }
    handleChangeName(e){
        this.setState({
            name:e.target.value
        })
    }
    handleChangePwd(e){
        this.setState({
            password:e.target.value
        })
    }
    handleChangeCPwd(e){
        this.setState({
            confirmPassword:e.target.value
        })
    }
    handleChangeEmail(e){
        this.setState({
            email:e.target.value
        })
    }
    render() {
        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}
                >
                    <div key={1}>
                        <div className="login-container">
                            <BackHeader to='/profile/home' title="登录"/>
                            <div className="login-info">
                                <input placeholder="请输入帐号" type="text" value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
                                <input  placeholder="请输入密码" type="password" value={this.state.password} onChange={this.handleChangePwd.bind(this)} />
                                <input placeholder="请再次输入你的密码" type="password" value={this.state.confirmPassword} onChange={this.handleChangeCPwd.bind(this)}/>
                                <input  placeholder="请输入邮箱" type="email" value={this.state.email} onChange={this.handleChangeEmail.bind(this)} />
                                <input type="button" value="注册" onClick={this.handleClick.bind(this)}/>
                                <Link   to="/login" className="register-btn" >去登录</Link>
                            </div>
                        </div>
                    </div>


                </ReactCSSTransitionGroup>
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
)(Register);