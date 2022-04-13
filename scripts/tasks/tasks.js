const userToken = JSON.parse(sessionStorage.getItem('jwt'))

const userName = document.querySelector('.user-name');
const novaTarefa = document.getElementById('nova-tarefa');
const btnSubmit = document.getElementById('btn-submit');
const taskList = document.getElementById('skeleton')
const formTask = document.querySelector('.nova-tarefa')

let tarefasUser = {
  description: "", 
  completed: ""
}



//Busca dados do usuario
function getUseUpi() {
  fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', { 
    method: 'GET',
    headers: {
      'authorization': `${userToken.jwt}`,

      'content-type': 'application/json'
    }
  })
  .then(response => {
    return response.json()
  })
  .then(userData => {
    console.log(userData)
    userName.innerText = `${userData.firstName} ${userData.lastName}`
  })
}

//Função que Busca tarefas cadastradas do usuario
function getTaskUser() {
  fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', { 
    method: 'GET',
    headers: {
      'authorization': `${userToken.jwt}`,

      'content-type': 'application/json'
    }
  })
  .then(response => {
    return response.json()
  })
  .then(result => {
    console.log(result)
    renderTaskPending(result)
    
  })
}

//Função que Cria tarefas do usuario
function createTaskUser() {
  tarefasUser.description = novaTarefa.value;
  tarefasUser.completed = false

  let tarefasUserJson = JSON.stringify(tarefasUser)

  fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', { 
    method: 'POST',
    headers: {
      'authorization': `${userToken.jwt}`,

      'content-type': 'application/json'
    }, 
    body: tarefasUserJson
  })
  .then(response => {
    console.log(response.status)
    return response.json()
  })
  .then(result => {
    console.log(result)
  })
}

//Função que renderiza as tasks
function renderTaskPending(tasks) {
  tasks.forEach(task => {
    taskList.innerHTML += 
    `
    <li class="tarefa">
      <div class="not-done" id="${task.id}"></div>
      <div class="descricao">
        <p class="nome">${task.description}</p>
        <p class="timestamp"><i class="far fa-calendar-alt"></i>
        Criada em: ${task.createdAt}
        </p>
      </div>
    </li>
    `
  })
}

//Evento do botao que cria uma nova Tarefa
btnSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  createTaskUser()
  formTask.reset();
})

//Evento acontece ao carregar a pagina
window.addEventListener('load', () => {
  getUseUpi()

  getTaskUser()  

})