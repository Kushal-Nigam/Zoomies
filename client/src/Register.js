import React, {useState, useEffect} from "react";
import axios from 'axios';


// Signup component for the signup form
function Register() {

    const [formValues, setFormValues] = useState({
        email: "",
        firstName: "",
        lastName:"",
        password: "",
        confirmPassword:"",
        error :false,
        success: false,
        register:false
    });

    // Destructuring values from the state
    const { firstName, lastName, email, password, confirmPassword, error, success,register } = formValues;

    // Handles changes in the input fields
    const handleChange = name => event => {
        setFormValues({ ...formValues, error: false, [name]: event.target.value });
    }

    // Submits the form data to the backend
    const onSubmit = async event => {
        event.preventDefault();
        setFormValues({ ...formValues, success: false});

       axios.post('/register', JSON.stringify({firstName, lastName, email, password, confirmPassword}),{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(data =>{
            if(!data.err){
                setFormValues({ ...formValues, success: true })
        }})
        .catch(err=> {
            if(err.response.status === 400){
                setFormValues({ ...formValues, error: true });
            }
            else if(err.response.status === 409){
                setFormValues({ ...formValues, register: true });
            }
            else{
               return err.response.data; // Return error response data
        }
      })
    }

    useEffect(()=>{
        if(document.getElementById('password').value === '' || document.getElementById('confirmPassword').value === ''){
            document.getElementById('message').innerHTML = '';
        }
  else if (document.getElementById('password').value === document.getElementById('confirmPassword').value) {
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = 'Passwords match';
    document.getElementById('submit').disabled = false;
  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'Passwords don\'t match';
    document.getElementById('submit').disabled = true;
  }
    },[password,confirmPassword])
   

    // Displays success message upon successful form submission
    const successMessage = () => {
        return (
            success && (
                <div>
                    <center><p className='login_redirect mt-2'>Account created successfully <b><a href='/login'>Login here</a></b></p></center>
                </div>
            )
        );
    }

    const errorMessage = () => {
        return (
            <div className='error-message' style={{ display: error ? "" : "none", color: "red" }}>
                 <center><p>All field are required</p></center>
            </div>
        );
    }

    const toLogin = () => {
        return (
                <div>
                    <center><p className='login_redirect mt-2'>You already have an Account, Please <b><a href='/login'>Login here</a></b></p></center>
                </div>
            
        );
    }


   
    return ( register? toLogin(): success?  successMessage():
        <div className='form-container'>
            <div className='form-box'>
                <h2>Create an account</h2>
                {errorMessage()}
                <div className='form-group'>
                    <label htmlFor="fisrtName">First Name</label>
                    <input type="text" id="firstName" name="firstName" onChange={handleChange("firstName")} required />
                </div>
                <div className='form-group'>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" onChange={handleChange("lastName")} required />
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" onChange={handleChange("email")} required />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={handleChange("password")} required />
                </div>
                <div className='form-group'>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange("confirmPassword")}  required />
                </div>
                <span id='message'></span>
                <div className="form-group-button">
                    <button id="submit" onClick={onSubmit}>Register</button>
                </div>
                <div className='login-message'>
                        <center><p className='login_redirect mt-2'>Already have an account?<b><a href='/login'> Login here</a></b></p></center>
                    </div>
            </div>
        </div>
    );
}

export default Register;