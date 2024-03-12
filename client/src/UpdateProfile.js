import React, {useState,useEffect} from "react";
import { useNavigate, Navigate} from 'react-router-dom';
import axios from 'axios';
import { update, isAuthenticated} from "./Backend";


const UpdateProfile = ({ data }) =>{
    const navigate = useNavigate(); 
    const [userDetails, setUserDetails] = useState({
        email: localStorage.getItem("email"),
        firstName: localStorage.getItem("firstName"),
        lastName:localStorage.getItem("lastName"),
        error :"",
        success: false
    });

       // Destructuring values from the state
    const { email, firstName, lastName, error, success } = userDetails;

    
    const [authenticated,setAuthenticated] = useState(true)

    

    useEffect(()=>{
        const authenticatedUser = async()=>{
            if (await isAuthenticated()){
               return setAuthenticated(true)
            }else
              return setAuthenticated(false)
        }
        authenticatedUser();
    },[authenticated])



const handleChange = name => event => {
    setUserDetails({ ...userDetails, error: false, [name]: event.target.value });
}

// Submits the form data to the backend
const onSubmit = async event => {
    event.preventDefault();
    setUserDetails({ ...userDetails, success: false});

   await axios.put(`/user/update/${localStorage.getItem("userId")}`, JSON.stringify({firstName, lastName, email}),{
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': "Bearer " + localStorage.getItem("jwt")
        },
        withCredentials:true
    })
    .then(data => {
        if (data.error) {
            setUserDetails({ ...userDetails, error: data.error, success: false });
        } else {
            update(data, () => {
                setUserDetails({ ...userDetails, success: true });
            })
        }
    })
    .catch(err => {
        if(err.status === 409){
            navigate('/login');
        }else if(err.status === 400){
            navigate('/register')
        }
        return err.response.data; // Return error response data
    })

}


const errorMessage = () => {
    return (
        <div className='error-message' style={{ display: error ? "" : "none", color: "red" }}>
            {error}
        </div>
    );
}


return ( !authenticated?  <h1>Please <a href='/login'>Login</a></h1> : success? <Navigate to="/dashboard"/>:
        <div className='form-container'>
            <div className='form-box'>
                <h2>Update Account</h2>
                {errorMessage()}
                <div className='form-group'>
                    <label htmlFor="fisrtName">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={firstName} onChange={handleChange("firstName")} required />
                </div>
                <div className='form-group'>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={lastName} onChange={handleChange("lastName")} required />
                </div>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" value={email} onChange={handleChange("email")} required />
                </div>
                <div className="form-group-button">
                    <button id="submit" onClick={onSubmit}>Update</button>
                </div>
            </div>
        </div>
    );
    
}

export default UpdateProfile