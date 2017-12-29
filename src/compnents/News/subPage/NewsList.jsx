import React from 'react'
import NewsItem from './NewsItem'

class NewsList extends React.Component {

    render() {

        return (
            <div className="news-list-container">
                {
                    this.props.data.map((item, index) =>
                        <NewsItem data={item} key={index} imageMode={this.props.imageMode} />
                    )
                }
            </div>
        )
    }
}

export default NewsList;