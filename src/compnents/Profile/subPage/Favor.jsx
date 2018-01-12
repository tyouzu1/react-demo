import React from 'react'
import {connect} from 'react-redux'

import Back from '../../BackHeader'
import NewsList from '../../News/subPage/NewsList'

class Favor extends React.Component {
    render (){
        return (
            <div>
                <div className="">
                    <Back title="我的收藏"/>
                </div>
                    <NewsList data={this.props.collectList} imageMode={this.props.userInfo.imageMode} />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    userInfo:state.userInfo,
    collectList:state.collectList
});
const mapDispatchToProps = dispatch => ({
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Favor);
