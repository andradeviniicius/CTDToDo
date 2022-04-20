function selectId(id) {
  return document.getElementById(id)
}

const form = selectId('create-conta') 
const inputNome = selectId('input-nome')
const inputSobrenome = selectId('input-sobrenome')
const inputEmail = selectId('input-email')
const inputSenha = selectId('input-senha')
const inputRepetirSenha = selectId('input-repetir-senha')
const msgErrorApi = selectId('msg-error-api')
const btnSubmite = selectId('btn-criar-conta')
const btnText = document.querySelector('.button--text')

let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let campoNomeNormalizado;
let campoSobrenomeNormalizado;
let campoEmailNormalizado;
let campoSenhaNormalizado;

function validacaoDadosInput(event) {
  const msgErroNome = document.getElementById('msg-nome')
  if(inputNome.value != ""){
    campoNomeNormalizado = retiraEspacosDeUmValor(inputNome.value)
    campoNomeNormalizado = converteValorRecebidoParaMinusculo(campoNomeNormalizado)
    msgErroNome.innerText = "";
  }else{
    msgErroNome.innerText = "Preencha o campo nome";
  }

  const msgErroSobrenome = document.getElementById('msg-sobrenome')
  if(inputSobrenome.value != ""){
    campoSobrenomeNormalizado = retiraEspacosDeUmValor(inputSobrenome.value)
    campoSobrenomeNormalizado = converteValorRecebidoParaMinusculo(campoSobrenomeNormalizado)
    msgErroSobrenome.innerText = "";
  }else{
    msgErroSobrenome.innerText = "Preencha o campo sobrenome";
  }

  const msgErroEmail = document.getElementById('msg-email')
  if(inputEmail.value != "" && regex.test(inputEmail.value)){
    campoEmailNormalizado = retiraEspacosDeUmValor(inputEmail.value)
    campoEmailNormalizado = converteValorRecebidoParaMinusculo(campoEmailNormalizado)
    msgErroEmail.innerText = "";
  }else{
    msgErroEmail.innerText = "Campo email inválido";
  }

  const msgErroSenha = document.getElementById('msg-senha')
  const msgErroRepetirSenha = document.getElementById('msg-repetir-senha')

  if(inputSenha.value === ""){
    msgErroSenha.innerText = "Preencha o campo senha";
  }else if(inputSenha.value != inputRepetirSenha.value){
    msgErroRepetirSenha.innerHTML = "Repita a senha corretamente"
    msgErroSenha.innerText = "";
    event.preventDefault();
  }else if(inputSenha.value === inputRepetirSenha.value) {
    campoSenhaNormalizado = retiraEspacosDeUmValor(inputSenha.value)
    campoSenhaNormalizado = converteValorRecebidoParaMinusculo(campoSenhaNormalizado)
    msgErroSenha.innerText = "";
    msgErroRepetirSenha.innerText = "";
  }else{
    event.preventDefault(); 
  }


}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  mostrarSpinner()
  validacaoDadosInput(event)
  
  
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
      setTimeout(() => {
        
        ocultarSpinner()
      }, 2000)
      return response.json()
    }
    //Se status diferente, cai no catch
		throw response;
  })
  .then(response => {
    cadastroSucesso(response)
    document.getElementById('create-conta').reset();

  })
  .catch((error) => {
    if(error.status == 400) {
      setTimeout(() => {

        ocultarSpinner()
      }, 2000)
      console.log(error)
      
    }else{
      ocultarSpinner()
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
    mensagemDeSucesso()

  }, 2000)
  
}
//Cria uma function caso tenha erro no cadastro
function cadastroErro(statusRecebido) {
  console.log("Erro ao tentar cadastrar usuário")
  console.log(statusRecebido)
}


//function de mensagens
function mensagemDeSucesso() {
  Swal.fire(
    "Usuário cadastrado com sucesso", //titulo
    'click em ok para continuar', //Mensagem
    'success' // Tipo de ícone
  )
}