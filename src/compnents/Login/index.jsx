import React from 'react'
import { bindActionCreators } from 'redux'
import { hashHistory,Link } from 'react-router'
import { connect } from 'react-redux'
import {postSignIn} from '../../fetch/userInfo'
import LocalStore from '../../util/localStore'
import { BD_NEWS_WEBAPP_SHOW_IMAGE,LOGIN,TOKEN } from '../../config/localStoreKey'
import * as userInfoAction from '../../actions/userInfoAction';
import BackHeader from '../BackHeader'
import './style.less'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
class Login extends React.Component {

    state={
        name:'',
        password:''
    }

    handleClick (){
        let userResult = postSignIn(this.state);
        userResult.then(res => {
            return res.json()
        }).then((json) => {
            if(json.code===0){
                // 把无图模式 imageMode 拼接到数据中 本地存储
                let data = JSON.parse(LocalStore.getItem(BD_NEWS_WEBAPP_SHOW_IMAGE));
                if (data) {
                    this.props.userInfoActions.update(json.data);
                    this.props.userInfoActions.updateImageModel(true);
                    LocalStore.setItem(BD_NEWS_WEBAPP_SHOW_IMAGE, JSON.stringify(true));
                } else {
                    this.props.userInfoActions.updateImageModel(false);
                    this.props.userInfoActions.update(json.data);
                }
                LocalStore.setItem(LOGIN,json.data.uname+'');
                LocalStore.setItem(TOKEN, json.data.token+'');

                if(this.props.params.back){
                    window.history.back();
                }else{
                    hashHistory.push('/profile/home');
                }
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
                                <BackHeader  to={this.props.params.back?'':'/profile/home'}  title="登录"/>
                                <div className="login-info">
                                       <input placeholder="请输入帐号" type="text" value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
                                        <input  placeholder="请输入密码" type="password" value={this.state.password} onChange={this.handleChangePwd.bind(this)} />
                                        <input type="button" value="登录" onClick={this.handleClick.bind(this)}/>
                                    <Link  to={this.props.params.back?'/register/true':'/register'} className="register-btn" >去注册</Link>
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
)(Login);