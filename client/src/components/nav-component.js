import React from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import AuthService from "../services/auth.service";

const NavComponent = ({currentUser,setCurrentUser}) => {
  const handleLogout = () => {
    AuthService.logout();
    window.alert("您已成功登出");
    setCurrentUser(null);
  }
  return (
    <div>
      <nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {/* {currentUser && currentUser.user.role == 'seller' && <li className="nav-item">
                  <Link className="nav-link active" to="/return">
                    返回商城
                  </Link>                
                </li>} */}
                
                
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    首頁
                  </Link>
                </li>
                

                {!currentUser &&
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    註冊會員
                  </Link>
                </li>}


                {!currentUser &&
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    會員登入
                  </Link>
                </li>}

              {currentUser /*&& currentUser.user.role == 'buyer'*/ &&
                <li className="nav-item">
                  <Link onClick={handleLogout} className="nav-link" to="/">
                    登出
                  </Link>
                </li>}
              
              {currentUser /*&& currentUser.user.role == 'buyer'*/ &&
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    個人頁面
                  </Link>
                </li>}

              {currentUser /*&& currentUser.user.role == 'buyer'*/ &&
                <li className="nav-item">
                  <Link className="nav-link" to="/product">
                    購買紀錄
                  </Link>
                </li>}

                {currentUser && currentUser.user.role == 'buyer' &&
                <li className="nav-item">
                  <Link className="nav-link" to="/sellProduct">
                    成為賣家
                  </Link>
                </li>}                

                {currentUser && currentUser.user.role == 'seller' &&
                <li className="nav-item">
                  <Link className="nav-link" to="/myProduct">
                    我的賣場
                  </Link>
                </li>}

                {currentUser && currentUser.user.role == 'seller' &&
                <li className="nav-item">
                  <Link className="nav-link" to="/postProduct">
                    新增商品
                  </Link>
                </li>}
              
              {/* {currentUser && currentUser.user.role == 'buyer' &&
                <li className="nav-item">
                  <Link className="nav-link" to="/enroll">
                    購買商品
                  </Link>
                </li>} */}
              </ul>
            </div>
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
