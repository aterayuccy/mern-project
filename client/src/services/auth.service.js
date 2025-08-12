import axios from "axios";
const API_URL = "http://localhost:8080/api/user";

class AuthService {
    login(email,password){
        return axios.post(API_URL + "/login", {   
            email,
            password,
        })
    }
    logout(){
        localStorage.removeItem("user");
    }
    register(username,email,password,role){
        return axios.post(API_URL + "/register", {
            username,
            email,
            password,
            role,
            });
    }   
    
    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }

   // AuthService.js
    updateRole(newRole) {
        

  let token;
        if(localStorage.getItem("user")){
            token = JSON.parse(localStorage.getItem("user")).token;
        }else{
            token=""
        }
        console.log("🔑 發送的 token：", token);
// const user = JSON.parse(localStorage.getItem("user"));
//   const token = user?.token || "";
  return axios.patch(
    API_URL + "/updateRole",
    { role: newRole },
    {
      headers: {
        Authorization: "jwt " + token,
      },
    }
  );
}

   


}

export default new AuthService();