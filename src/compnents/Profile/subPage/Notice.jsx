import React from 'react'
import Back from '../../BackHeader'

class Notice extends React.Component {

    state = {
        check: true
    };


    handleClick = (n) => {
        if (n===2&&this.state.check){
            this.setState({
                check: false
            });
        }else if (n===1&&!this.state.check){
            this.setState({
                check: true
            });
        }
    };

    componentDidMount (){
    //    fetch 获取数据
    }
    render() {
        return (
            <div>

                <Back title="我的消息"/>

                <div className="notice-btn-container">
                    <div className="notice-btn-border">
                        <span onClick={()=>this.handleClick(1)} className={this.state.check ? 'selected' : null}>动态</span>
                        <span onClick={()=>this.handleClick(2)} className={this.state.check ? null : 'selected'}>评论</span>
                    </div>
                </div>
                <div>
                    {
                        (this.state.check&&<div>
                           动态
                       </div>)||
                        (!this.state.check&&<div>
                        评论
                        </div>)
                    }
                </div>
            </div>
        )
    }
}

export default Notice;