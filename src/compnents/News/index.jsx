import React from 'react'
import {withRouter} from 'react-router'

import {getNewsData} from "../../fetch/news";
import {postAddNewsData} from "../../fetch/news";
import Loading from '../Loading'
import LoadMore from '../LoadMore'
import LocalStore from '../../util/localStore'
import {BD_NEWS_WEBAPP_SHOW_IMAGE} from '../../config/localStoreKey'
import Swiper from './subPage/Swiper'
import NewsList from './subPage/NewsList'

import './style.less'

class News extends React.Component {

    state = {
        initDone: false,
        index: 0,
        carousel: [],
        newsList: [],
        loadMore: true,
        isLoadingMore: true,
        page: 0,
    };

    componentWillMount() {
        console.log('新闻内容WillMount');
        this.fetchData(this.props.location);
    }

    componentDidMount() {
        //首次加载页面
        // this.fetchData(this.props.location);
        // let newsResult = getNewsData('%E6%8E%A8%E8%8D%90');
        // newsResult.then(res => {
        //     return res.json()
        // }).then((json) => {
        //     this.setState({
        //         carousel: json.data.toppic,
        //         newsList: json.data.top.concat(json.data.news),
        //         loadMore: json.data.hasmore,
        //         initDone: true,
        //         page: 1,
        //         isLoadingMore: false,
        //     });
        // }).catch(ex => {
        //     if (__DEV__) {
        //         console.error('获取news数据报错, ', ex.message)
        //     }
        // });

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            this.fetchData(nextProps.location);
        }
    }

    handleLoadMore() {
        this.setState({
            isLoadingMore: true
        });
        //触发，加载数据
        let result = postAddNewsData(this.state.page + 1);
        result.then(res => {
            return res.json()
        }).then(json => {
            const newsList = json.data.news,
                loadMore = json.data.hasmore;
            this.setState({
                newsList: this.state.newsList.concat(newsList),
                loadMore: loadMore,
                page: this.state.page + 1,
                isLoadingMore: false
            });
        }).catch(ex => {
            if (__DEV__) {
                console.error('首页”猜你喜欢“获取数据报错, ', ex.message)
            }
        });
    }

    render() {

        const imageMode = LocalStore.getItem(BD_NEWS_WEBAPP_SHOW_IMAGE) !== "false";

        return (

            this.state.initDone
                ? <div className="news-container">
                    {imageMode && <Swiper data={this.state.carousel}/>}
                    <NewsList data={this.state.newsList} imageMode={imageMode}/>
                    {this.state.loadMore &&
                    <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.handleLoadMore.bind(this)}/>}
                </div>
                : <Loading/>

        )
    }
}

export default withRouter(News);