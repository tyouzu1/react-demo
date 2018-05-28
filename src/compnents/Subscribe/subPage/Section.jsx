import React from 'react'
import SectionItem from './SectionItem'

import './style.less'

class Section extends React.Component {

    render() {
        const {data, lsData, fixed,  setSubscribeFn, search} = this.props;

        return (
            <div className="content-section" style={this.props.style}>
                <div className="content-list">
                    <dl>
                        <dd>
                            {
                                data.map((item, index) => {
                                        const a = lsData.map(item => item.name);
                                        let check = a.includes(item.name);
                                        return <SectionItem item={item}
                                                            search={search}
                                                            key={index}
                                                            fixed={fixed}
                                                            setSubscribeFn={setSubscribeFn}
                                                            check={check}/>
                                    }
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