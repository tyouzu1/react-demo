import React from 'react'
import {Link} from 'react-router'
import BackHeader from '../../BackHeader'


import './style.less'
class Search extends React.Component {

    render() {

        return (
            <div>
                <BackHeader title="搜索订阅" btn />
                <div className="search-page-container">
                    <div className="search-page">
                        <form >
                            <input type="text" maxLength="20" placeholder="搜索任意关键词即可订阅" />
                            <span>
                            </span>
                        </form>
                    </div>
                </div>
                <div className="search-news-container">
                    <Link className="search-news" to="/search/">搜索“<span>{}</span>”的相关新闻</Link>
                </div>
                <div className="search-page-list">
                    <h3>话题({})</h3>
                    <h3>媒体({})</h3>
                </div>
            </div>
        )
    }
}

export default Search;