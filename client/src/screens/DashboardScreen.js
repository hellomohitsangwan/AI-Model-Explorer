import React from "react";
import "./Screen.css";
import { Link } from "react-router-dom";
import dashArrow from "../assets/dashArrow.svg";
import dashFarmer from "../assets/dashboardBackground.svg";
import { useSelector } from "react-redux";

const DashboardScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <>
      {userInfo && userInfo.isAdmin && (
        <div>
          <div className="dashboard">
            <div className="amount-dashboard">
              <div className="amount-rect">
                <div className="rect-details">
                  <div className="gap"></div>
                  <div className="heading">
                    <p className="amt-title">Welcome to your Dashboard</p>
                  </div>
                  {/* <div className="amount">$1299.67</div> */}
                </div>
              </div>
            </div>
            <div className="row2">
              <div className="products-dashboard">
                <div className="products-rect">
                  <div className="rect-details">
                    <div className="gap"></div>
                    <div className="heading">
                      <p>AI Models</p>
                    </div>
                    {/* <div className="amount">9</div> */}
                    <div className="dashArrow">
                      <Link to={"/admin/modellist"}>
                        <button className="dashBtn">
                          <img src={dashArrow} alt="" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="orders-dashboard">
                <div className="orders-rect">
                  <div className="gap"></div>
                  <div className="rect-details">
                    <div className="heading">
                      <p>Profile</p>
                    </div>
                    {/* <div className="amount">3</div> */}
                    <div className="dashArrow">
                      <Link to={"/profile"}>
                        <button className="dashBtn">
                          <img src={dashArrow} alt="" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row3">
              <div className="reviews-dashboard">
                <div className="reviews-rect">
                  <div className="gap"></div>
                  <div className="rect-details">
                    <div className="heading">
                      <p>Reviews</p>
                    </div>
                    {/* <div className="amount">2</div> */}
                    <div className="dashArrow">
                      <button className="dashBtn2">
                        <img src={dashArrow} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DashboardScreen;
