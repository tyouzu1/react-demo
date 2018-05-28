import React from 'react'
import {Link,withRouter} from 'react-router'

import {getNewsData} from "../../../fetch/news";

import './style.less'

class NavBar extends React.Component {

    state = {
        rotate:false
    }
    fetchData(location) {
        this.setState({
            initDone: false,
        });
        //改变url为 / 时 继续取出默认的数据 （推荐）
        const type = location.pathname.split('/').pop().replace('news','')||'%E6%8E%A8%E8%8D%90';
        let newsResult = getNewsData(type);
        newsResult.then(res => {
            return res.json()
        }).then((json) => {
            const toppic = json.data.toppic,
                newsList = json.data.top.concat(json.data.news),
                hasmore = json.data.hasmore;
            this.setState({
                carousel: toppic,
                newsList: newsList,
                loadMore: hasmore,
                initDone: true,
                page: 1,
                isLoadingMore: false,
            });
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取news数据报错, ', ex.message)
            }
        });
    }
    handleAni = () =>{
        this.setState({
            rotate:true
        })
    }
    handleReset = () =>{
        window.fetchDataNow(this.props.location)
        this.setState({
            rotate:false       
        })
    }
    render() {
        return (
            <div className="nav-header">
                <div className="nav-header-container clear-fix">
                    <a href='/'>
                        <i className="icon-home float-left">
                        </i>
                    </a>

                    <Link to='/profile/home'>
                        <i className="icon-user float-left">
                        </i>
                    </Link>
                    <span className="nav-text">热搜新闻<span onAnimationEnd={this.handleReset} className={this.state.rotate?"nav-btn rotate":"nav-btn"} onClick={this.handleAni} ></span></span>
                    <Link to='/subscribe/home'><i className="icon-plus float-right"></i> </Link>
                    <Link to='/searchpage/home'>
                        <i className="icon-search float-right">
                        </i>
                    </Link>
                </div>
            </div>
        )
    }
}

export default withRouter(NavBar);