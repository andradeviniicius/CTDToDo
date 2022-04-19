function mostrarSpinner() {
  // Selecionamos o local. Isso nos ajudará a incorporar nosso spinner
  const btnCriarConta = document.querySelector("button");

  // Selecionamos o texto do botão para poder ocultá-lo durante o carregamento
  const btnText = document.querySelector(".btn-text")
  
  
  // Criamos nosso spinner
  const spinnerContainer = document.createElement("div");
  const spinner1 = document.createElement("div");
  const spinner2 = document.createElement("div");
  const spinner3 = document.createElement("div");
  const spinner4 = document.createElement("div");
  
  
  // Atribuímos os IDs a cada novo elemento, para poder manipular
  // seus estilos
  spinnerContainer.setAttribute("class", "lds-ellipsis");
  // spinner.setAttribute("id", "load");
  
  // Ocultamos o texto do botão
  btnText.innerText = ""
  btnText.style.padding = "12px"
  
  // Adicionamos o Spinner ao nosso HTML.
  spinnerContainer.appendChild(spinner1);
  spinnerContainer.appendChild(spinner2);
  spinnerContainer.appendChild(spinner3);
  spinnerContainer.appendChild(spinner4);
  
  btnCriarConta.appendChild(spinnerContainer);
  
  return;
 }

 function ocultarSpinner() {
  // Selecionamos o corpo para poder remover o spinner do HTML.
  const btnCriarConta = document.querySelector("button");
  
  // Selecionamos o texto para poder mostrar-lo novamente
  const btnText = document.querySelector(".btn-text");

  // Selecionamos o spinner
  const spinnerContainer = document.querySelector(".lds-ellipsis");
  
  // Removemos o spinner do HTML
  btnCriarConta.removeChild(spinnerContainer)
  
  btnText.innerText = "Criar conta";
  btnText.style.padding = "12px"

  return;
 }