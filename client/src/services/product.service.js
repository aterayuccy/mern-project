import axios from "axios";
const API_URL = "http://localhost:8080/api/product";


class ProductService {
    post(title,description,price){
        let token;
        if(localStorage.getItem("user")){
            token = JSON.parse(localStorage.getItem("user")).token;
        }else{
            token=""
        }
        return axios.post(
            API_URL,
        {title,description,price},
        {headers:{"Authorization": "jwt " +token,}}
            )
    }


    getEnrolledProduct(_id){
        let token;
        if(localStorage.getItem("user")){
            token = JSON.parse(localStorage.getItem("user")).token;
        }else{
            token=""
        }
        return axios.get(API_URL +"/buyer/"+ _id,{
            headers:{
                Authorization: token,}
        })
    }

    get(_id)
    {
        let token;
        if(localStorage.getItem("user")){
            token = JSON.parse(localStorage.getItem("user")).token;
        }else{
            token=""
        }

        return axios.get(API_URL +"/seller/"+_id,{
            headers:{"Authorization": token,}
        })
    }
    getProductByName(name){
        let token;
        if(localStorage.getItem("user")){
            token = JSON.parse(localStorage.getItem("user")).token;
        }else{
            token=""
        }
            return axios.get(API_URL +"/findByName/"+name,{
            headers:{"Authorization": token,}
        })
    }    
    enroll(_id/*productId, quantity = 1*/){
        let token;
        if(localStorage.getItem("user")){
            token = JSON.parse(localStorage.getItem("user")).token;
        }else{
            token=""
        }

        return axios.post(API_URL +"/enroll/"+_id,{},
            {
                headers:{
                Authorization: "jwt "+token,
                }
            }
        )
    }
}

export default new ProductService();