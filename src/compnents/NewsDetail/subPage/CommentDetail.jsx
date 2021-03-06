import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Back from '../../BackHeader'
import LoadMore from '../../LoadMore'
import {getNewsCommentData, postNewsCommentData} from '../../../fetch/news'
import CommentItem from './CommentItem'
import './style.less'

class CommentDetail extends React.Component {
    state = {
        data: [],
        hasMore:true,
        isLoadingMore:false,
        text:''
    }

    componentDidMount() {
        this.fetchData(this.props.params.id);
    }

    fetchData(id) {
        let result = getNewsCommentData(id);
        result.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                data: json.data.comments,
                hasMore:json.data.hasmore,
                isLoadingMore:false,
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取user数据报错, ', ex.message)
            }
        });
    }
    handleLoadMore (){
        this.setState({
            isLoadingMore:true
        });
        this.fetchData(this.props.params.id);
    }
    handleClick(){
        let text = this.state.text;
        if(text){
            let id = this.props.params.id;
            this.fetchComment(id,text)
        }else{
            alert("不能发送空的消息")
        }
    }
    fetchComment(id,text){
        let data = {
            id:id,
            text:text,
            ts:Date.parse(new Date()),
            support_count:0,
            user_pic:this.props.userInfo.image,
            user_name:this.props.userInfo.displayname
        }
        let result = postNewsCommentData(id,data);
        result.then(res => {
            return res.json()
        }).then((json) => {
           alert(json.data)
            if(json.success){
               this.setState({
                   data:[data].concat(this.state.data),
                   text:''
               })
            }
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取user数据报错, ', ex.message)
            }
        });
    }
    handleText(e){
        this.setState({
            text:e.target.value
        })
    }

    handleSent(text){
        if(text){
            let id = this.props.params.id;
            this.fetchComment(id,text)
        }else{
            alert("不能发送空的消息")
        }
    }

    render() {
        return (
            <div>
                <Back title="评论"/>
                <div className="comment-detail-container">
                    <div className="comment-detail-content">
                        <div className="comment-content-container">
                            <textarea placeholder="我来说两句..." onChange={(e)=>this.handleText(e)} value={this.state.text}>
                            </textarea>
                        </div>
                        <div className="comment-btn-container">
                            <div className="comment-btn" onClick={()=>this.handleClick()}>发表</div>
                        </div>
                    </div>
                    <div className="comment-detail-count">
                        <span>{this.state.data.length}</span>条评论
                    </div>
                    <div className="comment-detail-list">
                        <h3 className="yellow">
                            <span>最新评论</span>
                        </h3>
                        <div className="comment-list-container">
                            {
                                this.state.data.map((item,index)=>
                                    <CommentItem data={item} key={index} sentFn={this.handleSent.bind(this)} />
                                )
                            }
                        </div>
                    </div>
                </div>
                {this.state.hasMore
                    ?<LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.handleLoadMore.bind(this)}/>
                    : <div className="load-more">没有更多了...</div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userInfo:state.userInfo
});

const mapDispatchToProps = dispatch => ({
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentDetail);
