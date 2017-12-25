import React from 'react'
import {Link} from 'react-router'

class SwiperItem extends React.Component {


    render() {
        const {data} = this.props;
        return (
                <Link to={'/detail/'+data.nid} >
                    <div style={{height:'235px'}}>
                            <img src={data.imageurls[0].url_webp}/>
                    </div>
                    <p><span>{data.title}</span></p>
                </Link>


        )
    }
}

export default SwiperItem;