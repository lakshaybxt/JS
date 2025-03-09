const todoList = [];

const input = document.querySelector('.js-input');
const dateInput = document.querySelector('.js-date');

renderTodoList();

function renderTodoList() {
    let todoListHTML = ``;

    for(let i = 0; i<todoList.length; i++) {
        const todoObject = todoList[i];
        // const name = todoObject.name;
        // const dueDate = todoObject.dueDate;
        const {name, dueDate} = todoObject;
        todoListHTML += `
            <div>${name}</div>
            <div>${dueDate}</div>
            <button class="delete-todo-button" onclick="
                todoList.splice(${i}, 1);
                renderTodoList();
            ">Delete</button>
        `;
    }

    document.querySelector('.js-text').innerHTML = todoListHTML;

}
input.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') addTodo();
}); 

function addTodo() {
    const name = input.value;
    const dueDate = dateInput.value;
    todoList.push({
        // name: name, 
        // duedate: duedate
        name,
        dueDate
    });

    console.log(todoList);
    input.value = ``;

    renderTodoList()
}