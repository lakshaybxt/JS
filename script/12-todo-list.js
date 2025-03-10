const todoList = JSON.parse(localStorage.getItem('task')) || [];

const input = document.querySelector('.js-input');
const date = document.querySelector('.js-date');
const emptyMessage = document.querySelector('.js-empty-message');

renderTodoList();

function renderTodoList() {
	let todoListHTML = ``;

	// if(todoList.length === 0) {
	// 	emptyMessage.textContent = "No tasks yet! Add one.";
	// 	return;
	// }
	// emptyMessage.textContent = '';
	
	todoList.forEach((todoObject, index) => {
		const {name, dueDate} = todoObject;

		todoListHTML += ` 
			<div>${name}</div>
			<div>${dueDate}</div>
			<button class="delete-todo-button" onclick=" deleteTodo(${index})">Delete</button>
		`;

	});
	
	// for(let i=0; i<todoList.length; i++) {
	// 	const todoObject = todoList[i];
	// 	const {name, dueDate} = todoObject;

	// 	todoListHTML += ` 
	// 		<div>${name}</div>
	// 		<div>${dueDate}</div>
	// 		<button class="delete-todo-button" onclick=" deleteTodo(${i})">Delete</button>`;
	// }
	document.querySelector('.js-text').innerHTML = todoListHTML;
}

input.addEventListener('keydown', (event) => {
	if(event.key === 'Enter') addTodo();
});

function addTodo() {
	const name = input.value.trim();
	const dueDate = date.value;

	if(!name) return;

	todoList.push({
		name,
		dueDate
	});
	console.log(todoList);
	input.value = '';
	date.valueAsDate = new Date();

	saveTask();
	renderTodoList();
}

function deleteTodo(index) {
	todoList.splice(index, 1);
	saveTask();
	renderTodoList();
}

function saveTask() {
	localStorage.setItem('task', JSON.stringify(todoList));
}