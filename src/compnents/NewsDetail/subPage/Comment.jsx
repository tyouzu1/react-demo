import React from 'react'

import './style.less'
class Comment extends React.Component {
    handleFavor(){
        this.props.favorFn();
    }
    render() {

        return (
            <div className="comment clearfix" >
                <div className="comment-container">
                    <div className="comment-count-container float-right">
                        <div className="comment-count">
                            <div className="comment-num" >1</div>
                        </div>
                        <div className={"favor-icon"+this.props.favor} onClick={()=>this.handleFavor()}>
                        </div>
                    </div>
                    <div className="comment-text-container">
                        <div>
                            <div className="comment-text">我来说两句...</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comment;