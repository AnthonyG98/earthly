import React, { isValidElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
       const [initialState, setInitialState] = useState({
              firstName: "",
              lastName: "",
              username: "",
              password: "",
       });
       const [firstName, setFirstName] = useState("");
       const [lastName, setLastName] = useState("");
       const [username, setUsername] = useState("");
       const [password, setPassword] = useState("");
       const [formErr, setFormErr] = useState(false);

       const [firstNameError, setFirstNameError] = useState("");
       const [lastNameError, setLastNameError] = useState("");
       const [usernameError, setUsernameError] = useState("");
       const [passwordError, setPasswordError] = useState("");
       const [newUser, setNewUser] = useState();
       let history = useNavigate();
       // const checkFirstName = () => {
       //        if (firstName.length < 3 || firstName === "") {
       //               setFormErr(true);
       //               setFirstNameError("First name must be longer.");
       //               const validText = document.getElementById("firstName-err");
       //               validText.style.display = "block";
       //        } else {
       //               setFirstNameError("");
       //               const validText = document.getElementById("firstName-err");
       //               validText.style.display = "none";
       //        }
       // };
       // const checkLastName = () => {
       //        if (lastName.length < 3 || lastName === "") {
       //               setFormErr(true);
       //               setLastNameError("Last name must be longer.");
       //               const validText = document.getElementById("lastName-err");
       //               validText.style.display = "block";
       //        } else {
       //               setLastNameError("");
       //               const validText = document.getElementById("lastName-err");
       //               validText.style.display = "none";
       //        }
       // };
       // const checkUsername = () => {
       //        if (username.length < 3 || username === "") {
       //               setUsernameError("Username must be longer.");
       //               const validText = document.getElementById("username-err");
       //               validText.style.display = "block";
       //        } else {
       //               setUsernameError("");
       //               const validText = document.querySelector(".valid-err");
       //               validText.style.display = "none";
       //        }
       // };
       // const checkPassword = () => {
       //        if (password.length < 3 || password === "") {
       //               setPasswordError("Password must be longer.");
       //               const validText = document.getElementById("password-err");
       //               validText.style.display = "block";
       //        } else {
       //               setPasswordError("");
       //               const validText = document.querySelector(".valid-err");
       //               validText.style.display = "none";
       //        }
       // };
       //Fetching data
       const addUser = async () => {
              let user;
              let img = "default_bgtog9";
              const signUpData = {
                     firstName: firstName,
                     lastName: lastName,
                     username: username,
                     password: password,
                     profile_picture: img,
              };
              axios.post("http://localhost:3001/users", signUpData).then((response) => {
                     // console.log(response);
                     // setNewUser(response.data);
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
                                                        setInitialState({ firstName });
                                                        setFormErr(false);
                                                 }}
                                                 onChange={(e) => {
                                                        setFirstName(e.target.value);
                                                        // checkFirstName(e.target.value);
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
                                                        // checkPassword(e.target.value);
                                                 }}
                                          />
                                          <p id="password-err" className="valid-err">
                                                 {passwordError}
                                          </p>
                                   </label>
                                   <button
                                          type="button"
                                          className="login-btn"
                                          onClick={addUser}
                                   >
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
