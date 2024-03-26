import axios from 'axios';

//SETTING THE JWT TOKEN IN USER'S BROWSER
export const authenticate = (data, next) => {
    // Storing JWT token in user's browser
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", data.data.accessToken);
        localStorage.setItem("firstName", data.data.firstName)
        localStorage.setItem("lastName", data.data.lastName)
        localStorage.setItem("email", data.data.email)
        localStorage.setItem("userId",data.data.Id)
        const validDate = new Date()
        localStorage.setItem("valid_until", (validDate.getTime() + 300000).toString())
        next();
    }
}

export const update = (data, next) => {
    // Storing updated user details in user's browser
    if(typeof window !== "undefined"){
        localStorage.setItem("firstName", data.data.firstName)
        localStorage.setItem("lastName", data.data.lastName)
        localStorage.setItem("email", data.data.email)
        next();
    }
}



//VALIDATION IF USER IS SIGNED IN
export const isAuthenticated = async () => {
    var tokenValid;
    // Checking if the user is authenticated
    if (typeof window === "undefined") {
        return false
    }
    if(localStorage.getItem("jwt")){
        const currentDate = new Date();
        if(localStorage.getItem("valid_until") > currentDate.getTime().toString()){
            tokenValid = true;
        }else{
            await axios.get('/refresh', {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }).then(data => {
                localStorage.removeItem("jwt");
                localStorage.removeItem("valid_until");  
                localStorage.setItem("jwt",data.data.accessToken)
                const newValidDate = new Date();
                localStorage.setItem("valid_until", (newValidDate.getTime() + 300000).toString())
                tokenValid = true;
              }).catch(err=> {
                if(err.response.status === 403 || err.response.status === 401){
                    tokenValid = false;
                }else{
                    return err.response.data; // Return error response data
                }
            })
        }
        return tokenValid;

    }else{
        return false
    }
}