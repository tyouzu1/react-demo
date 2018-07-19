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
                            src={data.user_pic||"data:image/jpeg;base64,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"}
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