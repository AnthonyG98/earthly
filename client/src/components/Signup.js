import React, { isValidElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState();
      const [formErr, setFormErr] = useState(false);
      const [firstNameError, setFirstNameError] = useState("");
      const [lastNameError, setLastNameError] = useState("");
      const [usernameError, setUsernameError] = useState("");
      const [passwordError, setPasswordError] = useState("");
      let history = useNavigate();
      //Fetching data
      const addUser = async () => {
            let img = "default_nlfrji";
            if (password.length < 8) {
                  return setFormErr(true), setPasswordError("Password must be longer");
            }
            const signUpData = {
                  firstName: firstName,
                  lastName: lastName,
                  username: username,
                  password: password,
                  profile_picture: img,
            };
            axios.post("https://earth-ly.herokuapp.com/users", signUpData).then((response) => {
                  localStorage.setItem("username", username);
                  history("/setup");
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
                                    First name
                                    <input
                                          className="login-input"
                                          type="text"
                                          onClick={() => {
                                                setFormErr(false);
                                          }}
                                          onChange={(e) => {
                                                setFirstName(e.target.value);
                                          }}
                                    />
                                    <p id="firstName-err" className="valid-err">
                                          {firstNameError}
                                    </p>
                              </label>
                              <label>
                                    Last name
                                    <input
                                          onClick={() => {
                                                setFormErr(false);
                                          }}
                                          className="login-input"
                                          type="text"
                                          onChange={(e) => {
                                                setLastName(e.target.value);
                                                // checkLastName(e.target.value);
                                          }}
                                    />
                                    <p id="lastName-err" className="valid-err">
                                          {lastNameError}
                                    </p>
                              </label>
                              <label>
                                    Username
                                    <input
                                          onClick={() => {
                                                setFormErr(false);
                                          }}
                                          className="login-input"
                                          type="text"
                                          onChange={(e) => {
                                                setUsername(e.target.value);
                                                // checkUsername(e.target.value);
                                          }}
                                    />
                                    <p id="username-err" className="valid-err">
                                          {usernameError}
                                    </p>
                              </label>
                              <label>
                                    Password
                                    <input
                                          className="login-input"
                                          type="password"
                                          onChange={(e) => {
                                                setPassword(e.target.value);
                                          }}
                                    />
                                    <p id="password-err" className="valid-err">
                                          {formErr ? `${passwordError}` : ""}
                                    </p>
                              </label>
                              <button type="button" className="login-btn" onClick={addUser}>
                                    Sign Up
                              </button>
                              <p>
                                    Already a member?
                                    <Link to="/" className="sign-link">
                                          Login.
                                    </Link>
                              </p>
                        </div>
                  </div>
            </>
      );
}

export default Signup;
