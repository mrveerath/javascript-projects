window.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.querySelector("#todo-input");
    const addTodoBtn = document.querySelector("#add-todo");
    const closeModale = document.querySelector("#close-modale")

    const todocontainer = document.querySelector("#todo-container")
    const modalecontainer = document.querySelector("#modale-container");


    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    representTodo(todos)
//Thius is What

    closeModale.addEventListener("click", () => {
        modalecontainer.style.display = "none"
    })

    addTodoBtn.addEventListener("click", () => {
        if (todoInput.value === "") {
            modalecontainer.style.display = "flex"
        }
        else {
            const todo = todoInput.value;
            todos.push(todo);
            todoInput.value = ""
            saveTodoToLocalStorage()
        }
    })
    function saveTodoToLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(todos))
        representTodo(todos);
    }

    function representTodo(todos) {
        todocontainer.innerHTML = "";
        todos.forEach((element, index) => {
            console.log({ element, index })
            const todo = document.createElement("div");
            todo.classList = "todo"
            const paragraph = document.createElement("p");
            paragraph.innerText = element;
            const isComplete = document.createElement("input")
            isComplete.type = "checkbox"
            isComplete.onchange = (event) => {
                if (event.target.checked) {
                    paragraph.style.textDecoration = "line-through"
                }
                else {
                    paragraph.style.textDecoration = "none"
                }
            }
            const deleteTodo = document.createElement("button");
            deleteTodo.id = "delete-todo"
            deleteTodo.innerText = `❌`;
            deleteTodo.addEventListener("click", () => {
                console.log(index)
                deleteFromTodos(index)
            })
            todo.append(isComplete, paragraph, deleteTodo)
            todocontainer.appendChild(todo)
        });
    }
    function deleteFromTodos(index) {
        todos.splice(index, 1);
        saveTodoToLocalStorage()
    }

})