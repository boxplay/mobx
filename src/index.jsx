import {observable,action} from 'mobx'
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
// import propTypes from 'prop-types'
//上面说到可被观察的数据类型已经不是原先的数据类型了，所以需要引入mobx提供的PropTypes
import {observer, PropTypes as ObservablePropTypes } from "mobx-react";

class Store {
    //声明可被观察的数据
    @observable cache ={queue:[]}

    //监听动作
    //action.bound
    // @action.bound refresh(){
    //     this.cache.queue.push(1)
    // }
    //action
    @action refresh = ()=>{
        this.cache.queue.push(1)
    }
}

const store = new Store();

// 只有真正应用queue值的组件才会作出反应
@observer
class Bar extends Component{
    static propTypes = {
        queue:ObservablePropTypes.observableArray
    }

    render(){
        const queue = this.props.queue

    return <span>{queue.length}</span>
    }
}

//可观察修饰关键词放到这里，点击按钮并不会引起dom渲染，原因是上面所讲到的在真正需要的时候才更新并且永远保持是最新的，只有真正应用queue值的组件才会作出反应
@observer
class Foo extends Component{
    //声明类型
    static propTypes = {
        cache: ObservablePropTypes.observableObject
    }
    render(){
        const cache  = this.props.cache
        return <div><button onClick={this.props.refresh}>refresh</button><Bar queue={cache.queue} /></div>
    }
}
ReactDOM.render(<Foo cache={store.cache} refresh={store.refresh} />,document.querySelector('#root'))