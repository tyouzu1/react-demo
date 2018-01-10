import React from 'react'
import {hashHistory} from 'react-router'

import {postSetSubscribeData} from '../../../fetch/subscribe'

import './style.less'
class SectionItem extends React.Component {
    state={
        className:false
    }
    componentWillMount(){
        this.setState({
            className:this.props.check
        })
    }
    handleChange(){
        this.props.setSubscribeFn(this.props.item,!this.state.className);
        this.setState({
            className:!this.state.className
        })
    }
    setData(){
        let result = postSetSubscribeData();
        result.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                mediaList: json.data.media,
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取user数据报错, ', ex.message)
            }
        });
    }
    handleClick(){
        if(this.props.fixed){
            return
        }
        hashHistory.push('/subscribe/news/' + encodeURIComponent(this.props.item.name))
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.check!==nextProps.check){
            return true
        }
       if (this.state!==nextState){
           return true
       }
        return this.props.item !== nextProps.item;
    }
    render() {
        return (
            <div className="item-wrapper">
                <div className={"item"+(this.state.className?" off":" on")}>
                    <span className="name" onClick={()=>this.handleClick()}>{this.props.item.name}</span>
                    <span className="icon" onClick={()=>this.handleChange()}>
                    </span>
                </div>
            </div>
        )
    }
}

export default SectionItem;