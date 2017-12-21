import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import List from './CategoryItemList'
import Switchover from './CategorySwitchover'

import './style.less'

class Category extends React.Component {

    shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    state = {
        show: false
    };

    handleShow () {
        this.setState({
            show:true
        });
    };

    handleHide(){
        this.setState({
            show:false
        });
    };

    render() {
        return (
            <div className="nav-category">
                <List categoryData={this.props.data.tag} handleClick={this.handleShow.bind(this)}/>
                <Switchover categoryData={this.props.data.tag} handleClick={this.handleHide.bind(this)} className={this.state.show?'':' hide'}/>
            </div>
        )
    }
}

export default  Category;

