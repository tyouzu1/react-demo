import React from 'react'

import Item from './CategoryItem'

import './style.less'

class Category extends React.Component {

    render (){

        return (
            <div className="nav-category">
              <div className="nav-category-menu">
                    <Item />
              </div>
            </div>
        )
    }
}

export default Category;