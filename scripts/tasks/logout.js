const logout = document.querySelector(('#closeApp'))
const modal = document.querySelector('.logoutModal')
const button = document.querySelectorAll('.btnBox button')


logout.addEventListener('click',(e)=>{
    console.log(e);
    modal.style.display = "flex"
    
    button[0].addEventListener('click',()=>{
        sessionStorage.removeItem('jwt')
        window.location.href = "index.html"        
    })
    
    button[1].addEventListener('click',()=>{
        modal.style.display = "none"        
    })
})

modal.addEventListener('click',()=>{
    console.log('teste');
})

