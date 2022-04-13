let campoEmailLogin = document.getElementById('inputEmail');
let campoSenhaLogin = document.getElementById('inputPassword');
let botaoAcessar = document.getElementById('botaoAcessar');
let mensageErroApi = document.getElementById('message-erro-api')

let campoEmailLoginNormalizado;
let campoSenhaLoginNormalizado;
let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let emailEValido = false;
let senhaEValido = false;

const usuarioObjeto = {
	email: "",
	password: "",
}

/*	Abaixo temos dois listeners para os campos E-mail e senha 

	Quando o usuario tirar o foco do input referenciado o sistema:
		1- Valida as informacoes que o usuario colocou
			-caso passe os testes o campo de erro fica vazio e as variaveis "xxxxEValido" se tornam true"
			-caso não passse o campo de erro se mostra e as variaveis "xxxxEValido" se tornam false"
		2- Por fim Chama a funcao validacaoTelaDeLogin que confere essas duas variaveis
			Caso seja verdadeiro ele libera o botao de acessar
			Caso seja falso ele bloqueia o botao de acessar
*/

function validacaoTelaDeLogin () {
	if (emailEValido && senhaEValido) {
		botaoAcessar.removeAttribute('disabled')
		botaoAcessar.innerText = "Acessar";
		return true;
	} else {
		botaoAcessar.setAttribute('disabled', true);
		botaoAcessar.innerText = "Bloqueado";
		return false;
	}
}

campoEmailLogin.addEventListener('blur', ()=> {
	let mensagemErroEmail = document.getElementById('mensagemErroEmail');
	mensageErroApi.innerText = ""

	
	if (campoEmailLogin.value != "" && regex.test(campoEmailLogin.value)) {
		mensagemErroEmail.innerText = ""
		campoEmailLogin.style.border = ``
		emailEValido = true;
		
	} else {
		mensagemErroEmail.innerText = "E-mail inválido";
		mensagemErroEmail.style.color = "#EE1729EC"
		mensagemErroEmail.style.fontSize = "9pt"
		mensagemErroEmail.style.fontWeight = "bold"
		campoEmailLogin.style.border = `1px solid #EE1729EC`
		emailEValido = false;
	}

	validacaoTelaDeLogin();
});

campoSenhaLogin.addEventListener('blur', ()=> {
	let mensagemErroSenha = document.getElementById('mensagemErroSenha')
	mensageErroApi.innerText = ""


	if(campoSenhaLogin.value != '') {
		mensagemErroSenha.innerText = ""
		campoSenhaLogin.style.border = ``
		senhaEValido = true;
	}else {
		mensagemErroSenha.innerText = "A senha deve ser preenchida"
		mensagemErroSenha.style.color = "#EE1729EC"
		mensagemErroSenha.style.fontSize = "9pt"
		mensagemErroSenha.style.fontWeight = "bold"
		campoSenhaLogin.style.border = `1px solid #EE1729EC`
		senhaEValido = false;
	}
	validacaoTelaDeLogin();
})



botaoAcessar.addEventListener('click',(event) => {
	if (validacaoTelaDeLogin()) {
		event.preventDefault();
		
		campoEmailLoginNormalizado = retiraEspacosDeUmValor(campoEmailLogin.value);
		campoSenhaLoginNormalizado = retiraEspacosDeUmValor(campoSenhaLogin.value);
		campoEmailLoginNormalizado = converteValorRecebidoParaMinusculo(campoEmailLoginNormalizado);

		//Populando o objeto com as informações normalizadas
		usuarioObjeto.email = campoEmailLoginNormalizado;
		usuarioObjeto.password = campoSenhaLoginNormalizado;

		let usuarioObjetoJson =  JSON.stringify(usuarioObjeto)

		// Consumindo a API
		const url = "https://ctd-todo-api.herokuapp.com/v1/users/login"

		fetch(url, {
			method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
			body: usuarioObjetoJson
		})
		.then(response => {
			if(response.status == 201) {
				return response.json()

			}
			//Se status diferente diferente, cai no catch
			throw response;
		})
		.then(response => {
			loginSucesso(response)
		})
		.catch((error) => {
			if(error.status == 404) {
				mensageErroApi.innerText = "Usuário não existe"
				mensageErroApi.style.color = "#EE1729EC"
				setTimeout(() => {
					mensageErroApi.innerText = ""
				}, 4000)
			}else{
				loginErro(error)
			}
		})
		
	}else {
		event.preventDefault(); 
		alert("Ambos os campos devem ser informados")
	}
});

function loginSucesso(jsonRecebido) {
	console.log(jsonRecebido)
	sessionStorage.setItem('jwt', JSON.stringify(jsonRecebido))
	window.location.href = "tarefas.html"
	document.getElementById('form-login').reset();
}

function loginErro(statusRecebido) {
	console.log(statusRecebido)
	mensageErroApi.innerText = "Erro ao logar!, confira os dados!"
	mensageErroApi.style.color = "#EE1729EC"
}