import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import Dashprops from "./Dashprops";
function Dashboard() {
      let history = useNavigate();
      const [profileImg, setProfileImg] = useState();
      const [postList, setPostList] = useState();
      const [postId, setPostId] = useState();

      const getUser = () => {
            axios.get(`http://localhost:3001/users/${localStorage.getItem("username")}`).then(
                  (response) => {
                        setProfileImg(response.data.profile_picture);
                        localStorage.setItem("id", response.data.id);
                  }
            );
      };
      const getPosts = () => {
            axios.get("http://localhost:3001/post").then((response) => {
                  const mappedId = response.data.map((el) => {
                        return el.id;
                  });

                  setPostList(
                        response.data.map((postData) => {
                              return (
                                    <Dashprops
                                          id={postData.id}
                                          user={postData.username}
                                          title={postData.post_title}
                                          post={postData.post}
                                          profileImg={postData.profile_picture}
                                          likes={postData.likes}
                                          // onClick={(postData.like = postData.likes + 1)}
                                    />
                              );
                        })
                  );
            });
      };
      useEffect(() => {
            if (!localStorage.getItem("username")) {
                  history("/");
            }
            getPosts();
            getUser();
      }, []);
      return (
            <div className="dashboard-container">
                  <div className="dash-head-container">
                        <Link to="/dashboard" className="homebar-container">
                              <i class="fas fa-globe-americas"></i>
                              <h1>EARTH.LY</h1>
                        </Link>
                        <div className="message-icon">
                              <Link to="/messages">
                                    <i class="fas fa-comments-alt"></i>
                              </Link>
                              <Link to="/profile">
                                    <Image
                                          className="dash-profileImg"
                                          cloudName="delktfw1a"
                                          publicId={profileImg}
                                    />
                              </Link>
                        </div>
                  </div>
                  <div className="dash-post-container">
                        <div className="create-link">
                              <input
                                    placeholder="Create a post"
                                    onClick={() => {
                                          history("/submit");
                                    }}
                                    className="dash-input"
                              />
                        </div>
                        <div className="post-list">{postList}</div>
                  </div>
            </div>
      );
}

export default Dashboard;
