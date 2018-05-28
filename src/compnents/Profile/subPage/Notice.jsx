import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Back from '../../BackHeader'
import { getNoticeData } from '../../../fetch/news'
import './style.less'

const time = (time) => {
    let date = new Date(time);//如果date为13位不需要乘1000
    let Y = date.getFullYear() + '年';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
    let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日 ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
}
const handleClick = (id) =>{
    hashHistory.push('/comment/'+id)
}
const ListItem = ({data}) => {
    
    return (
        <div onClick={()=>handleClick(data.id)} className="item clear-fix">
        <div className="float-left head-container">
            <div className="head">
                <img
                    src={data.user_pic}
                    alt={data.user_name} />
            </div>
        </div>
        <div className="comment-content">
            <div className="info clear-fix">
                <div className="username float-left">
                    <span>{data.user_name}</span>
                </div>
            </div>
            <div className="time">{time(data.ts)}</div>
            <div className="content">{data.text}</div>
        </div>
    </div>
    )
}

class Notice extends React.Component {

    state = {
        // check: true
        list:[],
        hasMore:false
    };


    // handleClick = (n) => {
    //     if (n===2&&this.state.check){
    //         this.setState({
    //             check: false
    //         });
    //     }else if (n===1&&!this.state.check){
    //         this.setState({
    //             check: true
    //         });
    //     }
    // };

    componentDidMount() {
        if (this.props.userInfo.isLogIn) {
            let collectResult = getNoticeData(this.props.userInfo.uname);
            collectResult.then(res => {
                return res.json()
            }).then((json) => {
                console.log(json.data.notice)
                this.setState({
                    list: json.data.notice,
                    hasMore: json.data.hasmore,
                })
            }).catch(ex => {
                if (__DEV__) {
                    console.error('获取分类数据报错, ', ex.message)
                }
            });
        } else {
            hashHistory.push('/')
        }
        //    fetch 获取数据
    }

    render() {
        console.log(this.state.list.length)
        return (
            <div className="notice-container">
                <Back title="我的评论" />
                {
                    this.state.list.length
                        ?this.state.list.map((item,index)=>{
                            console.log(<ListItem key={index} data={item} />)
                            return <ListItem key={index} data={item} />
                        }
                        
                    ):<div className="item-nothing" >您还没有进行评论。</div>
                   
                }
                {/* <div className="notice-btn-container">
                    <div className="notice-btn-border">
                        <span onClick={()=>this.handleClick(1)} className={this.state.check ? 'selected' : null}>动态</span>
                        <span onClick={()=>this.handleClick(2)} className={this.state.check ? null : 'selected'}>评论</span>
                    </div>
                </div> 
                <div>
                    {
                        (this.state.check&&<div>
                           动态
                       </div>)||
                        (!this.state.check&&<div>
                        评论
                        </div>)
                    }
                </div>*/}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notice);