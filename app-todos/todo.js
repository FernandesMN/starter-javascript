var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

//lista de todos
var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

//função para renderizar os todos
function renderTodos() {
    //para não repetir todos os itens sempre que renderizar
    listElement.innerHTML = '';

    for (todo of todos) {
        //criando o elemento da lista
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        todoElement.appendChild(todoText);

        //criando o link para excluir
        var linkElement = document.createElement('a');
        var linkText = document.createTextNode('Excluir');

        linkElement.setAttribute('href','#');
        linkElement.appendChild(linkText);
        
        var pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick','deleteTodo(' + pos + ')');

        //anexando os filhos aos pais
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
    }
}

renderTodos();

//função para adicionar todos
function addTodo() {
    var todoText = inputElement.value;
    
    todos.push(todoText);
    inputElement.value = '';
    renderTodos();
    saveToStorage()
}

//anexando função ao botão
buttonElement.onclick = addTodo;

//função para deletar todos
function deleteTodo(pos) {
    todos.splice(pos,1);
    console.log(todos);
    renderTodos();
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos));
}