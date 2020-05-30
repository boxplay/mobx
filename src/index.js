import {observable, computed, autorun, when, reaction,action, runInAction} from 'mobx'
class Store{
    @observable arr = [];
    @observable num = 10;
    @observable string = 'hello'
    @observable bool = false

    @action bar(){
        this.string = 'world'
        this.num = 123
    }
}
//computed
var store = new Store()
// var foo = computed(function(){
//     return store.string + '/' + store.num
// })
// foo.observe(function(change){
//     console.log(change)
// })
// store.string = 'world'

// autorun
// autorun(()=>{
//     console.log(store.num)
// })
// store.num = 33;

//when
// when(()=>store.bool,()=>console.log("it's true"))
// // 当修改bool值 为真时，会自动作出相应的反应
// store.bool = true

//reaction
reaction(()=>[store.string,store.num],arr=>console.log(arr.join('/')))
// //只有赋新值时才会作出反应
// store.num = 11
// store.bar()
runInAction('modify',()=>{
    store.string = 'world'
    store.num = 123
})