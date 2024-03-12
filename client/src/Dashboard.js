import React, { useState, useEffect} from 'react';
import { isAuthenticated } from './Backend';
import { useNavigate } from 'react-router-dom';
import JsonDataDisplay from './DisplayPets'
import axios from 'axios';


const Dashboard =  () => {
    const navigate = useNavigate(); // Initialize navigation

    const [petsData, setPetsData] = useState([])
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

    useEffect(()=>{
        const fetchPets = async () => { await axios.get(`/dashboard/${localStorage.getItem("userId")}`, { 
            headers: {
            'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            withCredentials:true
        }).then(response =>{
            setPetsData(response.data)
        })
        .catch(err => console.log(err));
    }
    fetchPets()
    },[])

    // Function to handle logout action
    const addPet = () => {
        navigate('/dashboard/add');
    };
    const updateProfile = () => {
        navigate('/dashboard/update');
    };

    const deleteProfile = async event  =>{
        event.preventDefault();
    
       await axios.delete(`/user/delete/${localStorage.getItem("userId")}`,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            withCredentials:true
        })
        .catch(err => {
            if(err.status === 409){
                navigate('/login');
            }else if(err.status === 400){
                navigate('/register')
            }
            return err.response.data; // Return error response data
        })

       await onSignout()
 
    }

    const onSignout = async () => {
        
    // Removing JWT token upon logout
       await axios.get('/logout' ,{ 
            headers: {
            'Authorization': "Bearer " + localStorage.getItem("jwt")
            },
            withCredentials:true
        }).catch(err => {
            if(err.status === 409){
                navigate('/login');
            }else if(err.status === 400){
                navigate('/register')
            }
            return err.response.data; // Return error response data
        })


    localStorage.removeItem("jwt");
    localStorage.clear();
    console.log("Logout");
    navigate('/login'); // Redirect to login page after sign out
    };

    return ( !authenticated?  <h1>Please <a href='/login'>Login</a></h1> : 
            <div className='dashboard'>
                <button className='logoutButton' onClick={onSignout}>Logout</button>
                <h1>Hello {localStorage.getItem("firstName")} {localStorage.getItem("lastName")}</h1>
                <button className ="updateButton" onClick={updateProfile}>Update Profile</button>
                <button className="addPet" onClick={addPet}>Add pet</button>
                <JsonDataDisplay data={petsData} />
                <button  className="deleteButton"onClick={deleteProfile}>Delete Profile</button>
            </div>
    );
};

export default Dashboard;