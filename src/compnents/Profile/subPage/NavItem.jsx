import React from 'react'
import './style.less'

class NavItem extends React.Component {

    // componentDidMount() {
    //     if (this.props.btn) {

    //     }
    // }

    render() {
        const {icon, content, handleClick} = this.props;
        return (
            <div className="profile-nav-item" onClick={()=>handleClick?handleClick():''}>
                <i className={icon}>
                </i>
                <span>{content}</span>
                {this.props.btn &&
                <div className="profile-btn"
                     style={this.props.selected
                         ? {}
                         : {borderColor: '#394551'}
                     } onClick={() => this.props.handleSelect()}>
                    <i className={this.props.selected
                        ? ''
                        : 'icon-checkmark'
                    }>
                    </i>
                </div>}
            </div>
        )
    }
}

export default NavItem;