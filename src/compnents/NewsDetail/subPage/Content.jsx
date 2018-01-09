import React from 'react'

import './style.less'
import LocalStore from '../../../util/localStore'
import {FONT_SIZE} from '../../../config/localStoreKey'

class Content extends React.Component {

    state = {
        showFontSet: false,
    }

    handleShow() {
        this.setState({
            showFontSet: !this.state.showFontSet
        })
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
            <div className="detail-content-container">
                <div className="detail-content-main" style={{maxHeight: '980px'}}>
                    <div className="detail-content-header">
                        <h2>{data.abs}</h2>
                        <div className="header-info">
                            <span>{data.site}</span>
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
                            href="http://news.cctv.com/2018/01/09/ARTIY39UfcwYdRxfSGIhFvwM180109.shtml">查看原文 &gt;</a></div>
                        <div className="float-right"><span className="up-container"  >18</span><span
                            className="up-plus1">+1</span></div>
                    </div>
                    <div className="show-more-end">
                    </div>
                </div>

                <div className="show-more-btn-container">
                    <div className="show-more-btn">
                        <i className="arrow-bottom-blue">
                        </i>
                        <span className="show-more-text">展开余下全文</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Content;