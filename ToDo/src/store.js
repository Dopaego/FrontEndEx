// 使用发布订阅模式实现响应式
class TodoStore {
    constructor(){
        this.subscribers = []
        this._todos = JSON.parse(localStorage.getItem('todos')) || []
    };



//以下方法均属于TodoStore类的私有方法,其中
//持久化数据到localStorage，确保页面刷新后任务不会丢失
_persist(){
    localStorage.setItem('todos',JSON.stringify(this._todos));
    this._notify();
}

// 实现notify()方法，用来通知订阅者任务列表的更新
_notify(){
    this.subscribers.forEach(cb => cb(this.todos));
}

get todos(){
    return this._todos;
}

//订阅状态的变化
subscribe(callback){
    this.subscribers.push(callback);
    callback(this.todos)
}

//核心操作方法
addTodo(text){
    if(!text.trim()) return
    this._todos = [
        ...this._todos,
        {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        }
    ]
    this._persist();
}

//切换任务状态
toggleTode(id){
    this._todos = this._todos.map(todo =>
        todo.id === id ? {...todo , completed : !todo.completed } : todo
    )
    this._persist();
}

//删除任务
deleteTodo(id){
    this._todos = this._todos.filter(todo => todo.id !== id)
    this._persist();
}

filterTodos(filterType) {
    switch(filterType) {
        case 'active': 
            return this._todos.filter(t => !t.completed)
        case 'completed' : 
            return this._todos.filter(t => t.completed)
        default:
            return this._todos;
    }
}

}

export const todoStore = new TodoStore()



