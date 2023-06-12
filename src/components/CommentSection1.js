
import React, { useState, useEffect } from "react";
import data from "./data.json";

import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";

import CustomInputt from "../components/CustomInputt";
import Editable from "../components/Editable";

// import user from "./user.png";

const App = () => {
  const [comment, setComment] = useState(data);
  const userId = "01a";
  const avatarUrl = "https://ui-avatars.com/api/name=Riya&background=random";
  const name = "xyz";
  const signinUrl = "/signin";
  const signupUrl = "/signup";
  let count = 0;
  comment.map((i) => {
    count += 1;
    i.replies && i.replies.map((i) => (count += 1));
  });

  const [textEditable, setTextEditable] = useState("");

  useEffect(() => {
    console.log(comment);
  }, [comment]);

  const customInputFunc = (props) => {
    return (
      <CustomInputt
        parentId={props.parentId}
        cancellor={props.cancellor}
        value={props.value}
        edit={props.edit}
        submit={props.submit}
        handleCancel={props.handleCancel}
      />
    );
  };

  const editable = (props) => {
    return (
      // <div className="form">
      //   <div className="row">
      //     {" "}
      //     <img src={user} style={{ width: 80, height: 80 }} />
      //     <div className="row">
      //       <div className="arrow-left"></div>
      //       <div className="input-div">
      //         <span className="input-name">Riya Negi</span>
      //         <Editable
      //           value={textEditable}
      //           onChange={(evt) => {
      //             setTextEditable(evt.target.value);
      //           }}
      //           onCancel={(evt) => {
      //             setTextEditable("");
      //           }}
      //           onPost={(evt) => {
      //             console.log("onPost >", textEditable);
      //           }}
      //           parentId={props.parentId}
      //           cancellor={props.cancellor}
      //           value={props.value}
      //           edit={props.edit}
      //           submit={props.submit}
      //           handleCancel={props.handleCancel}
      //         />
      //       </div>
      //     </div>
      //   </div>
      // </div>

      <Editable
        value={textEditable}
        onChange={(evt) => {
          setTextEditable(evt.target.value);
        }}
        onCancel={(evt) => {
          setTextEditable("");
        }}
        onPost={(evt) => {
          console.log("onPost >", textEditable);
        }}
      />
    );
  };

  return (
    <div className="cols">
      <div className="commentSection">
        {/* <div className="header">{count} Comments (user logged in)</div>
        <CommentSection
          currentUser={
            userId && { userId: userId, avatarUrl: avatarUrl, name: name }
          }
          commentsArray={comment}
          setComment={setComment}
          signinUrl={signinUrl}
          signupUrl={signupUrl}
        /> */}
        <div className="header">
          {" "}
          Custom Input Field component (user logged in)
        </div>
        <CommentSection
          currentUser={
            userId && { userId: userId, avatarUrl: avatarUrl, name: name }
          }
          commentsArray={comment}
          setComment={setComment}
          signinUrl={signinUrl}
          signupUrl={signupUrl}
          customInput={customInputFunc}
        />
      </div>
      {/* <div class="verticalLine"></div>
      <div className="commentSection">
        <div className="header">{count} Comments (user not logged in)</div>
        <CommentSection
          commentsArray={comment}
          setComment={setComment}
          signinUrl={signinUrl}
          signupUrl={signupUrl}
        />
      </div> */}

      {/* <div>
        <CommentSection
          currentUser={
            userId && { userId: userId, avatarUrl: avatarUrl, name: name }
          }
          commentsArray={comment}
          setComment={setComment}
          signinUrl={signinUrl}
          signupUrl={signupUrl}
          customInput={editable}
        />
      </div> */}
    </div>
  );
};

export default App;
