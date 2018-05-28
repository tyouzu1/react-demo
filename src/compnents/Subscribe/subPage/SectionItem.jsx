import React from 'react'
import {hashHistory} from 'react-router'

import {postSetSubscribeData} from '../../../fetch/subscribe'

import './style.less'
class SectionItem extends React.Component {
    handleChange(){
        this.props.setSubscribeFn(this.props.item,!this.props.check);
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
        return this.props.item.name !== nextProps.item.name;
    }
    render() {
        return (
            <div className="item-wrapper" style={{width:this.props.search?'100%':''}}>
                <div className={"item"+(this.props.check?" off":" on")}>
                    <span className="name" onClick={()=>this.handleClick()}>{this.props.item.name}</span>
                    <span className="icon" onClick={()=>this.handleChange()}>
                    </span>
                </div>
            </div>
        )
    }
}

export default SectionItem;