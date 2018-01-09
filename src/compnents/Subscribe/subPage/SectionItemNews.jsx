import React from 'react'
import NewsList from '../../News/subPage/NewsList'
import BackHeader from '../../BackHeader'
import Loading from '../../Loading'
import {getSubscribeNewsData,postAddNewsData} from '../../../fetch/news'
import LoadMore from '../../LoadMore'

import './style.less'

class SectionItemNews extends React.Component {

    state = {
        initDone: false
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const type = encodeURIComponent(this.props.params.name)
        let newsResult = getSubscribeNewsData(type);
        newsResult.then(res => {
            return res.json()
        }).then((json) => {
            const newsList = json.data.top.concat(json.data.news),
                hasmore = json.data.hasmore;
            this.setState({
                newsList: newsList,
                loadMore: hasmore,
                initDone: true,
                page: 1,
                isLoadingMore: false,
            });
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取news数据报错, ', ex.message)
            }
        });
    }
    handleLoadMore() {
        this.setState({
            isLoadingMore: true
        });
        //触发，加载数据
        let result = postAddNewsData(this.state.page + 1);
        result.then(res => {
            return res.json()
        }).then(json => {
            const newsList = json.data.news,
                loadMore = json.data.hasmore;
            this.setState({
                newsList: this.state.newsList.concat(newsList),
                loadMore: loadMore,
                page: this.state.page + 1,
                isLoadingMore: false
            });
        }).catch(ex => {
            if (__DEV__) {
                console.error('首页”猜你喜欢“获取数据报错, ', ex.message)
            }
        });
    }
    render() {
        const title = this.props.params.name;
        return (
            <div>
                <BackHeader title={title}/>
                {
                    this.state.initDone
                        ? <NewsList data={this.state.newsList} imageModle={false}/>
                        : <div style={{position: 'relative'}}>
                            <Loading/>
                        </div>
                }
                {this.state.loadMore &&
                <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.handleLoadMore.bind(this)}/>}
            </div>
        )
    }
}

export default SectionItemNews;