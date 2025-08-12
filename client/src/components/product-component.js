import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import ProductService from "../services/product.service";

const ProductComponent = ({currentUser,setCurrentUser}) => {
    const navigate=useNavigate();
    const handleTakeToLogin = () => {
        navigate('/login');
    }

    const [productData, setProductData] = useState(null);
    useEffect(()=>{
        let _id;
        if (currentUser){
            _id = currentUser.user._id;
            if(currentUser.user){
                console.log("買家")
                ProductService.getEnrolledProduct(_id)
                .then((data)=>{
                    setProductData(data.data);
                }).catch((e)=>{
                    console.log(e);
                })
            }
        }
    }, []    )


    return (<div style={{padding:"3rem"}}>
    {!currentUser && (
            <div>
                <p>您必須先登入</p>
                <button 
                className="btn btn-primary btn-lg"
                onClick={handleTakeToLogin}>回到登入頁面</button>
            </div>
        )}

    

    {currentUser /*&& currentUser.user.role =="buyer"*/ && (
        <div>
            <h1>歡迎來到買家的商品頁面</h1>
        </div>
        )}

    {currentUser && productData && productData.length!=0 && (
        <div style={{display:"flex",flexWrap:"wrap"}} >
            {productData.map((product)=>{
                return (
                <div className="card" style={{width:"18rem",margin:"1rem"}}>
                    <div className="card-body">
                    <h5 className="card-title">商品名稱:{product.title}</h5>
                    <p style={{margin:"0.5rem 0rem"}} className ="card-text">
                        {product.description}
                    </p>
                    <p style={{margin:"0.5rem 0rem"}}>
                        購買次數:{product.buyer.length}
                        {/* 購買數量: {
    product.buyer.reduce((total, b) => total + b.quantity, 0)
  } */}
                    </p>
                    <p style={{margin:"0.5rem 0rem"}}>
                        商品價格:{product.price}
                    </p>
             </div>
                </div>
                
            )})}
        </div>    
        )}
    </div>    )}



export default ProductComponent;