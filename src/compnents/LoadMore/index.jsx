import React from 'react'

import './style.less'

class LoadMore extends React.Component {

    componentDidMount() {
        // 使用滚动时自动加载更多
        const loadMoreFn = this.props.loadMoreFn;
        const wrapper = this.refs.wrapper;
        let timeoutId;
        function callback() {
            const top = wrapper.getBoundingClientRect().top;
            const windowHeight = window.screen.height;
            if (top && top < windowHeight) {
                // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
                loadMoreFn()
            }
        }
        window.addEventListener('scroll', function () {
            if (this.props.isLoadingMore) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(callback, 50)
        }.bind(this), false);
    }

    loadMoreHandle() {
        // 执行传输过来的
        this.props.loadMoreFn();
    }

    render() {
        return (
            <div className="load-more-container" ref="wrapper">
                {
                    this.props.isLoadingMore
                        ? <div className="loading">
                            加载中...
                        </div>
                        : <div className="load-more" onClick={this.loadMoreHandle.bind(this)}>
                            加载更多...
                        </div>
                }
            </div>
        )
    }
}

export default LoadMore;