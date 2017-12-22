import React from 'react'
import NavBar from './subPage/NavBar'
import Category from './subPage/Category'
import {connect} from 'react-redux'

import './style.less'

class HomeContainer extends React.Component {



    render (){

        return (
            <div className="header-container">
                <NavBar  data={this.props.userInfo} />
                <Category data={this.props.category} />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    category: state.category,
    userInfo:state.userInfo
});

const mapDispatchToProps = dispatch => ({
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);
