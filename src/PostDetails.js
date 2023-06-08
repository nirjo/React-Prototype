import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "./redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
// import { Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  //fetchUserById,
  //fetchPostsByUserId,
  fetchCommentByPostId,
  postComment,
} from "./redux/usersSlice";
import {
  Card,
  List,
  Input,
  Alert,
  Checkbox,
  Select,
  Option,
  Button,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

function PostDetails() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector((state) => state.users.selctedPost);
  const comments = useSelector((state) => state.users.comments);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [showAlert, setShowAlert] = useState("");

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);
  useEffect(() => {
    dispatch(fetchCommentByPostId(postId));
  }, [dispatch, postId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Implement your logic to submit the comment here
    // You can access the comment fields' values: name, email, body
    // and dispatch an action to save the comment to the database

    // Clear the comment fields after submission
    const newComment = {
      post_id: `${postId}`,
      name: `${name}`,
      email: `${email}`,
      body: `${body}`,
    };
    console.log(newComment);
    dispatch(postComment(newComment))
      .then(() => {
        // alert("success");
        setShowAlert(true);
      })
      .catch(() => {
        // alert("success");
        setShowAlert(true);
      });
    setName("");
    setEmail("");
    setBody("");
  };

  return (
    <div className="block w-full overflow-x-auto">
      <Typography variant="h2" color="blue">
        Posts
      </Typography>
      {post !== null && (
        <div>
          <Card color="transparent" shadow={false}>
            <List className="border rounded p-4 mb-4">
              {/* <Link to={`/posts/${post.id}`}><strong>Title:</strong> {post.title}</Link> */}

              <ListItemPrefix>
                <strong>Title:</strong>
                {post.title}
              </ListItemPrefix>
            </List>

            <List className="border rounded p-4 mb-4">
              <ListItemPrefix>
                <strong>Body:</strong>
                {post.body}
              </ListItemPrefix>
            </List>
          </Card>
          {/* <Card className="mb-4">
            <Card.Body>
              <Card.Text>{post.body}</Card.Text>
            </Card.Body>
          </Card> */}
          <Typography variant="h1" color="blue">
            Comments{" "}
          </Typography>
          <Card className="mb-4">
            <Typography variant="h4" color="green">
              Add Comments{" "}
            </Typography>{" "}
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleCommentSubmit}
            >
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  color="purple"
                  size="lg"
                  label=" Name"
                  type="text"
                  // placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                />
                <Input
                  color="purple"
                  size="lg"
                  label="Email"
                  type="email"
                  // placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                />
                <Input
                  color="purple"
                  size="lg"
                  label="Body"
                  as="textarea"
                  rows={3}
                  // placeholder="Enter your comment"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                />

                <Button
                  color="amber"
                  variant="primary"
                  type="submit"
                  className="px-4 py-2"
                >
                  Post Comments
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
