const userToken = JSON.parse(sessionStorage.getItem('jwt'))
if(userToken===null){
  alert('Pagina indisponivel, faça login corretamente para acessar o conteudo :)')
  window.location.href = 'index.html'
}

const userName = document.querySelector('.user-name');
const novaTarefa = document.getElementById('nova-tarefa');
const btnSubmit = document.getElementById('btn-submit');
const taskList = document.querySelector('.tarefas-pendentes')
const formTask = document.querySelector('.nova-tarefa')


let tarefasUser = {
  description: "", 
  completed: ""
}

function reloadTasks() {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.lastChild)
  }
}

//Busca dados do usuario
function getUserInfo() {
  fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', { 
    method: 'GET',
    headers: {
      'authorization': `${userToken.jwt}`,
      'content-type': 'application/json'
    }
  })
  .then(response => {
    if(response.status == 401){
      alert('Pagina indisponivel, faça login corretamente para acessar o conteudo :)')
      window.location.href = 'index.html'
    }
    return response.json()
  })
  .then(userData => {
    userName.innerText = `${userData.firstName} ${userData.lastName}`
  }).catch(res=>{
    console.log("erro"+res);
    // esse catch nao está funcionnando :( se puderem ajudar a decifrar ele, seria otimo poder barrar o usuario já no primeiro fetch com o catch mas nao consegui hoje)
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
    return response.json()
  })
  .then(result => {
    console.log(result)
    reloadTasks()
    getTaskUser()
    
  })
}


//Função que renderiza as tasks
function renderTaskPending(tasks) {
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('tarefa')
    li.innerHTML = 
    `
      <div class="not-done" id="${task.id}"></div>
      <div class="descricao">
        <p>ID= ${task.id}</p>
        <p class="nome">${task.description}</p>
        <p class="timestamp"><i class="far fa-calendar-alt"></i>
        Criada em: ${formatDate(task.createdAt)}
        </p>
      </div>
    `
    taskList.appendChild(li)
  })


}



//Evento do botao que cria uma nova Tarefa
btnSubmit.addEventListener('click', (event) => {
  event.preventDefault();
  createTaskUser()
  formTask.reset();
  
})

//Evento do botao que conclui a tarefa
function concluirTarefa() {

}


//Evento acontece ao carregar a pagina
window.addEventListener('load', () => {
  getUserInfo()
  getTaskUser()  

})



