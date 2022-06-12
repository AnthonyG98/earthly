import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
import Commentprops from "./Commentprops";
function Dashprops(props) {
      let history = useNavigate();
      const [likes, setLikes] = useState(props.likes);
      const [likeStatus, setLikeStatus] = useState();
      const [comment, setComment] = useState();
      const [commentById, setCommentById] = useState();
      const [profileImg, setProfileImg] = useState();
      const getUser = () => {
            axios.get(
                  `https://earth-ly.herokuapp.com/users/${localStorage.getItem("username")}`
            ).then((response) => {
                  setProfileImg(response.data.profile_picture);
            });
      };
      const getThisPost = (postId) => {
            axios.get(`https://earth-ly.herokuapp.com/post/like/${postId}`).then((response) => {
                  let statusLikesToUpdate = response.data.likes;
            });
      };
      console.log(likeStatus);
      const postComments = (postId) => {
            const commentData = {
                  comment: comment,
                  username: localStorage.getItem("username"),
                  PostId: postId,
                  profile_picture: profileImg,
            };
            axios.post("https://earth-ly.herokuapp.com/comments", commentData).then((response) => {
                  console.log(response);
                  axios.get(`https://earth-ly.herokuapp.com/comments/${postId}`).then(
                        (response) => {
                              console.log(response);
                        }
                  );
            });
      };
      const getPostComments = (post) => {
            axios.get(`https://earth-ly.herokuapp.com/comments/byId/${post}`).then((response) => {
                  setCommentById(
                        response.data.map((postEl) => {
                              return (
                                    <Commentprops
                                          profileImg={postEl.profile_picture}
                                          username={postEl.username}
                                          comment={postEl.comment}
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

            getUser();
      }, [likeStatus]);
      return (
            <div className="dash-props-container">
                  <div className="props-bio">
                        <Image
                              className="dash-profileImg"
                              cloudName="delktfw1a"
                              publicId={props.profileImg}
                        />
                        <p className="post-user">{props.user}</p>
                  </div>
                  <div className="props-post">
                        <h1 className="post-title">{props.title}</h1>
                        <p className="post-text">{props.post}</p>
                        <div className="props-icons">
                              <p
                                    className="get-comments"
                                    onClick={() => {
                                          getPostComments(props.id);
                                    }}
                              >
                                    view comments
                              </p>
                        </div>
                  </div>
                  <div className="comments-container">
                        <input
                              type="text"
                              onChange={(e) => {
                                    setComment(e.target.value);
                              }}
                              className="comment-input"
                        />
                        <button
                              onClick={() => {
                                    postComments(props.id);
                              }}
                              className="comment-btn"
                        >
                              Comment
                        </button>
                  </div>
                  {commentById}
            </div>
      );
}

export default Dashprops;
