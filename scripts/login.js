let inputEmail = document.getElementById("inputEmail")
let inputPassword = document.getElementById("inputPassword")
let submitBtn = document.getElementById("submitBtn")



submitBtn.addEventListener("click", (event) => {
    event.preventDefault()
    if(inputEmail.value != "" && inputPassword.value != ""){

        let inputEmailValue = convertToLowercase(removeSpaces(inputEmail.value))
        let inputPasswordValue = removeSpaces(inputPassword.value)
        
        console.log(inputEmailValue, inputPasswordValue)

       /*  inputEmailValue.convertToLowercase(inputEmailValue)
 */

    } else {
        event.preventDefault();
    }
})