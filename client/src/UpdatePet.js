import React, {useState} from "react";
import { useNavigate, Navigate} from 'react-router-dom';
import axios from 'axios';

const UpdatePet = ({ data }) =>{

    const navigate = useNavigate(); 
    const [petDetails, setPetsDetails] = useState({
        name: data.Name,
        type: data.Type,
        breed:data.Breed,
        testResults:data.Test_Results,
        error :"",
        success: false
    });

       // Destructuring values from the state
    const { name, type, breed, testResults, error, success } = petDetails;



const handleChange = name => event => {
    setPetsDetails({ ...petDetails, error: false, [name]: event.target.value });
}

// Submits the form data to the backend
const onSubmit = async event => {
    event.preventDefault();
    setPetsDetails({ ...petDetails, success: false});

   await axios.put(`/dashboard/update/${data.id}`, JSON.stringify({name, type, breed, testResults}),{
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

    window.location.reload(false)
}


const errorMessage = () => {
    return (
        <div className='error-message' style={{ display: error ? "" : "none", color: "red" }}>
            {error}
        </div>
    );
}


return ( success? <Navigate to="/dashboard"/>:
        <div className='form-box'>
            <h2>Update Pet</h2>
            {errorMessage()}
            <div className='form-group'>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={name} onChange={handleChange("name")} required />
            </div>
            
            <div className="custom-select"  >
                <label> Type of Pet
                    <select value={type} onChange={handleChange("type")}>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                    </select>
                </label>
                </div>
            <div className='form-group'>
                <label htmlFor="breed">Breed</label>
                <input type="text" id="breed" name="breed" value={breed} onChange={handleChange("breed")} required />
            </div>
            <div className="form-group-button">
                <button id="submit" onClick={onSubmit}>Update</button>
            </div>
        </div>

);
}

export default UpdatePet