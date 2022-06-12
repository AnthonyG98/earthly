import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
import Dashprops from "./Dashprops";
function Profile() {
      let history = useNavigate();
      const [profileImg, setProfileImg] = useState();
      const [myPosts, setMyPosts] = useState();
      const [image, setImage] = useState();
      const [id, setId] = useState();
      const [bioText, setBioText] = useState();
      const userPosts = () => {
            axios.get(
                  `https://earth-ly.herokuapp.com/post/allPosts/${localStorage.getItem("id")}`
            ).then((response) => {
                  setMyPosts(
                        response.data.map((postData) => {
                              return (
                                    <Dashprops
                                          user={postData.username}
                                          title={postData.post_title}
                                          post={postData.post}
                                          profileImg={postData.profile_picture}
                                    />
                              );
                        })
                  );
            });
      };
      const getUser = () => {
            axios.get(
                  `https://earth-ly.herokuapp.com/users/${localStorage.getItem("username")}`
            ).then((response) => {
                  setProfileImg(response.data.profile_picture);
                  setId(response.data.id);
                  userPosts();
            });
            // getUser();
            // window.onload(getUser);
      };
      const changeProfileImg = () => {
            const imgFormData = new FormData();
            imgFormData.append("file", image);
            imgFormData.append("upload_preset", "fy5ahm9g");
            axios.post(`https://api.cloudinary.com/v1_1/delktfw1a/image/upload`, imgFormData).then(
                  (response) => {
                        const fileName = response.data.public_id;
                        const imageData = {
                              profile_picture: fileName,
                        };

                        axios.put(
                              `https://earth-ly.herokuapp.com/users/profile/${id}`,
                              imageData
                        ).then((response) => {
                              //  const changePostPicure = () => {
                              //  };
                              //  changePostPicure();
                              const postImageData = {
                                    userId: id,
                                    profile_picture: fileName,
                              };
                              axios.put(
                                    `https://earth-ly.herokuapp.com/post/profile/${id}`,
                                    postImageData
                              ).then((response) => {
                                    console.log(response);
                              });
                        });
                  }
            );
      };
      useEffect(() => {
            if (!localStorage.getItem("username")) {
                  history("/");
            }
            getUser();
      }, []);
      return (
            <div className="profile-container">
                  <div className="dash-head-container">
                        <Link to="/dashboard" className="homebar-container">
                              <i class="fas fa-globe-americas"></i>
                              <h1>EARTH.LY</h1>
                        </Link>
                        <div>
                              <Link to="/profile">
                                    <Image
                                          className="dash-profileImg"
                                          cloudName="delktfw1a"
                                          publicId={profileImg}
                                    />
                              </Link>
                        </div>
                  </div>
                  <div className="bio-container">
                        <div className="bio-img-container">
                              <Image
                                    className="bio-profileImg"
                                    cloudName="delktfw1a"
                                    publicId={profileImg}
                              />
                              <div className="change-img-container">
                                    <p>Change profile picture</p>
                                    <input
                                          type="file"
                                          className="change-img"
                                          onChange={(e) => {
                                                setImage(e.target.files[0]);
                                          }}
                                    />
                                    <button
                                          onClick={() => {
                                                changeProfileImg();
                                          }}
                                    >
                                          Change
                                    </button>
                              </div>
                        </div>
                  </div>
                  <div className="bio-container-md">
                        <div className="bio-img-container-md">
                              <Image
                                    className="bio-profileImg-md"
                                    cloudName="delktfw1a"
                                    publicId={profileImg}
                              />
                              <div className="change-img-container-md">
                                    <p>Change profile picture</p>
                                    <input
                                          type="file"
                                          className="change-img"
                                          onChange={(e) => {
                                                setImage(e.target.files[0]);
                                          }}
                                    />
                                    <button
                                          onClick={() => {
                                                changeProfileImg();
                                          }}
                                    >
                                          Change
                                    </button>
                              </div>
                        </div>
                  </div>
                  <div className="my-posts">{myPosts}</div>
            </div>
      );
}

export default Profile;
