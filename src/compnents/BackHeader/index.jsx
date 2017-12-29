import React from 'react'

import './style.less'
class Back extends React.Component {

    handleBack = () => {
        window.history.back();
    }
    render (){
        const {title} =this.props;
        return (
            <div className="back-header">
                <div className="back-container">
                    <i className="icon-arrow-left2" onClick={this.handleBack}>
                    </i>
                </div>
                <span className="back-title">{title?title:null}</span>
            </div>

        )
    }
}

export default Back;