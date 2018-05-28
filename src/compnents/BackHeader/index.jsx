import React from 'react'
import {hashHistory,Link} from 'react-router'

import './style.less'
class Back extends React.Component {

    handleBack = () => {
        if(this.props.to){
            hashHistory.push(this.props.to);
        }else if(this.props.link){
            hashHistory.push('/');
        }else {
            window.history.back();
        }
    }
    handleChange=()=>{
      this.props.btn();
    }
    render (){
        const {title,btn} =this.props;
        return (
            <div className="back-header">
                <div className="back-container">
                    <i className="icon-arrow-left2" onClick={this.handleBack}>
                    </i>
                </div>
                <span className="back-title">{title?title:null}</span>
                {
                    btn&&<Link className="back-btn" onClick={this.handleChange}>完成</Link>
                }
            </div>

        )
    }
}

export default Back;