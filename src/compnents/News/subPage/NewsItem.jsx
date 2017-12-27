import React from 'react'
import LazyLoad from 'react-lazyload';

import Nav from '../../Header/subPage/NavBar'
import './style.less'


const Bottom = ({site, type}) => (
    <div className="item-bottom">
        <div className="item-time">
            <b className="tip-time">{site}</b>
            {
                type === "hot" ? <b className="tip-hot">热点</b> : null
            }
        </div>
    </div>
);

class NewsItem extends React.Component {

    render() {
        const images = this.props.data.imageurls;
        return (
            <div className="news-list-item">
                {
                    !images.length ? <div className="item-main">
                            <div className="item-text">
                                <p>{this.props.data.title}</p>
                                <Bottom site={this.props.data.site} type={this.props.data.type}/>
                            </div>
                        </div>
                        : images.length === 1
                        ? <div className="item-main show">
                            <div className="item-image">
                                <LazyLoad once debounce
                                          placeholder={<img
                                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAACWCAIAAABINBNqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2ZDg4Y2FlNi0zOTU2LTRkNmQtYjAxNy1mYmQxOWIxNmY2NzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTkxNEU0NDUzRDYyMTFFNkE5Q0JFOEIxRUFDNjM0MDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTkxNEU0NDQzRDYyMTFFNkE5Q0JFOEIxRUFDNjM0MDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmI5N2NkZDIyLThjMGEtNDg4MS1hN2YxLTMwMTUyZDM3NjIxZCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjI0NTllYzc5LTg4OTAtMTE3OS05MTBlLTg0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"
                                              style={    {height: 'auto',
                                                  width: '100%',
                                                  verticalAlign: 'middle'}}
                                              />} >
                                    <img src={images[0].url_webp || images[0].url}/>
                                </LazyLoad>
                            </div>

                            <div className="item-text">
                                <p>{this.props.data.title}</p>
                                <Bottom site={this.props.data.site} type={this.props.data.type}/>
                            </div>
                        </div>
                        : <div className="item-main">
                            <div className="item-text">
                                <p>{this.props.data.title}</p>
                            </div>
                            <div className="item-image-container">
                                {
                                    images.map((item, index) =>
                                        <div className="item-image-list" key={index}>
                                            <div className="item-image-list-wrapper">
                                                <LazyLoad key={index} once  debounce
                                                          placeholder={<img
                                                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAACWCAIAAABINBNqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2ZDg4Y2FlNi0zOTU2LTRkNmQtYjAxNy1mYmQxOWIxNmY2NzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTkxNEU0NDUzRDYyMTFFNkE5Q0JFOEIxRUFDNjM0MDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTkxNEU0NDQzRDYyMTFFNkE5Q0JFOEIxRUFDNjM0MDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmI5N2NkZDIyLThjMGEtNDg4MS1hN2YxLTMwMTUyZDM3NjIxZCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjI0NTllYzc5LTg4OTAtMTE3OS05MTBlLTg0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"
                                                              style={    {height: 'auto',
                                                                  width: '100%',
                                                                  verticalAlign: 'middle'}}
                                                          />}>
                                                    <img src={item.url_webp || item.url}/>
                                                </LazyLoad>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <Bottom site={this.props.data.site} type={this.props.data.type}/>
                        </div>
                }


            </div>
        )
    }
}

export default NewsItem;
// module.exports =NewsItem;
