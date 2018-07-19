import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import BackHeader from '../../BackHeader'
import Section from './Section'

import * as categoryAction from '../../../actions/categoryAction';
import {postSubscribeData} from '../../../fetch/subscribe'

import './style.less'

class Search extends React.Component {

    state={
        searchKey:'',
        show:false,
        lsData: [],
        channelList: [],
        mediaList: [],
        tagList: [],
        index: 0
    }
    componentDidMount(){
        const lsData = this.props.category.tag;
        this.setState({
            lsData: lsData
        });
    }   
     tagData(index,key) {
        let result3 = postSubscribeData('话题', index,key);
        result3.then(res => {
            return res.json()
        }).then((json) => {
            this.setState({
                tagList: json.data.tag,
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('获取user数据报错, ', ex.message)
            }
        });
    }
    setSubscribeFn(data,model) {
        let newData = [].concat(this.state.lsData);
        if(model){
            newData.push(data);
        }else if(!model){
            newData = newData.filter(item=>
                item.name!==data.name
            )
        }
        this.setState({
            lsData: newData
        });
        const categoryData = {
            tag: newData,
            push: []
        }
        this.props.categoryActions.update(categoryData);
    }
    onInput=(e)=>{
        if(e.target.value){
            this.setState({
                searchKey:e.target.value,
                show:true,
            })
            this.tagData(4,e.target.value);
        }else{
            this.setState({
                searchKey:e.target.value,
            })
        }
        
    }
    render() {
        let {searchKey,show} = this.state
        return (
            <div>
                <BackHeader title="搜索订阅"  />
                <div className="search-page-container">
                    <div className="search-page">
                        <form >
                            <input type="text" maxLength="20" value={searchKey} onInput={this.onInput} placeholder="搜索任意关键词即可订阅" />
                            <span>
                            </span>
                        </form>
                    </div>
                </div>
                <div className="search-news-container" style={{display:show?'':'none'}}>
                    <Link className="search-news" to={"/searchpage/home/"+searchKey}>搜索“<span>{searchKey}</span>”的相关新闻</Link>
                </div>
                <div className="search-subscribe-container" >
                        <Section data={this.state.tagList} lsData={this.state.lsData}
                                    search
                                 setSubscribeFn={this.setSubscribeFn.bind(this)}/>
                    </div>
                {/* <div className="search-page-list">
                    <h3>话题({})</h3>
                    <h3>媒体({})</h3>
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    category: state.category
});

const mapDispatchToProps = dispatch => ({
    categoryActions: bindActionCreators(categoryAction, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);