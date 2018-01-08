import React from 'react'
import {Link} from 'react-router'
import NewsItem from './NewsItem'

class NewsList extends React.Component {

    render() {

        return (
            <div className="news-list-container">
                {
                    this.props.data.map((item, index) =>
                        <Link to={"/detail/"+item.nid} key={index} className="" >
                            <NewsItem data={item}  imageMode={this.props.imageMode} />
                        </Link>
                    )
                }
            </div>
        )
    }
}

export default NewsList;