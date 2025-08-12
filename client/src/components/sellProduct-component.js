import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../services/product.service";
import AuthService from "../services/auth.service";

const SellProductComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
//   let [role,setRole] = useState("buyer");
  
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };  

  const changeRole = async () => {
    console.log("✅ changeRole 被執行了");

  try {
    
    const res = await AuthService.updateRole("seller");

    // ✅ 更新 localStorage 與 currentUser
    // const updatedUser = { currentUser, user: res.data.user };
    const updatedUser = {
    token: currentUser.token,
    user: res.data.user,
    };

    

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);

    window.alert("您已成為賣家");
    navigate("/postProduct");
  } catch (e) {
    window.alert("更新角色失敗：" + (e.response?.data || e.message));
  }
};

 
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>在發布新商品之前，您必須先登錄。</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            帶我進入登錄頁面。
          </button>
        </div>
      )}
      {currentUser /*&& currentUser.user.role == "seller"*/ && (
        <div className="form-group">
          
          <button className="btn btn-primary" onClick={changeRole}>
            申請 
          </button>
          <br />
          <br />
          {/* {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default SellProductComponent;
