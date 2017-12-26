import React from 'react'
import ReactSwipe from 'react-swipe'
import {getCarouselNewsData} from "../../fetch/news";
import SwiperItem from './SwiperItem'
import { withRouter } from 'react-router'
import LocalStore from '../../util/localStore'
import {NEWS_TYPE} from '../../config/localStoreKey'
import './style.less'

class News extends React.Component {

    state = {
        initDone: false,
        index: 0,
        carousel: [],
    };
    componentWillMount () {
        this.fetchData(this.props.location);
    }
    componentDidMount() {
        // //获取数据
        // let result = getCarouselNewsData();
        // result.then(res => {
        //     return res.json()
        // }).then((json) => {
        //     this.setState({
        //         carousel: json
        //     });
        //     // 更改状态
        //     this.setState({
        //         initDone: true
        //     })
        // }).catch(ex => {
        //     if (__DEV__) {
        //         console.error('获取轮播数据报错, ', ex.message)
        //     }
        // });


    }
    fetchData(location) {
        this.setState({
            initDone: false
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
                initDone: true
            });
            LocalStore.setItem(NEWS_TYPE,type);
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

                    this.state.initDone
                        ? <div className="news-container">
                            <ReactSwipe swipeOptions={opt}>
                                {this.state.carousel.data.news.map((item, index) =>
                                    <div className="carousel-item" key={index}>
                                        <SwiperItem data={item}/>
                                    </div>
                                )}
                            </ReactSwipe>

                        </div>
                        : <div>正在加载...</div>

        )
    }
}

export default withRouter(News);