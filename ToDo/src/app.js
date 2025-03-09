
const DOM = {
    form : document.getElementsByClassName('todo-form'),
    input: document.getElementById('todo-input'),
    todo: document.getElementById('todo-thing'),
    completed: document.getElementById('completed'),
    filters: document.querySelectorAll("input[name='isDone']"),
    add: document.getElementById('add-button'),
    type: document.getElementById('todo-type'),
}

var data = (localStorage.getItem('todoList'))
  ? JSON.parse(localStorage.getItem('todoList')) 
  : {
    todoList: []
}
renderTodoList();
DOM.add.addEventListener('click',function(e) {
    e.preventDefault();
    console.log('SUCCESS!');
    var value = DOM.input.value;
    var type = DOM.type.value;
    if(value && type){
        addItem(value,type);
    }else{
        alert("请填写具体待办事项！")
    }
})

DOM.input.addEventListener('keydown',function(e){
    var value = this.value;
    var type = DOM.type.value;
    if(e.key ==='Enter' && value && type){
        e.preventDefault();
        addItem(value,type);
    }
})
function addItem (value,type){
    DOM.input.value = '';
    
    const newThing = {
        id: Date.now().toString(),
        isDone : false,
        type : type,
        info : value.trim(),
        createdAt: new Date().toISOString()
    };
    data.todoList.push(newThing);
    dataObjectUpdated();
    renderTodoList();

}
function removeItem(id){
    console.log(id);
    data.todoList = data.todoList.filter(task => task.id != id);
    dataObjectUpdated();
    renderTodoList();

}
function toggleIsDone(id){
    const aim = data.todoList.find(t => t.id == id);
    console.log(aim);
    if(aim){
        aim.isDone = !aim.isDone;
        renderTodoList();
        dataObjectUpdated();
    }
}
//渲染DOM填充数据
function renderTodoList(){
    console.log(data);
    const sorted = [...data.todoList].sort((a,b) => {
        if(a.isDone === b.isDone){
            return b.createdAt.localeCompare(b.createdAt);
        }
        return a.isDone ? 1: -1;
    });
    DOM.todo.innerHTML = sorted.map((task,index) => `
    <li class="${task.isDone ? 'done' : 'todo'}">
     <div class="content-wrapper">
        <input type="checkbox" ${task.isDone ? 'checked' : ''}
        onchange="toggleIsDone(${task.id})">
        <span>${task.type}</span> 
    </div>
    <div id="things">
        <span>${task.info}</span>
    </div>
        <i class="fa-solid fa-trash" id="delete-btn" onclick="removeItem(${task.id})"></i>    
    </li>
   
    `).join('');
        
}

function dataObjectUpdated(){
    localStorage.setItem('todoList',JSON.stringify(data));
}


