import React from "react";
import { useNavigate } from "react-router-dom";
import defaultImg from "../images/default.jpg";
function Setup() {
      let history = useNavigate();

      const getData = () => {
            history("/dashboard");
      };
      return (
            <>
                  <div className="setup-container">
                        <div className="setup-box-container">
                              <p className="setup-text">
                                    Welcome to EARTH.LY, a forum for all things nature. Head to your
                                    profile page to edit.
                              </p>
                              <button className="setup-btn" onClick={getData}>
                                    Next
                              </button>
                        </div>
                  </div>
            </>
      );
}

export default Setup;
