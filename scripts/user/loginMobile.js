const accessBtnMobile = document.querySelector('.mobileLoginBtn')
const landingPageMobile = document.querySelector('.left')
const loginPageMobile = document.querySelector('.right')
const signupPageMobile = document.querySelector('.rightSignup')


accessBtnMobile.addEventListener('click',()=>{

    landingPageMobile.style.display = 'none'
    
    loginPageMobile.style.display = 'flex'
    loginPageMobile.style.width = '100%'
})