function selectId(id) {
  return document.getElementById(id)
}

const form = selectId('create-conta') 
const errorList = selectId('error-list-container')
const errorListUl = selectId('error-list')
const inputNome = selectId('input-nome')
const inputApelido = selectId('input-apelido')
const inputEmail = selectId('input-email')
const inputSenha = selectId('input-senha')
const inputRepetirSenha = selectId('input-repetir-senha')
const btnSubmite = selectId('btn-criar-conta')

let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let campoNomeNormalizado;
let campoApelidoNormalizado;
let campoEmailNormalizado;;
let campoSenhaNormalizado;

form.addEventListener('submit', (event) => {
  errorListUl.innerHTML = '';

  if(inputNome.value === ''){
    errorListUl.innerHTML += '<li>Campo <b>nome</b> não preenchido</li>';
  }else{
    campoNomeNormalizado = retiraEspacosDeUmValor(inputNome.value)
    campoNomeNormalizado = converteValorRecebidoParaMinusculo(campoNomeNormalizado)
  }

  if(inputApelido.value === ''){
    errorListUl.innerHTML += '<li>Campo <b>apelido</b> não preenchido</li>';
  }
  else{
    campoApelidoNormalizado = retiraEspacosDeUmValor(inputApelido.value)
    campoApelidoNormalizado = converteValorRecebidoParaMinusculo(campoApelidoNormalizado)
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
  }else{
    window.location = 'tarefas.html'
    
  }

})