import React from 'react'

import './style.less'

class GoTop extends React.Component {

    state = {
        show: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 750) {
            this.setState({
                show: true
            })
        } else if (!this.state.display) {
            this.setState({
                show: false
            })
        }
    }

    handleClick = () => {
        window.scrollTo(0,0);
        this.setState({
            show: false
        })
    }

    render() {

        return (
            <div ref="aa">
                <div className="go-top-trigger icon-arrow-up2" style={{display: this.state.show ? 'block' : 'none'}}
                     onClick={this.handleClick}>
                </div>
            </div>
        )
    }
}

export default GoTop;