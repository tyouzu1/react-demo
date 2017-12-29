import React from 'react'
import SwiperItem from './SwiperItem'
import ReactSwipe from 'react-swipe'


class Swiper extends React.Component {

    render() {
        const opt = {
            // auto: 2100,
            callback: function (index) {
                this.setState({
                    index: index
                })
            }.bind(this)
        };
        return (

            <ReactSwipe swipeOptions={opt}>
                {this.props.data.map((item, index) =>
                    <div className="carousel-item" key={index}>
                        <SwiperItem data={item}/>
                    </div>
                )}
            </ReactSwipe>
        )
    }
}

export default Swiper;