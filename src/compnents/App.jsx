import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {getCategoryData} from '../fetch/category'
import {getUserInfoData} from '../fetch/userInfo'
import * as categoryAction from '../actions/categoryAction';
import * as userInfoAction from '../actions/userInfoAction';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            userInfoInitDone: false,
            categoryInitDone: false
        }
    }
    componentDidMount() {
        //加载完成后更新redux数据
        let userResult = getUserInfoData();
        userResult.then(res => {
            return res.json()
        }).then((json) => {
            this.props.userInfoActions.update(json);
            // 更改状态
            this.setState({
                userInfoInitDone: true
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取分类数据报错, ', ex.message)
            }
        });
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
                {
                    this.state.userInfoInitDone&&this.state.categoryInitDone
                        ? this.props.children
                        : <div>正在加载...</div>
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
