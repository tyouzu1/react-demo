import React from 'react'
import Chosen from './ManageChosen'
import Item from './ManageItem'

import './style.less'

class ManageList extends React.Component {

    render() {
        const {data} = this.props;

        const chosen = data.filter( item =>
          item.type === "chosen"
        );

        const other = data.filter( item =>
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
                            <Item item={item} key={index}/>
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default ManageList;