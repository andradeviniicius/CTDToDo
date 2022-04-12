function selectId(id) {
  return document.getElementById(id)
}

const form = selectId('create-conta') 
const errorList = selectId('error-list-container')
const errorListUl = selectId('error-list')
const inputNome = selectId('input-nome')
const inputSobrenome = selectId('input-sobrenome')
const inputEmail = selectId('input-email')
const inputSenha = selectId('input-senha')
const inputRepetirSenha = selectId('input-repetir-senha')
const btnSubmite = selectId('btn-criar-conta')
const btnText = document.querySelector('.button--text')


let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let campoNomeNormalizado;
let campoSobrenomeNormalizado;
let campoEmailNormalizado;
let campoSenhaNormalizado;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  if(inputNome.value === ''){
    errorListUl.innerHTML += '<li>Campo <b>nome</b> não preenchido</li>';
  }else{
    campoNomeNormalizado = retiraEspacosDeUmValor(inputNome.value)
    campoNomeNormalizado = converteValorRecebidoParaMinusculo(campoNomeNormalizado)
  }

  if(inputSobrenome.value === ''){
    errorListUl.innerHTML += '<li>Campo <b>sobrenome</b> não preenchido</li>';
  }
  else{
    campoSobrenomeNormalizado = retiraEspacosDeUmValor(inputSobrenome.value)
    campoSobrenomeNormalizado = converteValorRecebidoParaMinusculo(campoSobrenomeNormalizado)
  }

  if(inputEmail.value != '' && regex.test(inputEmail.value)){
    campoEmailNormalizado = retiraEspacosDeUmValor(inputEmail.value)
    campoEmailNormalizado = converteValorRecebidoParaMinusculo(campoEmailNormalizado)
  }else{
    errorListUl.innerHTML += '<li>Campo <b>email</b> invalido</li>';
  }

  if(inputSenha.value === '' ){
    errorListUl.innerHTML += '<li>Campo <b>senha</b> não preenchido</li>';
  }else if(inputSenha.value != inputRepetirSenha.value) {
    errorListUl.innerHTML += '<li>Repita a <b>senha</b> corretamente</li>';
    inputRepetirSenha.style.border = `1px solid #EE1729EC`
  }else{
    inputRepetirSenha.style.border = ``
    campoSenhaNormalizado = retiraEspacosDeUmValor(inputSenha.value)
    campoSenhaNormalizado = converteValorRecebidoParaMinusculo(campoSenhaNormalizado)
  }

  //Pegando o index das li de erros
  if(errorListUl.querySelectorAll('li').length > 0) {
    event.preventDefault()
    errorList.hidden = '';
  }
  
  if(inputNome.value && inputSobrenome.value && inputEmail.value && inputSenha.value && inputRepetirSenha != '' ) {
    //spinner loading
    btnSubmite.classList.add('button--loading')
    btnSubmite.innerText = 'Criando usuário';
    // btnText.style.display = "block";
    errorListUl.innerHTML = '';
  }

  // Consumindo a API
  let dadosUsuario = {
    firstName: campoNomeNormalizado,
    lastName: campoSobrenomeNormalizado,
    email: campoEmailNormalizado,
    password: campoSenhaNormalizado
  }
  

  let dadosUsuarioJson =  JSON.stringify(dadosUsuario)

  // Acesso a API Create users
  const url = "https://ctd-todo-api.herokuapp.com/v1/users"

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: dadosUsuarioJson
  })
  .then(response => {
    if(response.status == 201) {
      return response.json()
    }
    //Se status diferente, cai no catch
		throw response;
  })
  .then(response => {
    cadastroSucesso(response)
  })
  .catch((error) => {
    if(error.status == 400) {
      console.log(error)
      errorList.hidden = '';
      errorListUl.innerHTML += '<li>Erro: <b>Usuário</b> já cadastrado</li>';
      errorListUl.innerHTML += '<li>Erro: Alguns <b>dados</b> incompletos</li>';
    }else{
      cadastroErro(error)
    }
  })
})


//Cria uma function caso tenha sucesso no cadastro
function cadastroSucesso(jsonRecebido) {
	console.log("Json recebido ao cadastrar usuário")
  console.log(jsonRecebido)
  // alert('Usuário cadastrado com sucesso')
  setTimeout(function(){
    btnSubmite.innerText += ` ✅`;

  }, 2000)
  setTimeout(function(){
    location.href = "index.html"
  }, 4000)
}
//Cria uma function caso tenha erro no cadastro
function cadastroErro(statusRecebido) {
  console.log("Erro ao tentar cadastrar usuário")
  console.log(statusRecebido)
}