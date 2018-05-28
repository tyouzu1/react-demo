import React from 'react'


import './style.less'

class CommentItem extends React.Component {
    state = {
        count: this.props.data.support_count,
        show: false,
        text:''
    }

    static time(time) {
        let date = new Date(time);//如果date为13位不需要乘1000
        let Y = date.getFullYear() + '年';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日 ';
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state !== nextState) {
            return true
        }
        return this.props.data !== nextProps.data;
    }

    handleReply() {
        this.setState({
            show: true
        })
    }

    handlePraise() {
        //TODO fetch 点赞
        this.setState({
            count: parseInt(this.props.data.support_count) + 1
        })
    }
    handleSent(){
        if(this.state.text){
            this.props.sentFn(`${this.state.text}//@${this.props.data.user_name}`)
            this.setState({
                show:false,
                text:'',
            });
        }else{
            alert('不能发送空的消息');
        }
    }
    handleChange(e){
        this.setState({
            text:e.target.value
        })
    }
    render() {
        const data = this.props.data;
        return (
            <div className="item clear-fix">
                <div className="float-left head-container">
                    <div className="head">
                        <img
                            src={data.user_pic}
                            alt={data.user_name}/>
                    </div>
                </div>
                <div className="comment-content">
                    <div className="info clear-fix">
                        <div className="username float-left">
                            <span>{data.user_name}</span>
                        </div>
                        <div className="reply float-right">
                            <div className="praise" onClick={() => this.handlePraise()}>{this.state.count} 赞</div>
                            <div className="reply-btn" onClick={() => this.handleReply()}>回复</div>
                        </div>
                    </div>
                    <div className="time">{CommentItem.time(data.ts)}</div>
                    <div className="content">{data.text}</div>
                    {this.state.show && <div className="reply-container">
                        <div className="reply-content">
                            <textarea placeholder={data.user_name + ":"} value={this.state.text} onChange={(e)=>this.handleChange(e)}>
                            </textarea>
                        </div>
                        <div className="status">
                            <div className="sent" onClick={()=>this.handleSent()}>回复</div>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

export default CommentItem;