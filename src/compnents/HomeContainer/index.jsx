import React from 'react'
import Header from '../Header'
import Swiper from '../Swiper'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class HomeContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render (){

        return (
            <div>
                <Header />
                <Swiper />
                body
            </div>
        )
    }
}

export default HomeContainer;