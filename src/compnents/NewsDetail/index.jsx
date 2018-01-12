import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import DetailHeader from './subPage/DetailHeader'
import Content from './subPage/Content'
import Comment from './subPage/Comment'
import Loading from '../Loading'
import {getNewsDetailData} from '../../fetch/news'
import LocalStore from '../../util/localStore'
import {FONT_SIZE} from '../../config/localStoreKey'
import * as collectAction from '../../actions/collectlistAction';

import './style.less'

class NewsDetail extends React.Component {

    state = {
        data: [],
        fontSize: 1,
    }

    componentDidMount() {
        let id = this.props.params.name;
        this.fetchData(id);
    }

    fetchData(id) {
        const fontSize = parseInt(LocalStore.getItem(FONT_SIZE));
        let result = getNewsDetailData(id);
        result.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                item:json.data,
                data: json.data.news,
                fontSize: fontSize
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取user数据报错, ', ex.message)
            }
        });
    }

    handleChange(model) {
        if (model) {
            let fontSize = this.state.fontSize + 1
            if (fontSize >= 5) {
                fontSize--
            }
            this.setState({
                fontSize: fontSize
            })
            LocalStore.setItem(FONT_SIZE, fontSize)
        } else if (!model) {
            let fontSize = this.state.fontSize - 1
            if (fontSize <= 0) {
                fontSize++
            }
            this.setState({
                fontSize: fontSize
            })
            LocalStore.setItem(FONT_SIZE, fontSize)
        }
    }

    handleFavor(){
        if (!this.props.collectList.includes(this.state.item)){
            this.props.collectActions.addItem(this.state.item)
        }
    }

    render() {

        return (
            this.state.data.length
                ? <div className={"font-size-" + this.state.fontSize}>
                    <div style={{position: 'relative', display: 'block'}}>
                        <DetailHeader/>
                        <Content data={this.state.data[0]} change={this.handleChange.bind(this)}/>
                        <Comment favor={this.handleFavor.bind(this)} />
                    </div>
                </div>
                : <Loading/>
        )
    }
}
const mapStateToProps = state => ({
    collectList:state.collectList
});

const mapDispatchToProps = dispatch => ({
    collectActions: bindActionCreators(collectAction, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsDetail);

