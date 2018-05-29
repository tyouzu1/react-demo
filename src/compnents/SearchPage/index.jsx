import React from 'react'
import {withRouter} from 'react-router'

import BackHeader from '../BackHeader'
import NewsList from '../News/subPage/NewsList'

import { getSearchNewsData } from '../../fetch/news'
import LocalStore from '../../util/localStore'
import {BD_NEWS_WEBAPP_SHOW_IMAGE} from '../../config/localStoreKey'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './style.less'
class SearchPage extends React.Component {
    state = {
        searchKey: this.props.params.key,
        list:[]
    }
    componentDidMount(){
        console.log(this.props)
        if(this.props.params.key){
            this.handleSearch()
        }
    }
    onInput = (e) => {
        if (e.target.value) {
            this.setState({
                searchKey: e.target.value,
            })
        } else {
            this.setState({
                searchKey: e.target.value,
            })
        }
    }
    onKeyPress(e){
        console.log(e)
        var keyCode = null;

        if(e.which)
            keyCode = e.which;
        else if(e.keyCode) 
            keyCode = e.keyCode;
            
        if(keyCode == 13) 
        {
            this.handleSearch();
            return false;
        }
        return true;
    }
    handleSearch() {
        if(this.state.searchKey){
            let newsResult = getSearchNewsData(this.state.searchKey);
            newsResult.then(res => {
                return res.json()
            }).then((json) => {
                this.setState({
                    list:json.data.news,
                })
            }).catch(ex => {
                if (__DEV__) {
                    console.error('获取分类数据报错, ', ex.message)
                }
            });
        }
    }
    render() {
        let { searchKey } = this.state
        const imageMode = LocalStore.getItem(BD_NEWS_WEBAPP_SHOW_IMAGE) !== "false";

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
                    <div className="search-container">
                        <div><input type="text" name="key" onKeyPress={this.onKeyPress.bind(this)} maxLength="20" defaultValue={searchKey} onInput={this.onInput} placeholder="请输入关键词进行搜索" />
                            {/* <a href={"https://www.baidu.com/s?word="+searchKey}>搜索
                        </a> */}
                            <a onClick={this.handleSearch.bind(this)} >搜索
                        </a>
                        </div>
                    </div>
                    {this.state.list.length?<NewsList data={this.state.list} imageMode={imageMode}/>:null}
                </div>

            </ReactCSSTransitionGroup>
        )
    }
}

export default withRouter(SearchPage);