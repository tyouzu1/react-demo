import React from 'react'

import './style.less'
class Loading extends React.Component {

    render() {

        return (
            <div className="page-loading">
                <div className="page-loading-logo-wrap">
                    <div className="page-loading-logo">loading
                    </div>
                    <div className="page-loading-anim">
                    </div>
                </div>
            </div>
        )
    }
}

export default Loading;

