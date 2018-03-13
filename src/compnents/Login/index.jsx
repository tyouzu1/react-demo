import React from 'react'
import {postSignUp} from '../../fetch/userInfo'
class Login extends React.Component {


    handleClick (){

        let userResult = postSignUp('admi','','','',);
        userResult.then(res => {
            return res.json()
        }).then((json) => {
            // 把无图模式 imageMode 拼接到数据中 本地存储
            let data = JSON.parse(LocalStore.getItem(BD_NEWS_WEBAPP_SHOW_IMAGE));
            if (data == null) {
                json.imageMode = true;
                this.props.userInfoActions.update(json);
                LocalStore.setItem(BD_NEWS_WEBAPP_SHOW_IMAGE, JSON.stringify(true));
            } else {
                json.imageMode = data;
                this.props.userInfoActions.update(json);
            }
            // 更改状态
            this.setState({
                userInfoInitDone: true
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取user数据报错, ', ex.message)
            }
        });
    }
    render() {

        return (
            <div>
                <input type="button" onClick={this.handleClick}/>
            </div>
        )
    }
}

export default Login;