// Declare all variables

const form = document.querySelector("#form")
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const PhoneNumber = document.getElementById("phonenumber");
const email = document.getElementById("email");
const createPassword = document.querySelector("#password");
const conPassword = document.querySelector("#confirmPassword");
const togglePassword = document.querySelector('.togglePassword');
const btn = document.getElementById('submitbtn');
 


// Password reveal
togglePassword.addEventListener('click', (e) => {
    

     // toggle the type attribute for create password
     const type = createPassword.getAttribute('type') === 'password' ? 'text' : 'password';
     createPassword.setAttribute('type', type);
        // toggle the eye / eye slash icon
        this.classList.toggle('bi-eye');
  });
  

  togglePassword.addEventListener('click', (e) => {
    

     // toggle the type attribute for confirm password

     const type = conPassword.getAttribute('type') === 'password' ? 'text' : 'password';
     conPassword.setAttribute('type', type);
        // toggle the eye / eye slash icon
        this.classList.toggle('bi-eye');
  });
  


  
 

// clear default action of submit form  


form.addEventListener('input', async function(e) {

    e.preventDefault();
    checkInput();
  
       

});


// declaring checkinput function

    async function checkInput()  {

        const firstnameValue = firstname.value
        const lastNameValue = lastname.value
        const phoneNumberValue  = phonenumber.value
        const emailValue = email.value
        const passwordValue = password.value
        const conPasswordValue = confirmPassword.value

        
        

        if(firstnameValue === ''){

            await setErrorFor(firstname, 'Name cannot be blank');

            
        } else {

            await setSuccessFor(firstname);

        }

        if(lastNameValue === ''){

        await setErrorFor(lastname, 'Name cannot be blank');
        } else {

            await setSuccessFor(lastname);

        }

        if(phoneNumberValue === ''){


         await setErrorFor(phonenumber, 'Number cannot be blank');
        } else {

         await setSuccessFor(phonenumber);
        }

        if(emailValue === ''){


         await setErrorFor(email, 'Email cannot be blank');
        } else if (
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              emailValue
            )
          ) {
              await setSuccessFor(email, "Email is not correctly formatted eg example@company.com");

          }  else {

         await setSuccessFor(email);

        }

        if(passwordValue === ''){


         await setErrorFor(password, 'Password cannot be blank');

        } 
        else if(passwordValue.length <6 ){


         await setErrorFor(password, 'Password is less than 8 characters')
        } else {

         await setSuccessFor(password);

        }

        if(conPasswordValue === ''){


         await setErrorFor(confirmPassword, 'Password cannot be blank')


        } else if(passwordValue < conPasswordValue || passwordValue !== conPasswordValue){


         await setErrorFor(confirmPassword, 'Password does not match')

         
            
        } else {

         await setSuccessFor(confirmPassword);
         
        } 

        
        
    };

   

    // declaring input and sucess or error message function

    function setErrorFor(input, message){

            const formContainer = input.parentElement;
            const small = formContainer.querySelector('small');
            
            // add error message
            formContainer.className = 'form-container error';
            small.innerText = message;  

            document.getElementById('submitbtn').disabled = true;
                
          
        };


    function setSuccessFor(input){
            const formContainer = input.parentElement;
            formContainer.className = 'form-container success' 

            document.getElementById('submitbtn').disabled = false;
                     
        };


     
        
    

btn.addEventListener("click", async (e) => {
    
    e.preventDefault();
      // declare checkinput function
     
  

    document.getElementById('submitbtn').disabled = false;

    let formData = {};
    formData.firstname =firstname.value.trim();
    formData.lastname = lastname.value.trim();
    formData.email = email.value.trim();
    formData.phone = phonenumber.value.trim();
    formData.password = password.value.trim();

    
    console.log(formData)
  
  // disable button
  btn.disabled = true
  btn.innerHTML = "Signing Up..."

   await axios({

        method: 'POST',
        url: 'https://stocka-demo.herokuapp.com/api/v1/auth/register', 
        
        data: formData        
            
        
    }) 
    
    .then((response)  => {       

        Swal.fire(
            'Congratulations!!!',
            'Registration succesful!',
            'success'
          )

         setTimeout(() => {
           window.location.replace("sign-in.html");
         }, 7000);

        console.log(response);

    })

    .catch((error) =>{


        Swal.fire('Oops...', error.message, 'error')

        if (error.response) {
            // Request made and server responded
            Swal.fire('Opps', error.message, 'error');
          } else if (error.request) {
            // The request was made but no response was received
            Swal.fire('Opps', 'A user with the email already exist', 'error');
          } else {
            // Something happened in setting up the request that triggered an Error
            Swal.fire('Opps', error.message, 'error');
          }
        
        

        // console.log(error)
    })
      


  });

  
// const submit = async (req, res) =>{

//     const query = "https://stocka-demo.herokuapp.com/api/v1/auth/register"
//     const formData ={};  
//     formData.firstname = document.querySelector('#firstname').value;
//     formData.lastname = document.querySelector('#lastname').value;
//     formData.email = document.querySelector('#email').value;
//     formData.phone = document.querySelector('#phone').value;
//     formData.password = document.querySelector('#password').value;
  

    // console.log(formData)

    
    // await axios
    // .post(query, formData)
    // .then((response) => {
    //   console.log("list webhook", response.data);

    //   Swal.fire('Congratulations', 'Log in successful', 'success')
    // })
    // .catch((error) => {
    //   // console.log(error);
    //   Swal.fire('Uh oh!', 'Something went wrong!', 'error')
    //   res.status(500).json({
    //     error: error.message,
    //   });
    // });

   

// };


