const userToken = JSON.parse(sessionStorage.getItem("jwt"));
if (userToken === null) {
  Swal.fire(
    "Pagina indisponivel",
    'faça login corretamente para acessar o conteudo :)', 
    'warning' 
  ).then((res)=>{
    if(res.isConfirmed){
      window.location = 'index.html'
    }
  })
}

const userName = document.querySelector(".user-name");
const novaTarefa = document.getElementById("nova-tarefa");
const btnSubmit = document.getElementById("btn-submit");
const taskList = document.querySelector(".tarefas-pendentes");
const formTask = document.querySelector(".nova-tarefa");
const tasksCompleted = document.querySelector(".tarefas-terminadas");

let tarefasUser = {
  description: "",
  completed: "",
};


//Busca dados do usuario
function getUserInfo() {
  fetch("https://ctd-todo-api.herokuapp.com/v1/users/getMe", {
    method: "GET",
    headers: {
      authorization: `${userToken.jwt}`,
      "content-type": "application/json",
    },
  })
    .then((response) => {
      if (response.status == 401) {
        mensagemDeAlerta();
        setTimeout(() => {
          window.location.href = "index.html";

        }, 4000)
      }
      return response.json();
    })
    .then((userData) => {
      userName.innerText = `${userData.firstName} ${userData.lastName}`;
    })
    .catch((res) => {
      console.log("erro" + res);
    });
}

//Função que Busca tarefas cadastradas do usuario
function getTaskUser() {
  fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
    method: "GET",
    headers: {
      authorization: `${userToken.jwt}`,

      "content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      renderTaskPending(result);
    });
}

//Função que Cria tarefas do usuario
function createTaskUser() {
  tarefasUser.description = novaTarefa.value;
  tarefasUser.completed = false;

  let tarefasUserJson = JSON.stringify(tarefasUser);

  fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
    method: "POST",
    headers: {
      authorization: `${userToken.jwt}`,

      "content-type": "application/json",
    },
    body: tarefasUserJson,
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.completed === false) {
        const li = document.createElement("li");
        li.classList.add("tarefa");
        li.innerHTML = `
      <button class="not-done" id="${result.id}" onclick="concluirTarefa(${
          result.id
        });"></button>
      <div class="descricao">
        <p class="nome">${result.description}</p>
        <p class="timestamp"><i class="far fa-calendar-alt"></i>
        Criada em: ${formatDate(result.createdAt)}
        </p>
      </div>
    `;
        taskList.appendChild(li);
      } else {
        const liCompleted = document.createElement("li");
        liCompleted.classList.add("tarefa");
        liCompleted.innerHTML = `
      <div class="done"></div>
      <div class="descricao">
        <p class="nome">${result.description}</p>
        <div>
          <button  id="${result.id}" ><iclass="fas fa-undo-alt change"></i></button>
          
          <button id="${result.id}" ><i class="far fa-trash-alt"></i></button>
        </div>
      </div>
      `;
        tasksCompleted.appendChild(liCompleted);
      }
    });
}

//Função que renderiza as tasks
function renderTaskPending(tasks) {
  tasks.forEach((task) => {
    if (task.completed === false) {
      const li = document.createElement("li");
      li.classList.add("tarefa");
      li.innerHTML = `
      <button class="not-done" id="${task.id}" onclick="concluirTarefa(${
        task.id
      });"></button>
      <div class="descricao">
        <p class="nome">${task.description}</p>
        <p class="timestamp"><i class="far fa-calendar-alt"></i>
        Criada em: ${formatDate(task.createdAt)}
        </p>
      </div>
    `;
      taskList.appendChild(li);
    } else {
      const liCompleted = document.createElement("li");
      liCompleted.classList.add("tarefa");
      liCompleted.innerHTML = `
      <div class="done"></div>
      <div class="descricao">
        <p class="nome">${task.description}</p>
        <div>
          <button  id="${task.id}" onclick="tarefaPendente(${task.id})" ><i class="fas fa-undo-alt change"></i></button>
          
          <button id="${task.id}" onclick="excluirTarefa(${task.id})"><i class="far fa-trash-alt"></i></button>
        </div>
      </div>
      `;
      tasksCompleted.appendChild(liCompleted);
    }
  });
}

//Evento do botao que cria uma nova Tarefa
btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  createTaskUser();
  formTask.reset();
});

//Evento do botao que conclui a tarefa
function concluirTarefa(tarefaId) {
  const url = `https://ctd-todo-api.herokuapp.com/v1/tasks/${tarefaId}`;
  fetch(url, {
    method: 'PUT',
    headers: {
      authorization: `${userToken.jwt}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({completed: true})
  }).then(response => {
    return response.json()
  }).then(json => {
    
    mensagemDetarefaConcluida(json)
    // location.reload()
  }) 
}

function tarefaPendente(tarefaId) {
  const url = `https://ctd-todo-api.herokuapp.com/v1/tasks/${tarefaId}`;
  fetch(url, {
    method: 'PUT',
    headers: {
      authorization: `${userToken.jwt}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({completed:false})
  }).then(response => {
    return response.json()
  }).then(json => {
    
    mensagemDeTarefaPendente(json)
    
  }) 
}



//Evento de excluir tarefa
function excluirTarefa(tarefaId) {
  const url = `https://ctd-todo-api.herokuapp.com/v1/tasks/${tarefaId}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      authorization: `${userToken.jwt}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result)
      mensagemDeExcluir();
      
    });
}


function mensagemDeSucesso() {
  Swal.fire(
    "Usuário cadastrado com sucesso", //titulo
    'click em ok para continuar', //Mensagem
    'success' // Tipo de ícone
  )
  
}

function mensagemDeTarefaPendente(json) {
  Swal.fire(
    `Tarefa "${json.description}"`,
    'está pendente', 
    'warning' 
  ).then(result => {
    if(result.isConfirmed) {
      location.reload()
    }
  })
}

function mensagemDetarefaConcluida(json) {
  Swal.fire(
    `Tarefa "${json.description}" concluida`,
    'Parabens!', 
    'success' 
  ).then((results) => {
    if(results.isConfirmed) {
      location.reload()
    }
  })
}

function mensagemDeExcluir() {
  Swal.fire({
    title: 'Excluir tarefa',
    text: 'Deseja realmente excluir esta tarefa ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, confirmar'
  }).then((result) => {
    //validamos se o usuário confirmar a ação
    if(result.isConfirmed) {
      location.reload();
    }
  })
}

//Evento acontece ao carregar a pagina
window.addEventListener('load', () => {
  getUserInfo()
  
  renderSkeletons(4, ".skeleton")

  setTimeout(() => {
    getTaskUser()
    
    removeSkeleton()

  }, 1000)
  
})

