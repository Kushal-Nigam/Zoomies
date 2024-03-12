import React, {useState} from 'react';
import { authenticate } from "./Backend";
import { Navigate } from 'react-router-dom'; 
import axios from 'axios';

// Signin component for the login form
 function Login(){
    // Initializing states for form fields, error, loading, and success messages
    const [values, setValues] = useState({
        email: "",
        password: "",
        success: false,
        register:false,
        error:false
    });

    // Destructuring values from the state
    const { email, password,success,register, error} = values;
    
    // Handles changes in the input fields
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    }

    // Submits the form data to the backend for user authentication
    const onSubmit = async event => {
        event.preventDefault();
        setValues({ ...values, success: false });
        axios.post('/login/auth', JSON.stringify({email, password}), {
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          credentials:'include'
      }).then(data => {
         authenticate(data, () => {
            setValues({ ...values, success: true });
        })        
      }).catch(err=> {
                if(err.response.status === 401){
                    setValues({ ...values, register: true });
                }
                else if(err.response.status === 400){
                    setValues({ ...values, error: true });
                }
                else{
                   return err.response.data; // Return error response data
            }
          })
    }

    const toRegister = () => {
        return (
                <div>
                    <center><p className='login_redirect mt-2'>You don't have an Account, Please <b><a href='/register'>Register here</a></b></p></center>
                </div>
            
        );
    }

    const errorMessage = () => {
        return (
            <div className='error-message' style={{ display: error ? "" : "none", color: "red" }}>
                <center><p>Password doesn't match, Try again</p></center>
            </div>
        );
    }


    return (register? toRegister():
        success ? <Navigate to="/dashboard" /> :
            <div className='form-container'>
                <div className='form-box'>
                    <h2>Login</h2>
                    {errorMessage()}
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" value={email} onChange={handleChange("email")} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={handleChange("password")} required />
                    </div>
                    <div className="form-group-button">
                        <button onClick={onSubmit}>Log in</button>
                    </div>
                    <div className='login-message'>
                        <center><p className='login_redirect mt-2'>Don't have an account?<b><a href='/register'> Register here</a></b></p></center>
                    </div>
                </div>
            </div>
    )
}

export default Login;