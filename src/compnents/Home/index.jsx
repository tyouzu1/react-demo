import React from 'react'
import Header from '../Header'
import News from '../News'

class HomeContainer extends React.Component {

    render() {

        return (
            <div>
                <Header/>
                <News/>
            </div>
        )
    }
}

export default HomeContainer;