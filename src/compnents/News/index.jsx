import React from 'react'
import ReactSwipe from 'react-swipe'
import {getCarouselNewsData} from "../../fetch/news";
import SwiperItem from './SwiperItem'

import './style.less'

class Swiper extends React.Component {

    state = {
        initDone: false,
        index: 0,
        carousel: [],
    };

    componentDidMount() {
        //获取数据
        let result = getCarouselNewsData();
        result.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                carousel: json
            });
            // 更改状态
            this.setState({
                initDone: true
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取轮播数据报错, ', ex.message)
            }
        });

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

export default Swiper;