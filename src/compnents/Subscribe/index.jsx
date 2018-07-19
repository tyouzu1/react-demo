import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {setCategoryData} from '../../fetch/category'

import BackHeader from '../BackHeader'
import Section from './subPage/Section'
import * as categoryAction from '../../actions/categoryAction';
import {postSubscribeData} from '../../fetch/subscribe'

import './style.less'

class Subscribe extends React.Component {


    state = {
        lsData: [],
        channelList: [],
        mediaList: [],
        tagList: [],
        index: 0
    }
    componentDidMount() {
        this.fetchData(1);
        this.setState({
            index: 1
        })
    }
    mediaData(index) {
        let result = postSubscribeData('媒体', index);
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

    channelData(index) {
        let result2 = postSubscribeData('频道', index);
        result2.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                channelList: json.data.channel,
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取user数据报错, ', ex.message)
            }
        });
    }

    tagData(index) {
        let result3 = postSubscribeData('话题', index);
        result3.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                tagList: json.data.tag,
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取user数据报错, ', ex.message)
            }
        });
    }

    fetchData(index) {
        this.mediaData(index);
        this.channelData(index)
        this.tagData(index);
        const lsData = this.props.category.tag;
        this.setState({
            lsData: lsData
        });
    }



    handleClick() {
        if (this.state.index === 1) {
            this.mediaData();
        } else if (this.state.index === 3) {
            this.tagData();
        }
    }

    handleSelect(index) {
        this.setState({
            index: index
        })
    }

    handleChange(data) {
        let categoryResult = setCategoryData(data);
        categoryResult.then(res => {
            return res.json()
        }).then((json) => {
            this.props.categoryActions.update(json);
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取分类数据报错, ', ex.message)
            }
        });
    }


    setSubscribeFn(data,model) {
        console.log(data,2121122)
        let newData = [].concat(this.state.lsData);
        if(model){
            // if(data.type="chosen"){
                // newData.unshift(data);
            // }else{
                newData.push(data);
            // }
        }else if(!model){
            newData = newData.filter(item=>
                item.name!==data.name
            )
        }
        this.setState({
            lsData: newData
        });
        const categoryData = {
            tag: newData,
            push: []
        }
        this.handleChange(categoryData);
        // this.props.categoryActions.update(categoryData);
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
            >
            <div>
                <BackHeader title="订阅中心" link="/"/>
                <Link to="/subscribe/search" className="subscribe-search">
                    <div className="subscribe-search-box">搜索任意关键词即可订阅</div>
                </Link>
                <div className="subscribe-search-content">
                    <div className="content-nav">
                        <b className={"content-nav-items" + (this.state.index === 1 ? ' choose' : '')}
                           onClick={() => this.handleSelect(1)}>媒体</b>
                        <b className={"content-nav-items" + (this.state.index === 2 ? ' choose' : '')}
                           onClick={() => this.handleSelect(2)}>频道</b>
                        <b className={"content-nav-items" + (this.state.index === 3 ? ' choose' : '')}
                           onClick={() => this.handleSelect(3)}>话题</b>
                        <b className={"refresh" + (this.state.index === 2 ? 'Dis' : '')} onClick={() => {
                            if (this.state.index === 2) {
                                return
                            }
                            this.handleClick();
                        }}>换一批</b>
                    </div>
                    <div className="content-container">
                        <Section style={this.state.index===1?{display:'block'}:{display:'none'}}
                            data={this.state.mediaList} lsData={this.state.lsData}
                                 setSubscribeFn={this.setSubscribeFn.bind(this)}/>
                        <Section style={this.state.index===2?{display:'block'}:{display:'none'}}
                            data={this.state.channelList} lsData={this.state.lsData} fixed
                                 setSubscribeFn={this.setSubscribeFn.bind(this)}/>
                        <Section style={this.state.index===3?{display:'block'}:{display:'none'}}
                            data={this.state.tagList} lsData={this.state.lsData}
                                 setSubscribeFn={this.setSubscribeFn.bind(this)}/>
                    </div>
                    <Link to="/subscribe/manage" className="content-btn">管理我的订阅</Link>
                </div>
            </div>
            </ReactCSSTransitionGroup>
        )
    }
}


const mapStateToProps = state => ({
    category: state.category
});

const mapDispatchToProps = dispatch => ({
    categoryActions: bindActionCreators(categoryAction, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Subscribe);