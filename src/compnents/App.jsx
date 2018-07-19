import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Loading from './Loading'
import GoTop from './GoTop'
import {getCategoryData} from '../fetch/category'
import {postUserInfoData} from '../fetch/userInfo'
import * as categoryAction from '../actions/categoryAction';
import * as userInfoAction from '../actions/userInfoAction';
import LocalStore from '../util/localStore'
import {BD_NEWS_WEBAPP_SHOW_IMAGE, CHOSEN_READED_IDS,LOGIN} from '../config/localStoreKey'

class App extends React.Component {
    state = {
        userInfoInitDone: false,
        categoryInitDone: false
    }

    componentDidMount() {
        let login = LocalStore.getItem(LOGIN);
        if(login){
            this.getUserInfo();
        }else {
            this.setState({
                userInfoInitDone: true
            });
            LocalStore.setItem(BD_NEWS_WEBAPP_SHOW_IMAGE, JSON.stringify(true));
        }
        this.getCategory();
        LocalStore.removeItem(CHOSEN_READED_IDS);
    }
    getUserInfo() {
        //TODO 将fetch请求 写到 redux actions 中
        //加载完成后更新redux数据

        let userResult = postUserInfoData();
        userResult.then(res => {
            return res.json()
        }).then((json) => {
            if(json.success){
                // 把无图模式 imageMode 拼接到数据中 本地存储
                let data = JSON.parse(LocalStore.getItem(BD_NEWS_WEBAPP_SHOW_IMAGE));
                if (data == null) {
                    json.data.imageMode = true;
                    this.props.userInfoActions.update(json.data);
                    LocalStore.setItem(BD_NEWS_WEBAPP_SHOW_IMAGE, JSON.stringify(true));
                } else {
                    json.data.imageMode = data;
                    this.props.userInfoActions.update(json.data);
                }
            }else{
                LocalStore.removeItem(LOGIN);
                LocalStore.setItem(BD_NEWS_WEBAPP_SHOW_IMAGE, JSON.stringify(true));
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

    getCategory() {
        //加载完成后更新redux数据
        let categoryResult = getCategoryData();
        categoryResult.then(res => {
            return res.json()
        }).then((json) => {
            this.props.categoryActions.update(json);
            // 更改状态
            this.setState({
                categoryInitDone: true
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取分类数据报错, ', ex.message)
            }
        });
    }

    render() {
        return (
                <div>
                    <GoTop/>
                    {
                        this.state.userInfoInitDone && this.state.categoryInitDone
                            ? this.props.children
                            : <Loading/>
                    }
                </div>

        )
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    categoryActions: bindActionCreators(categoryAction, dispatch),
    userInfoActions: bindActionCreators(userInfoAction, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
