const todoList = [];

renderTodoList();

function renderTodoList() {
    let todoListHTML = ``;

    for(let i=0; i<todoList.length; i++) {
        const todo = todoList[i];
        const html = `<p>${todo}</p>`;
        todoListHTML += html;
    }

    console.log(todoListHTML);

    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

const button = document.querySelector('.js-name-input');
button.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') addTodo();
});

function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value.trim();
    todoList.push(name);
    console.log(todoList);

    inputElement.value = '';

    renderTodoList()
}