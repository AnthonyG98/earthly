import React, { useState, useEffect } from "react";
import defaultImg from "../images/default.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Submit() {
      const [username, setUsername] = useState();
      const [profilePicture, setProfilePicture] = useState();
      const [postTitle, setPostTitle] = useState();
      const [post, setPost] = useState();
      const [profileId, setProfileId] = useState();
      let history = useNavigate();
      const getUser = () => {
            axios.get(
                  `https://earth-ly.herokuapp.com/users/${localStorage.getItem("username")}`
            ).then((response) => {
                  console.log(response);
                  setUsername(response.data.username);
                  setProfilePicture(response.data.profile_picture);
                  setProfileId(response.data.id);
            });
      };
      const onPost = () => {
            const postData = {
                  username: username,
                  profile_picture: profilePicture,
                  post_title: postTitle,
                  post: post,
                  likes: 0,
                  id: profileId,
            };
            axios.post("https://earth-ly.herokuapp.com/post", postData).then((response) => {
                  history("/dashboard");
            });
      };
      useEffect(() => {
            if (!localStorage.getItem("username")) {
                  history("/");
            }
            getUser();
      }, []);

      return (
            <>
                  <div className="submit-container">
                        <div className="dash-head-container">
                              <div>
                                    <input
                                          className="search-input"
                                          type="text"
                                          placeholder="Search for something."
                                    />
                                    <button className="search-btn">Search</button>
                              </div>
                              <div>
                                    <img src={defaultImg} alt="" className="dash-profileImg" />
                              </div>
                        </div>
                  </div>
                  <div className="submit-post-container">
                        <input
                              type="text"
                              placeholder="Title"
                              className="submit-text"
                              onChange={(e) => {
                                    setPostTitle(e.target.value);
                              }}
                        />
                        <textarea
                              placeholder="Type your post."
                              className="submit-post"
                              onChange={(e) => {
                                    setPost(e.target.value);
                              }}
                        ></textarea>
                        <button className="setup-btn" onClick={onPost}>
                              Post
                        </button>
                  </div>
            </>
      );
}

export default Submit;
