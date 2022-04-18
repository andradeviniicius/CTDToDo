const userToken = JSON.parse(sessionStorage.getItem("jwt"));
if (userToken === null) {
  alert(
    "Pagina indisponivel, faça login corretamente para acessar o conteudo :)"
  );
  window.location.href = "index.html";
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

/* function reloadTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.lastChild)
  }
} */

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
        alert(
          "Pagina indisponivel, faça login corretamente para acessar o conteudo :)"
        );
        window.location.href = "index.html";
      }
      return response.json();
    })
    .then((userData) => {
      userName.innerText = `${userData.firstName} ${userData.lastName}`;
    })
    .catch((res) => {
      console.log("erro" + res);
      // esse catch nao está funcionnando :( se puderem ajudar a decifrar ele, seria otimo poder barrar o usuario já no primeiro fetch com o catch mas nao consegui hoje)
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
    
    alert(`Tarefa "${json.description}" concluida`)
    location.reload()
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
    
    alert(`Tarefa "${json.description}" pendente`)
    location.reload()
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
      alert("Tarefa excluida com sucesso!");
      location.reload();
    });
}

//Evento acontece ao carregar a pagina
window.addEventListener("load", () => {
  getUserInfo();
  getTaskUser();
});
