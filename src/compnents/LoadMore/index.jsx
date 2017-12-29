import React from 'react'

import './style.less'

class LoadMore extends React.Component {

    render() {

        return (
            <div className="load-more-container">
                {
                    this.props.isLoadingMore
                        ? <div className="loading">
                            加载中...
                        </div>
                        : <div className="load-more">
                            加载更多...
                        </div>
                }
            </div>
        )
    }
}

export default LoadMore;