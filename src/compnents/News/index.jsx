import React from 'react'
import ReactSwipe from 'react-swipe'
import {withRouter} from 'react-router'

import {getNewsData} from "../../fetch/news";
import SwiperItem from './subPage/SwiperItem'
import NewsItem from './subPage/NewsItem'
import Loading from '../Loading'
import LoadMore from '../LoadMore'
import LocalStore from '../../util/localStore'
import {BD_NEWS_WEBAPP_SHOW_IMAGE} from '../../config/localStoreKey'

import './style.less'

class News extends React.Component {

    state = {
        initDone: false,
        index: 0,
        carousel: [],
        newsList: [],
        loadMore: true,
        isLoadingMore: false,
    };

    componentWillMount() {
        // this.fetchData(this.props.location);
    }

    componentDidMount() {
        //首次加载页面
        let newsResult = getNewsData('%E6%8E%A8%E8%8D%90');
        newsResult.then(res => {
            return res.json()
        }).then((json) => {
            console.log(json.data)
            this.setState({
                carousel: json.data.toppic,
                newsList: json.data.top.concat(json.data.news),
                loadMore: json.data.hasmore,
                initDone: true,
            });
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取news数据报错, ', ex.message)
            }
        });
    }

    fetchData(location) {
        console.log(11)
        this.setState({
            initDone: false,
        });
        //改变url为 / 时 继续取出默认的数据 （推荐）
        const type = location.pathname.replace('/', '') || '%E6%8E%A8%E8%8D%90';
        let newsResult = getNewsData(type);
        newsResult.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                carousel: json.data.toppic,
                newsList: json.data.top.concat(json.data.news),
                loadMore: json.data.hasmore,
                initDone: true,
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

    render() {
        const opt = {
            // auto: 2100,
            callback: function (index) {
                this.setState({
                    index: index
                })
            }.bind(this)
        };
        const imageMode = LocalStore.getItem(BD_NEWS_WEBAPP_SHOW_IMAGE)=="false"?false:true ;

        return (

            this.state.initDone
                ? <div className="news-container">
                    {imageMode && <ReactSwipe swipeOptions={opt}>
                        {this.state.carousel.map((item, index) =>
                            <div className="carousel-item" key={index}>
                                <SwiperItem data={item}/>
                            </div>
                        )}
                    </ReactSwipe>}
                    <div className="news-list-container">
                        {
                            this.state.newsList.map((item, index) =>
                                <NewsItem data={item} key={index} imageMode={imageMode} />
                            )
                        }
                    </div>
                    {this.state.loadMore && <LoadMore isLoadingMore={this.state.isLoadingMore}/>}
                </div>
                : <Loading/>

        )
    }
}

export default withRouter(News);