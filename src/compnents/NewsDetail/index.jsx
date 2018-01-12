import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import DetailHeader from './subPage/DetailHeader'
import Content from './subPage/Content'
import Comment from './subPage/Comment'
import Loading from '../Loading'
import {getNewsDetailData, getNewsCommentCountData} from '../../fetch/news'
import LocalStore from '../../util/localStore'
import {FONT_SIZE} from '../../config/localStoreKey'
import * as collectAction from '../../actions/collectlistAction';

import './style.less'

class NewsDetail extends React.Component {

    state = {
        data: [],
        fontSize: 1,
        show:false,
        commentCount:0
    }

    componentDidMount() {
        let id = this.props.params.name;
        this.fetchData(id);
        this.fetchCountData(id);
    }

    fetchData(id) {
        const fontSize = parseInt(LocalStore.getItem(FONT_SIZE))||2;
        let result = getNewsDetailData(id);
        result.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                data: json.data.news,
                fontSize: fontSize,
                show:true
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取user数据报错, ', ex.message)
            }
        });
    }

    fetchCountData(id) {
        let result = getNewsCommentCountData(id);
        result.then(res => {
            return res.json()
        }).then((json) => {
            console.log(json)
            this.setState({
                commentCount:json.data.count
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
        if (!this.props.collectList.includes(this.state.data[0])){
            this.props.collectActions.addItem(this.state.data[0])
        }else if (this.props.collectList.includes(this.state.data[0])){
            this.props.collectActions.removeItem(this.state.data[0])
        }
    }

    render() {
        let favor;
        let id;
        if(this.state.show){
            id = this.state.data[0].nid;
           favor = !!this.props.collectList.filter(item=>{
               console.log(item.nid,id,333)
               return item.nid===id
           })[0];
        }
        return (
            this.state.data.length
                ? <div className={"font-size-" + this.state.fontSize}>
                    <div style={{position: 'relative', display: 'block'}}>
                        <DetailHeader/>
                        <Content data={this.state.data[0]} change={this.handleChange.bind(this)}/>
                        {this.state.show&&<Comment id={id} commentCount={this.state.commentCount} favorFn={this.handleFavor.bind(this)} favor={favor?' done':''} />}
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

