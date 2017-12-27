import React from 'react'
import ReactSwipe from 'react-swipe'
import {withRouter} from 'react-router'

import {getCarouselNewsData, getNewsData} from "../../fetch/news";
import SwiperItem from './subPage/SwiperItem'
import NewsItem from './subPage/NewsItem'
import Loading from '../Loading'

import './style.less'

class News extends React.Component {

    state = {
        carouselInitDone: false,
        newsInitDone: false,
        index: 0,
        carousel: [],
        data:[]
    };

    componentWillMount() {
        this.fetchData(this.props.location);
    }

    componentDidMount() {

    }

    fetchData(location) {
        this.setState({
            carouselInitDone: false,
            newsInitDone: false
        });
        //默认推荐
        const type = location.pathname.replace('/', '') || '%E6%8E%A8%E8%8D%90';
        let result = getCarouselNewsData(type);
        result.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                carousel: json
            });
            // 更改状态
            this.setState({
                carouselInitDone: true
            });
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取轮播数据报错, ', ex.message)
            }
        });

        let newsResult = getNewsData(type);
        newsResult.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                data: json.data
            });
            // 更改状态
            this.setState({
                newsInitDone: true
            });
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取轮播数据报错, ', ex.message)
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
            auto: 2100,
            callback: function (index) {
                this.setState({
                    index: index
                })
            }.bind(this)
        };
        return (

            (this.state.carouselInitDone && this.state.newsInitDone)
                ? <div className="news-container">
                    <ReactSwipe swipeOptions={opt}>
                        {this.state.carousel.data.news.map((item, index) =>
                            <div className="carousel-item" key={index}>
                                <SwiperItem data={item}/>
                            </div>
                        )}
                    </ReactSwipe>
                <div className="news-list-container">
                    <NewsItem data={this.state.data.top[0]} />
                    {
                        this.state.data.news.map((item,index)=>
                            <NewsItem data={item} key={index} />
                        )
                    }
                </div>

                </div>
                : <Loading />

        )
    }
}

export default withRouter(News);