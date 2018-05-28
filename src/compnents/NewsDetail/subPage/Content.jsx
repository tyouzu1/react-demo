import React from 'react'
import { hashHistory } from 'react-router'

import './style.less'
import LocalStore from '../../../util/localStore'
import {getNewsLike} from '../../../fetch/news'

import {FONT_SIZE} from '../../../config/localStoreKey'

class Content extends React.Component {

    state = {
        showFontSet: false,
        showMore: true,
        like:this.props.data.like.like,
        count:this.props.data.like.count,
    }

    handleShow() {
        this.setState({
            showFontSet: !this.state.showFontSet
        })
    }

    handleOpen() {
            this.setState({
                showMore: false
            });
      
    }
    handleLike(){
        if(this.props.login){
            if(this.state.like){
                let result = getNewsLike(this.props.data.nid,0);
                result.then(res => {
                    return res.json()
                }).then((json) => {
                    this.setState({
                        like:json.data.like,
                        count:json.data.count,
                    })
                }).catch(ex => {
                    if (__DEV__) {
                        console.error('获取user数据报错, ', ex.message)
                    }
                });
               
            }else{
                let result = getNewsLike(this.props.data.nid,1);
                result.then(res => {
                    return res.json()
                }).then((json) => {
                    this.setState({
                        like:json.data.like,
                        count:json.data.count,
                    })
                }).catch(ex => {
                    if (__DEV__) {
                        console.error('获取user数据报错, ', ex.message)
                    }
                });
            }
            
        }else{
            hashHistory.push('/login/true')
        }
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

    render() {
        const fontSize = parseInt(LocalStore.getItem(FONT_SIZE));
        const data = this.props.data;
        return (
            <div className={"detail-container" + (this.state.showMore ? " show-more" : '')}>
                <div className="detail-content-container">
                    <div className="detail-content-main">
                        <div className="detail-content-header">
                            <h2>{data.abs}</h2>
                            <div className="header-info">
                                <span>{data.site.substring(0,10)}</span>
                                <span style={{marginLeft: '8px'}}>{Content.time(parseInt(data.sourcets))}</span>
                                <div className="info-group">
                                    <div className="info-group-item info-group-font" onClick={() => this.handleShow()}>
                                        <div className="info-set-font"
                                             style={{display: this.state.showFontSet ? 'block' : 'none'}}>
                                            <div className={"font-item" +
                                            (fontSize === 4
                                                    ? ' end'
                                                    : ''
                                            )
                                            }
                                                 onClick={() => this.props.change(true)}>A+
                                            </div>
                                            <div className={"font-item" +
                                            (fontSize === 1
                                                    ? ' end'
                                                    : ''
                                            )}
                                                 onClick={() => this.props.change(false)}>A-
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="detail-content">
                            {
                                data.content.map((item, index) => {
                                        if (item.type === 'text') {
                                            return (
                                                <p key={index} className={index === 0 ? 'first-p' : ''}
                                                   dangerouslySetInnerHTML={{__html: item.data}}/>
                                            )
                                        } else if (item.type === 'image') {
                                            return (
                                                <div key={index} className="image-container">
                                                    <img src={item.data.small.url_webp || item.data.small.url}/>
                                                </div>
                                            )
                                        }
                                    }
                                )
                            }
                        </div>
                        <div className="link-container clearfix">
                            <div className="float-left"><a
                                href={data.url}>查看原文 &gt;</a>
                            </div>
                            <div className={"float-right"+(this.state.like?' uping':'')} onClick={()=>this.handleLike()}>
                                <span className={"up-container"+(this.state.like?' clicked':'')}>{this.state.count}
                                </span>
                                <span className="up-plus1">+1</span></div>
                        </div>
                        <div className="show-more-end">
                        </div>
                    </div>

                    <div className="show-more-btn-container">
                        <div className="show-more-btn">
                            <i className="arrow-bottom-blue">
                            </i>
                            <span className="show-more-text" onClick={() => this.handleOpen()}>展开余下全文</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Content;

//TODO 点赞