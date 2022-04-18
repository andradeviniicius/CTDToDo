function renderSkeletons(qtd, container) {
  const containerTarefas = document.querySelector('.skeleton')

  //guarda o numero de skeletons pra renderizar
  const skeletons = Array.from({length: qtd})

  skeletons.forEach(() => {
    const template = `
    <li class="skeleton-container" ${container.replace(" .","")}-child"="">
      <div class="skeleton-card">
      <div class="not-done"></div>
      <p class="skeleton-text"></p>
      <p class="skeleton-text"></p>
      <p class="skeleton-text"></p>
      </div>
      <br></br>
      </li>
    `;

    //inserindo o HTML dentro do container
    containerTarefas.innerHTML += template;
  })
}

function removeSkeleton() {
  const containerTarefas = document.querySelector('.skeleton')

  //seleciona todos os skeletons dentro do container     
  const skeletons = document.querySelectorAll('.skeleton-container')

  skeletons.forEach((skeleton) => containerTarefas.removeChild(skeleton));
}
