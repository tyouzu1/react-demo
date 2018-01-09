import React from 'react'
import {hashHistory} from 'react-router'
import './style.less'
class SectionItem extends React.Component {
    state={
        className:true
    }
    handleChange(){
        this.setState({
            className:!this.state.className
        })
    }
    handleClick(){
        if(this.props.fixed){
            return
        }
        hashHistory.push('/subscribe/news/' + encodeURIComponent(this.props.item.name))
    }
    render() {
        return (
            <div className="item-wrapper">
                <div className={"item"+(this.state.className?" on":" off")}>
                    <span className="name" onClick={()=>this.handleClick()}>{this.props.item.name}</span>
                    <span className="icon" onClick={()=>this.handleChange()}>
                    </span>
                </div>
            </div>
        )
    }
}

export default SectionItem;