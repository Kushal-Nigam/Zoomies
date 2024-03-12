import UpdatePet from "./UpdatePet";
import React, {useState} from "react";
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const Pets = ({ data }) => {
    const navigate = useNavigate()
    const [update, setUpdate] = useState(false)

    const changeUpdate = () =>{
        setUpdate(true)
    }


    
    const handleDelete = async event  =>{
        event.preventDefault();
    
       await axios.delete(`/dashboard/delete/${data.id}`,{
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

        window.location.reload(false)
    }
    

    return ( update ? <UpdatePet data={data}/>:
        <article className="pet">
                <h2>{data.Name}</h2>
                <p className="petType">A lovely <b>{data.Type}</b> of <b>{data.Breed}</b> breed</p>
                <p className="petTest">{data.Test_Results} Test Results will come here</p>
                <button className = "updatePetButton" onClick={changeUpdate}>Update pet</button>
                <button className = "deletePetButton" onClick={handleDelete}>Delete pet</button>
        </article>
    )
}

export default Pets