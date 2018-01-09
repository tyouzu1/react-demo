import React from 'react'
import SectionItem from './SectionItem'

import './style.less'
class Section extends React.Component {

    render() {
        return (
            <div className="content-section">
                <div className="content-list">
                    <dl>
                        <dd>
                            {
                                this.props.data.map((item,index)=>
                                    <SectionItem item = {item} key={index} fixed={this.props.fixed} />
                                )
                            }
                        </dd>
                    </dl>
                </div>
            </div>
        )
    }
}

export default Section;