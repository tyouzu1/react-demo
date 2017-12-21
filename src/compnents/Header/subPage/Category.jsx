import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import * as allActions from '../../../actions';
import List from './CategoryItemList'
import Switchover from './CategorySwitchover'

import './style.less'

class Category extends React.Component {

    shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    state = {
        category: [],
        show: false
    };

    componentDidMount() {

        this.setState({
            category: this.state.category.concat(this.props.nav.tag),
        });
    }

    handleShow () {
        this.setState({
            show:true
        });
        console.log('show')
    };

    handleHide(){
        this.setState({
            show:false
        });
        console.log('hide')
    };

    render() {
        return (
            <div className="nav-category">
                <List categoryData={this.state.category} handleClick={this.handleShow.bind(this)}/>
                <Switchover categoryData={this.state.category} handleClick={this.handleHide.bind(this)} className={this.state.show?'':' hide'}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    nav: state.nav
});

const mapDispatchToProps = dispatch => ({
    navActions: bindActionCreators(allActions, dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category);

