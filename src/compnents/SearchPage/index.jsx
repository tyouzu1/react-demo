import React from 'react'
import BackHeader from '../BackHeader'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './style.less'
class SearchPage extends React.Component {
    state={
        searchKey:'',
    }
    onInput=(e)=>{
        if(e.target.value){
            this.setState({
                searchKey:e.target.value,
            })
        }else{
            this.setState({
                searchKey:e.target.value,
            })
        }
    }
    render() {
        let {searchKey} = this.state

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
                       <div><input type="text" name="key" maxLength="20" value={searchKey} onInput={this.onInput} placeholder="请输入关键词进行搜索" />
                        <a href={"https://www.baidu.com/s?word="+searchKey}>搜索
                        </a>
                           </div> 
                </div>
            </div>
            
            </ReactCSSTransitionGroup>
        )
    }
}

export default SearchPage;