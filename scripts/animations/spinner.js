function mostrarSpinner() {
  // Selecionamos o local. Isso nos ajudará a incorporar nosso spinner
  const btnCriarConta = document.getElementById("btn-criar-conta");

  // Selecionamos o texto do botão para poder ocultá-lo durante o carregamento
  const btnText = document.querySelector(".btn-text")
  
  
  // Criamos nosso spinner
  const spinnerContainer = document.createElement("div");
  const spinner = document.createElement("div");
  
  // Atribuímos os IDs a cada novo elemento, para poder manipular
  // seus estilos
  spinnerContainer.setAttribute("id", "container-load");
  spinner.setAttribute("id", "load");
  
  // Ocultamos o texto do botão
  btnText.innerText = ""
  btnText.style.padding = "20px"
  
  // Adicionamos o Spinner ao nosso HTML.
  spinnerContainer.appendChild(spinner);
  btnCriarConta.appendChild(spinnerContainer);
  
  return;
 }

 function ocultarSpinner() {
  // Selecionamos o corpo para poder remover o spinner do HTML.
  const btnCriarConta = document.getElementById("btn-criar-conta");
  
  // Selecionamos o texto para poder mostrar-lo novamente
  const btnText = document.querySelector(".btn-text");

  // Selecionamos o spinner
  const spinnerContainer = document.querySelector("#container-load");
  
  // Removemos o spinner do HTML
  btnCriarConta.removeChild(spinnerContainer)
  
  btnText.innerText = "Criar conta";

  return;
 }