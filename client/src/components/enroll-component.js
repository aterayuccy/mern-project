import React ,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../services/product.service";

const EnrollComponent = ({currentUser,setCurrentUser}) => {
    const navigate=useNavigate();
    let [searchInput,setSearchInput]=useState('')
    let [searchResult,setSearchResult]=useState(null)
    const [quantities, setQuantities] = useState({});

    // let [countInput,setCountInput]=useState('')
    // let [countResult,setCountResult]=useState(null)
    const handleTakeToLogin = () => {
        navigate('/login');
    }

    const handleChangeInput =(e) =>{
        setSearchInput(e.target.value)
    }

    // const handleQuantityChange = (e, productId) => {
    //     setQuantities({
    //         ...quantities,
    //         [productId]: e.target.value,
    //     });
    //     };


    const handleSearch =  () => {         
        ProductService.getProductByName(searchInput).then((data)=>{
            setSearchResult(data.data)
        }).catch(e=>{
            console.log(e)
        })
    }

    const handleEnroll = (e) => {
        if (!currentUser) {
            window.alert("請先登入才能購買商品");
            navigate("/login");
            return;
        }

        // const quantity = parseInt(quantities[productId]) || 1;
        ProductService.enroll(e.target.id/*productId, quantity*/).then(()=>{
            window.alert("您已成功購買")
            navigate("/product")
        }).catch(e=>{
            console.log(e)
        })
    }

    return (<div style={{padding:"3rem"}}>
        {/* {!currentUser && (
            <div>
                <p>您必須先登入</p>
                <button 
                className="btn btn-primary btn-lg"
                onClick={handleTakeToLogin}>回到登入頁面</button>
            </div>
        )}    */}
        
        {/* {currentUser && currentUser.user.role =="seller" && (
        <div>
            <h1>只有買家才能購買商品</h1>
        </div>
        )} */}

        {/* {currentUser && currentUser.user.role =="buyer" && (
        <div className="search input-group mb-3">
            <input 
            type="text" 
            className="form-control"
            onChange={handleChangeInput}
            />
            <button onClick={handleSearch} className="btn btn-primary">搜尋商品</button>
        </div>
        )} */}

        <div className="search input-group mb-3">
            <input 
            type="text" 
            className="form-control"
            onChange={handleChangeInput}
            />
            <button onClick={handleSearch} className="btn btn-primary">搜尋商品</button>
        </div>
        
        {
            /*currentUser && */searchResult && searchResult.length != 0 && <div>
                {/* <p>返回數據</p> */}
                    {searchResult.map((product)=>{
                        return (<div 
                        key={product._id} 
                        className="card" 
                        style={{width: "18rem"}}
                        >

                       
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
                    <p style={{margin:"0.5rem 0rem"}}>
                        賣家:{product.seller.username}
                    </p>
{/* 
                    <input
                        type="number"
                        min="1"
                        placeholder="購買數量"
                        value={quantities[product._id] || ""}
                        onChange={(e) => handleQuantityChange(e, product._id)}
                        className="form-control mb-2"
                    /> */}

                    <a href="#" 
                    id={product._id} 
                    className="card-text btn btn-primary"
                    onClick={handleEnroll}
                    // onClick={() => handleEnroll(product._id)}
                    >
                        購買商品
                    </a>
                        </div>
                         </div>)

                    })
                    }
            </div>
        }




        </div>
    )
    
}

export default EnrollComponent