
const DOM = {
    form : document.getElementsByClassName('todo-form'),
    input: document.getElementById('todo-input'),
    todo: document.getElementById('todo-things'),
    completed: document.getElementById('completed'),
    filters: document.querySelectorAll("input[name='isDone']"),
    add: document.getElementById('add-button'),
}

var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
}
DOM.add.addEventListener('click',function(e) {
    e.preventDefault();
    console.log('SUCCESS!');
    var value = DOM.input.value;
    if(value){
        addItem(value);
    }else{
        alert("请填写具体待办事项！")
    }
})

DOM.input.addEventListener('keydown',function(e){
    var value = this.value;
    if(e.value ==='Enter' && value){
        addItem(value);
    }
})
function addItem (value){
    addItemToDOM(value);
    DOM.input.value = '';
    data.todo.push(value);

}
function removeItem(){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerHTML;

    if(id === 'todo'){
        data.todo.splice(data.todo.indexOf(value),1);
    }else{
        data.completed.splice(data.completed.indexOf(value),1);
    }
    dataObjectUpdated();

    parent.removeChild(item);
}

function renderTodoList(){
    if(!data.todo.length && !data.completed.length) return;

    for(var i = 0; i < data.todo.length; i++){
        var value = data[i];
        addItemToDOM(value);
    }

    for(var i = 0; i < data.completed.length; i++){
        var value = data[i];
        addItemToDOM(value);
    }
}

function completeItem(){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerHTML;

    if(id === 'todo'){
        data.todo.splice(data.todo.indexOf(value),1);
        data.completed.push(value);
    }else{
        data.completed.splice(data.completed.indexOf(value),1);
        data.todo.push(value);
    }
}

function dataObjectUpdated(){
    localStorage.setItem('todoList',JSON.stringify(data));
}

//将新事项添加到DOM中
function addItemToDOM(text,completed){
    var list = (completed) ? DOM.completed : DOM.todo;

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var remove = document.createElement('div');
    remove.classList.add('remove');
    remove.innerHTML = "delete";

    remove.addEventListener('click',removeItem);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = "complete";

    complete.addEventListener('click',completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.insertBefore(item,list.childNodes[0]);


}

