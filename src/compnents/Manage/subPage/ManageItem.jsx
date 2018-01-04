import React from 'react'
import {Link} from 'react-router'

class ManageItem extends React.Component {

    state = {
        delete: false,
        move: false,
        top: 0,
        startY: 0,
        endY: 0,

    };

    handleDelete() {

        this.setState({
            delete: !this.state.delete
        })
    };

    touchEnd(e) {
        if (this.state.move) {
            e.preventDefault()
            // e.stopPropagation();
            this.setState({
                move: false
            });

            let li = e.target.parentNode;
            let liIndex = ManageItem.index(e.target.parentNode);
            let ul = li.parentNode;
            let phLi = document.getElementById('phLi');
            phLi.setAttribute('class', 'placeholder');
            ul.insertBefore(phLi, ul.firstChild)
        }
    }

    static index(t) {
        for (let e = t.parentNode, n = 0; n < e.children.length; n++)
            if (t.innerHTML == e.children[n].innerHTML)
                return n;
        return -1
    }

    touchStart(e) {
        if (!this.state.move) {
            e.preventDefault()
            // e.stopPropagation();
            this.setState({
                move: true,
                top: this.wrapper.offsetTop,
                startY: e.target.parentNode.offsetTop,
                pageY: e.targetTouches[0].pageY,
            });
            console.log('TouchStart 点击了', ManageItem.index(e.target.parentNode))
            let li = e.target.parentNode;
            let ul = li.parentNode;
            let phLi = ul.firstChild;
            phLi.setAttribute('class', '');
            ul.insertBefore(phLi, li.nextSibling)
        }
    }

    touchMove(e) {
        if (this.state.move) {
            e.preventDefault();
            e.stopPropagation();
            let moveY = e.targetTouches[0].pageY - this.state.pageY
            let top = moveY + this.state.startY;
            let li = e.target.parentNode;
            let ul = li.parentNode;
            let phLi = document.getElementById('phLi');
            let liIndex = ManageItem.index(li);
            let index = Math.floor(top / li.offsetHeight + 0.5);

            if (top < 0) {
                top = 0
            } else if (top > e.target.parentNode.parentNode.lastChild.offsetTop) {
                top = e.target.parentNode.parentNode.lastChild.offsetTop
            }


            this.setState({
                move: true,
                top: top,
            });

            if(e.targetTouches[0].clientY <= li.offsetHeight + 5 ){
                window.scrollBy(0, -10)
            }else if(e.targetTouches[0].clientY >= (window.innerHeight - li.offsetHeight -5 )){
                window.scrollBy(0, 10)
            }

            if(this.state.pageY >= top){
                console.log(1)
                console.log(top)
            }
            if(this.state.pageY <= top){
                console.log(2)
                console.log(top )
            }

            console.log('当前选择的为',liIndex,'移动的总数',index)
            if (index>=liIndex) {
                // console.log('insert', phLi, 'to', ul.children[index+2]);
                ul.insertBefore(phLi, ul.children[index+2])
            }else if (index < liIndex) {
                // console.log('insert', phLi, 'to', ul.children[index+2]);
                ul.insertBefore(phLi, ul.children[index])
            }

            // console.log(li.offsetHeight)
            /*
            * li.offsetHeight 单个高度
            * ul.length      总数
            * li.offsetHeight *ul.length = 总高度
            *
            * 总个数console.log((li.offsetHeight * (ul.childNodes.length-1) /42))
            *
            * 当前Index * 总数 = 当前高度
            *
            * e.targetTouches[0].pageY - this.state.pageY  移动的距离Y
            * 移动的距离除以单个高度，如果大于0.5  就移动
            *
            *
            * */
        }
    }

    render() {

        const {item} = this.props;
        if (item.type === "placeholder") {
            return (
                <li className="placeholder" id="phLi">
                </li>
            )
        }
        return (
            <li ref={(wrapper) => {
                this.wrapper = wrapper;
            }}
                className={this.state.move ? "moving" : null}
                style={this.state.move
                    ? {
                        position: 'absolute',
                        top: this.state.top ? this.state.top : 0,
                        left: 0,
                        right: 0,
                        zIndex: 11
                    }
                    : {}}>
                <span>{item.name}</span>
                <span className={"delete"+(this.state.delete?" rotate":"")} onClick={this.handleDelete.bind(this)}>
                </span>
                <span className="handle"
                      onTouchStart={(e) => {
                          this.touchStart(e)
                      }}
                      onTouchMove={(e) => {
                          this.touchMove(e)
                      }}
                      onTouchEnd={(e) => {
                          this.touchEnd(e)
                      }}>移动</span>
                {this.state.delete && <span className="confirm-delete">删除</span>}
            </li>
        )
    }
}

export default ManageItem;