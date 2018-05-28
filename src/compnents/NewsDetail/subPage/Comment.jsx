import React from 'react'
import {hashHistory} from 'react-router'

import './style.less'
class Comment extends React.Component {
    handleFavor(){
        if(this.props.login){
            this.props.favorFn();
        }else{
            hashHistory.push('/login/true')
        }
    }
    handleClick(){
        if(this.props.login){
            hashHistory.push('/comment/'+this.props.id)
        }else{
            hashHistory.push('/login/true')
        }
    }
    render() {
        return (
            <div className="comment clearfix" >
                <div className="comment-container">
                    <div className="comment-count-container float-right">
                        <div className="comment-count" onClick={()=>this.handleClick()} >
                            <div className="comment-num" >{this.props.commentCount}</div>
                        </div>
                        <div className={"favor-icon"+this.props.favor} onClick={()=>this.handleFavor()}>
                        </div>
                    </div>
                    <div className="comment-text-container">
                        <div onClick={()=>this.handleClick()}>
                            <div className="comment-text">我来说两句...</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment;