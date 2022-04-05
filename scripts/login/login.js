//Capturando as informações
let campoEmailLogin = document.getElementById('inputEmail');
let campoSenhaLogin = document.getElementById('inputPassword');
let botaoAcessar = document.getElementById('botaoAcessar');

let campoEmailLoginNormalizado;
let campoSenhaLoginNormalizado;
//variável p/ validar email digitado corretamente @ 
let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//variável de controle da validação
let emailEValido = false;
let senhaEValido = false;

//Definindo objeto
const usuarioObjeto = {
	email: "",
	senha: "",
}

botaoAcessar.addEventListener('click', function(evento){

	if (validacaoTelaDeLogin()) {
		//Normalizando as informações
		campoEmailLoginNormalizado = retiraEspacosDeUmValor(campoEmailLogin.value);
		campoSenhaLoginNormalizado = retiraEspacosDeUmValor(campoSenhaLogin.value);
		campoEmailLoginNormalizado = converteValorRecebidoParaMinusculo(campoEmailLoginNormalizado);

		//Populando o objeto com as informações normalizadas
		usuarioObjeto.email = campoEmailLoginNormalizado;
		usuarioObjeto.senha = campoSenhaLoginNormalizado;

		console.log(usuarioObjeto);
	}else {
		alert("Ambos os campos devem ser informados")
		evento.preventDefault(); 
	}

});


//Validando o campo de Email
campoEmailLogin.addEventListener('blur', function() {
	//Captura o elemento "small"
	let inputEmailValidacao = document.getElementById('inputEmailValidacao');

	//Se o campo estiver com algum valor...
	if (campoEmailLogin.value != "" && regex.test(campoEmailLogin.value)) {
		inputEmailValidacao.innerText = ""
		campoEmailLogin.style.border = ``
		emailEValido = true;

	//Se o campo estiver sem nenhum valor...
	} else {
		inputEmailValidacao.innerText = "E-mail inválido";
		inputEmailValidacao.style.color = "#EE1729EC"
		inputEmailValidacao.style.fontSize = "9pt"
		inputEmailValidacao.style.fontWeight = "bold"
		campoEmailLogin.style.border = `1px solid #EE1729EC`
		emailEValido = false;
	}

	//Chama a função de validar, para "atualizar" o status da validação principal da tela de login
	validacaoTelaDeLogin();
});

//Validando o campo de Senha
campoSenhaLogin.addEventListener('blur', function() {
	let inputSenhaValidacao = document.getElementById('inputSenhaValidacao')

	if(campoSenhaLogin.value != '') {
		inputSenhaValidacao.innerText = ""
		campoSenhaLogin.style.border = ``
		senhaEValido = true;
	}else {
		inputSenhaValidacao.innerText = "A senha deve ser preenchida"
		inputSenhaValidacao.style.color = "#EE1729EC"
		inputSenhaValidacao.style.fontSize = "9pt"
		inputSenhaValidacao.style.fontWeight = "bold"
		campoSenhaLogin.style.border = `1px solid #EE1729EC`
		senhaEValido = false;
	}
	validacaoTelaDeLogin();
})

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