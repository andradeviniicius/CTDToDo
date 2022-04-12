//Evento principal que é executado no carregamento da pagina
window.addEventListener('load', () => {
  const tokenSession = sessionStorage.getItem('jwt')
  console.log(tokenSession)
  getDataUserApi()
})

//Function que pega pega dados do usuario na API 
// function getDataUserApi() {
//   fetch('https://ctd-todo-api.herokuapp.com/v1/users/getMe', { 
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'authorization': `${tokenSession}`
//     },
//   })
// }