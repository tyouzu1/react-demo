import React from 'react'
import Chosen from './ManageChosen'
import Item from './ManageItem'

import './style.less'

class ManageList extends React.Component {

    state = {
        lsData: [{
            name: "",
            type: "placeholder",
        }]
    };

    componentWillMount() {
        this.setState({
            lsData: this.state.lsData.concat(this.props.data)
        })
    }

    render() {
        const {lsData,setLsDataOrderFn,setSubscribeFn} = this.state;

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
                            <Item item={item} key={index} setSubscribeFn={setSubscribeFn} setLsDataOrderFn={setLsDataOrderFn} />
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default ManageList;