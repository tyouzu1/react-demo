import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {hashHistory} from 'react-router'

import Back from '../../BackHeader'
import NewsList from '../../News/subPage/NewsList'
import { getCollectData } from '../../../fetch/collect'
import * as collectAction from '../../../actions/collectlistAction';

class Favor extends React.Component {
    componentDidMount(){
        if(this.props.userInfo.isLogIn){
            let collectResult = getCollectData();
            collectResult.then(res => {
                return res.json()
            }).then((json) => {
                this.props.collectActions.update(json);
            }).catch(ex => {
                if (__DEV__) {
                    console.error('获取分类数据报错, ', ex.message)
                }
            });
        }else{
            hashHistory.push('/')
        }
    }
    render (){
        return (
            <div >
                <div className="">
                    <Back title="我的收藏"/>
                </div>
                    {this.props.collectList.length
                    ?<NewsList data={this.props.collectList} imageMode={this.props.userInfo.imageMode} />
                    :<div className="item-nothing" >您还没有收藏过。</div>
                }
            </div>
        )
    }
}
const mapStateToProps = state => ({
    userInfo:state.userInfo,
    collectList:state.collectList
});
const mapDispatchToProps = dispatch => ({
    collectActions: bindActionCreators(collectAction, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Favor);
