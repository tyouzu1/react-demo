import React from 'react'
import {Link} from 'react-router'

class ManageItem extends React.Component {

    state = {
        // delete: false,
        // move: false,
        // top: 0,
        // startY: 0,
        // endY: 0,
    };

    static index(t) {
        for (let e = t.parentNode, n = 0; n < e.children.length; n++)
            if (t.innerHTML == e.children[n].innerHTML)
                return n;
        return -1
    }

    handleDelete() {
        this.setState({
            delete: !this.state.delete
        });
    };

    touchStart(e) {
        if (!this.state.move) {
            e.preventDefault()
            // e.stopPropagation();
            this.setState({
                move: true,
                top: e.target.parentNode.offsetTop,
                startY: e.target.parentNode.offsetTop,
                pageY: e.targetTouches[0].pageY,
            });
            console.log('TouchStart 点击了', ManageItem.index(e.target.parentNode))
            let li = e.target.parentNode;
            let ul = li.parentNode;
            let phLi = document.getElementById("phLi");
            phLi.setAttribute('class', '');
            ul.insertBefore(phLi, li.nextElementSibling)
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
            let index = Math.floor(e.target.parentNode.offsetTop / li.offsetHeight + 0.5);
            if (top < 0) {
                top = 0
            } else if (top > e.target.parentNode.parentNode.lastChild.offsetTop) {
                top = e.target.parentNode.parentNode.lastChild.offsetTop
            }
            this.setState({
                top: top,
            });
            if (e.targetTouches[0].clientY <= li.offsetHeight + 5) {
                window.scrollBy(0, -10)
            } else if (e.targetTouches[0].clientY >= (window.innerHeight - li.offsetHeight - 5 )) {
                window.scrollBy(0, 10)
            }
            if (e.target.parentNode.offsetTop > (phLi.offsetTop + 22)) {
                console.log('下')
                ul.insertBefore(phLi, ul.children[index + 2])
            } else if (e.target.parentNode.offsetTop < (phLi.offsetTop - 20)) {
                console.log('上')
                ul.insertBefore(phLi, ul.children[index])
            }

        }
    }

    touchEnd(e) {
        if (this.state.move) {
            e.preventDefault()
            // e.stopPropagation();
            let li = e.target.parentNode;
            let liIndex = ManageItem.index(e.target.parentNode);
            let ul = li.parentNode;
            let phLi = document.getElementById('phLi');
            let phLiIndex = ManageItem.index(phLi);
            phLi.setAttribute('class', 'placeholder');
            // ul.insertBefore(li,ul.children[phLiIndex])
            ul.insertBefore(phLi, ul.firstChild)
            this.props.setLsDataOrderFn(liIndex+1, phLiIndex)
            this.setState({
                move: false,
            });
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        //当 item 改变了才允许更新组件  否则父组件更新state时 会被调用 造成浪费
        // TODO 加入placeholder，去除使用dom的placeholder
        // if (this.props.item.name==="") {
        //     return true;
        // }
        if(this.state.delete !== nextState.delete){
            return true
        }
        // if(this.props.item !== nextProps.item){
        //     console.log(2)
        //     return true
        // }
        if(this.props.item === nextProps.item){
            if (nextState.move) {
                return true;
            }
            if (this.state.move&&!nextState.move) {
                return true;
            }
        }
        return this.props.item !== nextProps.item;
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
            <li
            //     ref={(wrapper) => {
            //     this.wrapper = wrapper;
            // }}
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
                <span className={"delete" + (this.state.delete ? " rotate" : "")}
                      onClick={this.handleDelete.bind(this)}>
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
                {this.state.delete && <span className="confirm-delete" onClick={()=>{
                    this.handleDelete()
                    this.props.setSubscribeFn(item.name)
                }}>删除</span>}
            </li>
        )
    }
}

export default ManageItem;