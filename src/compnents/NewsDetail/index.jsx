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
        commentCount:0,
        like:{
            count:0,
            like:false
        }
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
            console.log(json.data.news)
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
                commentCount:json.data.count,
                like:json.data.like,
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
        let data = {
            abs:this.state.data[0].abs,
            imageurls:this.state.data[0].imageurls,
            nid:this.state.data[0].nid,
            site:this.state.data[0].site,
            title:this.state.data[0].title,
            url:this.state.data[0].url,
            tag:this.state.data[0].tag,
            type:this.state.data[0].type,
        }
        const include = this.props.collectList.filter(item=>item.nid==this.state.data[0].nid);
        console.log(!!include.length)
        if (!!include.length){
            this.props.collectActions.removeItem(data)
        }else{
            this.props.collectActions.addItem(data)
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
                        <Content data={this.state.data[0]} login={this.props.userInfo.isLogIn} change={this.handleChange.bind(this)}/>
                        {this.state.show&&<Comment 
                        id={id}
                         login={this.props.userInfo.isLogIn} 
                         like={this.state.like} 
                         commentCount={this.state.commentCount} 
                         favorFn={this.handleFavor.bind(this)} favor={favor?' done':''} />}
                    </div>
                </div>
                : <Loading/>
        )
    }
}
const mapStateToProps = state => ({
    collectList:state.collectList,
    userInfo:state.userInfo
});

const mapDispatchToProps = dispatch => ({
    collectActions: bindActionCreators(collectAction, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsDetail);

