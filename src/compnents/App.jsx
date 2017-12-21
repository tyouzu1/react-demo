import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {getCategoryData} from '../fetch/category'
import * as allActions from '../actions/categotyAction';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }
    }
    componentDidMount() {
        //加载完成后更新redux数据
        let result = getCategoryData();
        result.then(res => {
            return res.json()
        }).then((json) => {
            this.props.navActions.update(json);
            // 更改状态
            this.setState({
                initDone: true
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
                    this.state.initDone
                        ? this.props.children
                        : <div>正在加载...</div>
                }
            </div>
        )
    }
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    navActions: bindActionCreators(allActions, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
