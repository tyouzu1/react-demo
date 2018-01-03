import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import BackHeader from '../BackHeader'
import Section from './subPage/Section'
import * as categoryAction from '../../actions/categoryAction';

import './style.less'
class Subscribe extends React.Component {


    state = {
        lsData:[]

    }


    componentDidMount(){
        //TODO 三个action fetch请求
        const lsData=this.props.category.tag;
        this.setState({
            lsData:lsData
        });
    }

    handleClick(){


    }

    render() {

        return (
            <div>
                <BackHeader title="订阅中心" link="/" />
                <Link to="/subscribe/search" className="subscribe-search">
                    <div className="subscribe-search-box">搜索任意关键词即可订阅</div>
                </Link>
                <div className="subscribe-search-content">
                    <div className="content-nav">
                        <b className="content-nav-items  choose">媒体</b>
                        <b className="content-nav-items">频道</b>
                        <b className="content-nav-items">话题</b>
                        <b className="refresh">换一批</b>
                    </div>
                    <div className="content-container">
                        <Section />
                    </div>
                    <Link to="/subscribe/manage" className="content-btn">管理我的订阅</Link>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    category:state.category
});

const mapDispatchToProps = dispatch => ({
    categoryActions: bindActionCreators(categoryAction, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Subscribe);