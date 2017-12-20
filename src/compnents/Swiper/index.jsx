import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactSwipe from 'react-swipe'
import {Link} from 'react-router'


class Swiper extends React.Component {

    shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    state = {
        index: 0
    }

    render() {
        const opt = {
            auto: 1100,
            callback: function (index) {
                this.setState({
                    index: index
                })
            }.bind(this)
        }
        return (
            <div>
                <ReactSwipe swipeOptions={opt}>
                    <div className="carousel-item">
                        <div style={{height:'200px',backgroundColor:'#7bff84'}}>

                        </div>
                    </div>
                    <div className="carousel-item">
                        <div style={{height:'200px',backgroundColor:'#fdff70'}}>

                        </div>
                    </div>
                    <div className="carousel-item">
                        <div style={{height:'200px',backgroundColor:'#62fffc'}}>

                        </div>
                    </div>
                </ReactSwipe>
            </div>
        )
    }
}

export default Swiper;