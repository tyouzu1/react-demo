import React from 'react'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { postUserUpdate } from '../../../fetch/userInfo'
import LocalStore from '../../../util/localStore'
import { BD_NEWS_WEBAPP_SHOW_IMAGE, LOGIN, TOKEN } from '../../../config/localStoreKey'
import * as userInfoAction from '../../../actions/userInfoAction';
import BackHeader from '../../BackHeader'
import './style.less'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
class Update extends React.Component {

    state = {
        password:'',
        confirmPassword:'',
        nick:this.props.userInfo.displayname||'',
        avatar:this.props.userInfo.image||'',
    }

    componentDidMount(){
        if(!this.props.userInfo.isLogIn){
            hashHistory.push('/')
        }
    }
    handleClick() {
        if(!this.state.confirmPassword&&!this.state.password&&!this.state.nick&&!this.state.avatar){
            return 
        }
        if(this.state.confirmPassword!==this.state.password){
            alert('密码不一致')
            return 
        }
      
        if(this.props.userInfo.isLogIn&&this.props.userInfo.id){
            let paramsObj = {
                nick:this.state.nick,
                avatar:this.state.avatar,
                password:this.state.password,
                id:this.props.userInfo.id,
            }
            let userResult = postUserUpdate(paramsObj);
            userResult.then(res => {
                return res.json()
            }).then((json) => {
                if(json.code==0){
                    alert('修改成功!');
                    let params = {
                        ...this.props.userInfo
                    }
                    params.displayname = paramsObj.nick;
                    params.image = paramsObj.avatar;
                    this.props.userInfoActions.update(params);
                    hashHistory.push('/profile/home')
                }else{
                    alert('修改失败!');
                }
            }).catch(ex => {
                if (__DEV__) {
                    console.error('获取分类数据报错, ', ex.message)
                }
            });
        }
    }
    handleChangeNick(e) {
        this.setState({
            nick: e.target.value
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
    handleChangeAvatar(e){
        let self = this;
        if(e.target.files.length){
            var file = e.target.files[0];
            var r = new FileReader();  //本地预览
            const isJPEG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isJPG = file.type === 'image/jpg';
            if (!isJPG&&!isJPEG&&!isPNG) {
                alert('你只能上传jpg/png/jpeg类型的图片!');
                return
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                alert('图片大小不能超过2M!');
                return
            }
            r.onload = function () {
                self.setState({
                   avatar:r.result
               })
            };
            r.readAsDataURL(file);    //Base64
        }
    }
    handleDeleteAvatar(){
        this.setState({
            avatar:''
        })
    }
    //使用filereader获取base64 end
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
                        <div className="update-container">
                            <BackHeader to='/profile/home' title="修改信息" />
                            <div className="login-info">
                                <input placeholder="请输入新的昵称" type="text" value={this.state.nick} onChange={this.handleChangeNick.bind(this)} />
                                <input placeholder="请输入新的密码" type="password" value={this.state.password} onChange={this.handleChangePwd.bind(this)} />
                                <input placeholder="请再次输入新的密码" type="password" value={this.state.confirmPassword} onChange={this.handleChangeCPwd.bind(this)}/>
                                <label htmlFor="upload" className="ui-upload" style={{backgroundImage:'url('+this.state.avatar+')'}}>{this.state.avatar?'':'点击选择头像上传'}</label>
                                <input type="file"  id="upload" accept='image/*' onChange={this.handleChangeAvatar.bind(this)}/>
                                {this.state.avatar&&<i onClick={this.handleDeleteAvatar.bind(this)} className="icon-cross clear-avatar"></i>}
                                <input  type="button" disabled={this.state.confirmPassword==''&&this.state.password==''&&this.state.nick==''&&this.state.avatar==''} value="更新用户信息" onClick={this.handleClick.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo
});
const mapDispatchToProps = dispatch => ({
    userInfoActions: bindActionCreators(userInfoAction, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Update);