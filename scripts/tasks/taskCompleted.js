const tasksCompleted = document.querySelector('.tarefas-terminadas')
console.log(tasksCompleted)

function renderTaskComleted (event) {
  const element = event.path[1]
  const elementId = event.target.getAttribute('id')
  const description = event.target.nextElementSibling.childNodes[3].innerText
  console.log(elementId)
  console.log(element)
  console.log(description)

  element.classList.add('hidden')

  const li = document.createElement('li');
  li.classList.add('tarefa')
  li.innerHTML = 
  `
  <div class="done"></div>
  <div class="descricao">
    <p class="nome">${description}</p>
    <div>
      <button><i id="${elementId}" 
      class="fas fa-undo-alt change"></i>
      </button>
      
      <button><i id="${elementId}" class="far
      
      fa-trash-alt"></i></button>
    </div>
  </div>
  `
  tasksCompleted.appendChild(li)
}

taskList.addEventListener('click', renderTaskComleted)

