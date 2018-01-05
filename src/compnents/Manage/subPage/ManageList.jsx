import React from 'react'
import Chosen from './ManageChosen'
import Item from './ManageItem'

import './style.less'

class ManageList extends React.Component {

    render() {
        const lsData = [{
            name: "",
            type: "placeholder",
        }].concat(this.props.data);

        const chosen = lsData.filter(item =>
            item.type === "chosen"
        );

        const other = lsData.filter(item =>
            item.type !== "chosen"
        );
        return (
            <div className="list-container">
                <ul>
                    {
                        chosen.map((item, index) =>
                            <Chosen item={item} key={index}/>
                        )
                    }
                </ul>
                <ul>
                    {
                        other.map((item, index) =>
                            <Item item={item} key={index}  setSubscribeFn={this.props.setSubscribeFn} setLsDataOrderFn={this.props.setLsDataOrderFn} />
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default ManageList;