import React from 'react'
import BackHeader from '../BackHeader'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class SearchPage extends React.Component {

    render() {

        return (
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
            >
            <div>
                <BackHeader title="搜新闻" />
            </div>
            </ReactCSSTransitionGroup>
        )
    }
}

export default SearchPage;