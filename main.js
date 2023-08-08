
// Get Elements 
let spanCase = document.querySelector('.case');
const btn = document.querySelector('#done');
const head = document.querySelector('.head');
const dicsriptionP = document.querySelector('header > p');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
// const welcoming = document.querySelector('.welcoming-part h3')
let logInText = 'Login'
let signUpText = 'Sign Up'
let message = document.querySelector('.message')
let container = document.querySelector('.contaier')

spanCase.onclick = function(){
    switchCase()
    message.textContent=""
 
}

btn.onclick = function(){
   // Calling any API Func ?
   if(spanCase.textContent=='Sign Up'){
        // login style
        getLogin()
   }else{
        // Register style
        getRegister()
   }
        //Clear forms
       email.value=""   
       password.value=""   

}

function switchCase(){
    if(spanCase.innerHTML=='Login'){
        // if Login 
        // signup form
        head.classList.add('animate__animated','animate__flipInX')
        head.classList.remove('animate__flipInY')
        head.innerHTML = logInText;
        dicsriptionP.classList.add('opacity0')
        email.classList.add('animate__animated','animate__zoomInDown')
        email.classList.remove('animate__zoomIn')
        spanCase.innerHTML=signUpText
        btn.value = logInText
        btn.classList.add('animate__animated','animate__rotateInDownLeft')        
        btn.classList.remove('animate__rotateInDownRight')
        email.placeholder = "Your Email, Phone Number"

        

    }else{ // login form
        head.classList.remove('animate__flipInX')
        head.classList.add('animate__animated','animate__flipInY')
        head.innerHTML = signUpText;
        dicsriptionP.classList.remove('opacity0')
        email.classList.remove('animate__zoomInDown')
        email.classList.add('animate__zoomIn')
        spanCase.innerHTML= logInText
        btn.value = signUpText
        email.placeholder = "User Name"
        btn.classList.add('animate__animated','animate__rotateInDownRight')        
        btn.classList.remove('animate__rotateInDownLeft')


    }
    email.value =""
    password.value =""
}


// Register API function

function getRegister(){
axios.post('https://reqres.in/api/register',{
    "email": email.value,
    "password": password.value})
.then((response)=>{
    localStorage.setItem('token',response.data.token)
    message.textContent='Account Created'// Success
    message.style.color='#00d435'  
                    })
.catch((error)=> {
    message.textContent= error.response.data.error
    message.style.color='red'
})

}

// Login Function 
function getLogin(){
    axios.post('https://reqres.in/api/login',{
        "email": email.value,
        "password": password.value}
        ,
        {
            headers:{'Authorization' : `Bearer ${localStorage.getItem('token')}`}
        }
        )
    .then((response)=> {
            
            container.innerHTML = `<p class='message bold'>Login Success</p>`
            message.style.color='#00d435'
    })
    .catch((res)=> {
        message.textContent=res.response.data.error
        message.style.color='red'
    })
}