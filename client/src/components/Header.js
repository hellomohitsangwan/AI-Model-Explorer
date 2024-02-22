import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import logo from "../images/logo1.svg";
import cart from "../assets/cart.svg";
import "../assets/navbar.css";
import dropdown from "../assets/dropdown.svg";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <>
      {location.pathname === "/" ? null : (
        <nav className="navbar navbar1" >
          <div className="nav-center">
          <Link to="/home" style={{ color: "white", fontSize: "40px" }}>
              ModelHub
            </Link>
            <ul className="nav-links">
              {userInfo ? (
                <div className="info">
                  <button className="info-button hc">
                    Hi! {userInfo.name.split(" ")[0]}{" "}
                    <img src={dropdown} alt="" />
                  </button>
                  <ul>
                    <li>
                      <p onClick={logoutHandler} className="logout">
                        Logout
                      </p>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link className="hc" to="/login">SignIn</Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <div>
                  <Link className="hc" to="/dashboard">Dashboard</Link>
                </div>
              )}
              <li>
                {" "}

                <Link className="hc" to="/topProducts">
                  Trending
                </Link>

                <Link className="hc" to="/favourite">
                  Favourites {" "}
                  <svg
                    className="phi"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
