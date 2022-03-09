import { React, useEffect } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
function Commentprops(props) {
      useEffect(() => {}, []);

      return (
            <>
                  <div className="comments-props-container">
                        <div className="comment-bio">
                              <Image
                                    className="dash-profileImg"
                                    id="comment-profile-pic"
                                    cloudName="delktfw1a"
                                    publicId={props.profileImg}
                              />
                              <p>{props.username}</p>
                        </div>
                        <p>{props.comment}</p>
                  </div>
                  <div className="hr"></div>
            </>
      );
}
export default Commentprops;
