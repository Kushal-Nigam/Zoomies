import React, {useState,useEffect} from "react";
import { useNavigate, Navigate} from 'react-router-dom';
import axios from 'axios';
import {isAuthenticated} from "./Backend";


// Signup component for the signup form
function AddPet() {
    
    const navigate = useNavigate(); 
    const [petDetails, setPetsDetails] = useState({
        name: "",
        type: "",
        breed:"",
        testResults: "",
        error :"",
        success: false,
    });

    // Destructuring values from the state
    const { name, type, breed, testResults, error, success } = petDetails;

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

    // Handles changes in the input fields
    const handleChange = name => event => {
        setPetsDetails({ ...petDetails, error: false, [name]: event.target.value });
    }

    // Submits the form data to the backend
    const onSubmit = async event => {
        event.preventDefault();
        setPetsDetails({ ...petDetails, success: false});

       axios.post(`/dashboard/add/${localStorage.getItem("userId")}`, JSON.stringify({name, type, breed, testResults}),{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            withCredentials:true
        })
        .then(data => {
            if (data.error) {
                setPetsDetails({ ...petDetails, error:  data.error, success: false });
            }
            else {
                setPetsDetails({ ...petDetails, success: true });
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
   
   
    return ( !authenticated?  <h1>Please <a href='/login'>Login</a></h1> :success?  <Navigate to="/dashboard" />:
        <div className='form-container'>
            <div className='form-box'>
                <h2>Add a Pet</h2>
                {errorMessage()}
                <div className='form-group'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" onChange={handleChange("name")} required />
                </div>
                <div>
                <div className="custom-select"  >
                    <label> Type of Pet
                        <select onChange={handleChange("type")}>
                            <option></option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                        </select>
            
                    </label>
                    </div>
                 </div>
                <div className='form-group'>
                    <label htmlFor="breed">Breed</label>
                    <input type="text" id="breed" name="breed" onChange={handleChange("breed")} required />
                </div>
                <div className="form-group-button">
                    <button id="submit" onClick={onSubmit}>Add</button>
                </div>
            </div>
        </div>
    );
}

export default AddPet