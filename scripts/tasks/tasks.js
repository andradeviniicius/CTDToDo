const userToken = JSON.parse(sessionStorage.getItem('jwt'))
console.log(userToken)

const userName = document.querySelector('.user-name');
const novaTarefa = document.getElementById('nova-tarefa');
const btnSubmit = document.getElementById('btn-submit');

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

//Busca tarefas cadastradas do usuario
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
  })
}

//Cria tarefas do usuario
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

//Evento pra criar novaTarefa
btnSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  createTaskUser()
})

//Evento acontece ao carregar a pagina
window.addEventListener('load', () => {
  getUseUpi()

  getTaskUser()

})
