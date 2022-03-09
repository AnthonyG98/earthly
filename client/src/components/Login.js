import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
      let history = useNavigate();

      const [username, setUsername] = useState();
      const [password, setPassword] = useState();

      const onLogin = () => {
            const loginData = {
                  username: username,
                  password: password,
            };
            axios.post("http://localhost:3001/users/login", loginData).then((response) => {
                  if (response.data === "Logged in") {
                        localStorage.setItem("username", username);
                        history("/dashboard");
                  }
            });
      };
      return (
            <>
                  <div className="body-container">
                        <div className="home-img">
                              <div className="home-box">
                                    <p className="sign-text">EARTH.LY</p>
                              </div>
                        </div>
                        <div className="login-container">
                              <label>
                                    Username
                                    <input
                                          type="text"
                                          onChange={(e) => {
                                                setUsername(e.target.value);
                                          }}
                                    />
                              </label>
                              <label>
                                    Password
                                    <input
                                          type="password"
                                          onChange={(e) => {
                                                setPassword(e.target.value);
                                          }}
                                    />
                              </label>
                              <button onClick={onLogin} type="button" className="login-btn">
                                    LOGIN
                              </button>
                              <p>
                                    Not a user yet?{" "}
                                    <Link to="/signup" className="sign-link">
                                          Sign up.
                                    </Link>
                              </p>
                        </div>
                  </div>
                  <div className="login-md-container">
                        <div className="login-img-container">
                              <div className="home-box-md">
                                    <p className="sign-text">EARTH.LY</p>
                                    <div className="login-md-form">
                                          <label>
                                                Username
                                                <input
                                                      type="text"
                                                      onChange={(e) => {
                                                            setUsername(e.target.value);
                                                      }}
                                                />
                                          </label>
                                          <label>
                                                Password
                                                <input
                                                      type="password"
                                                      onChange={(e) => {
                                                            setPassword(e.target.value);
                                                      }}
                                                />
                                          </label>
                                          <button
                                                onClick={onLogin}
                                                type="button"
                                                className="login-btn"
                                          >
                                                LOGIN
                                          </button>
                                          <p>
                                                Not a user yet?
                                                <Link to="/signup" className="sign-link">
                                                      Sign up.
                                                </Link>
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      );
}

export default Login;
