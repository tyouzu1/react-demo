import React from 'react'
import SectionItem from './SectionItem'
class Section extends React.Component {

    render() {

        return (
            <div className="content-section">
                <div className="content-list">
                    <dl>
                        <dd>
                            <SectionItem />
                        </dd>
                    </dl>
                </div>
            </div>
        )
    }
}

export default Section;