import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
  List,
  ListItemPrefix,
  Chip,
  Typography,
} from "@material-tailwind/react";

import {
  fetchUserById,
  fetchPostsByUserId,
  postPost,
} from "./redux/usersSlice";

import PostDetails from "./PostDetails";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

function UserDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.selectedUser);
  const posts = useSelector((state) => state.users.posts);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showalert, setShowAlert] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      user_id: `${id}`,
      title: `${title}`,
      body: `${body}`,
    };
    console.log(newPost);

    dispatch(postPost(newPost))
      .then(() => {
        setShowAlert(true);
      })
      .catch(() => {
        setShowAlert(true);
      });

    setTitle("");
    setBody("");
  };

  useEffect(() => {
    dispatch(fetchUserById(id));
    dispatch(fetchPostsByUserId(id));
  }, [dispatch, id]);

  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <Typography variant="h1" color="blue">
                  User Details
                </Typography>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                >
                  See UserDetails
                </button>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            {user !== null && (
              <div>
                <Card className="flex-row w-full max-w-[48rem]">
                  <CardHeader
                    shadow={false}
                    floated={false}
                    className="w-2/5 shrink-0 m-0 rounded-r-none"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                      alt="image"
                      className="w-full h-full object-cover"
                    />
                  </CardHeader>
                  <CardBody>
                    <h1 className="text-2xl font-bold">
                      {user.name}'s Details
                    </h1>
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <h2 className="text-lg font-bold">User Information</h2>
                      <Avatar
                        variant="circular"
                        alt="user 3"
                        className="border-2 border-white hover:z-10 focus:z-10"
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
                      />
                      <p>
                        {" "}
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p>
                        <strong>Status:</strong>
                        <Chip
                          variant="ghost"
                          color="green"
                          size="sm"
                          value={user.status}
                          icon={
                            <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-green-900" />
                          }
                        />
                      </p>
                    </div>
                    <a href="#" className="inline-block">
                      <Button
                        variant="text"
                        className="flex items-center gap-2"
                      >
                        Learn More
                        <ArrowLongRightIcon
                          strokeWidth={2}
                          className="w-4 h-4"
                        />
                      </Button>
                    </a>
                  </CardBody>
                </Card>

                {/* <h1 className="text-2xl font-bold">{user.name}'s Details</h1>
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <h2 className="text-lg font-bold">User Information</h2>
                  <Avatar
                    variant="circular"
                    alt="user 3"
                    className="border-2 border-white hover:z-10 focus:z-10"
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
                  />
                  <p>
                    {" "}
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <Chip
                      variant="ghost"
                      color="green"
                      size="sm"
                      value={user.status}
                      icon={
                        <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-green-900" />
                      }
                    />
                  </p>
                </div> */}
                <Typography variant="h2" color="amber">
                  Posts
                </Typography>
                {/* <h2 className="text-xl font-bold">Posts</h2> */}
                <ul>
                  {posts.map((post) => (
                    <List key={post.id} className="border rounded p-4 mb-4">
                      <ListItemPrefix>
                        <Link to={`/posts/${post.id}`}>
                          <strong>Title:</strong> {post.title}
                        </Link>
                      </ListItemPrefix>
                    </List>
                  ))}
                </ul>
                <Typography variant="h2" color="green">
                  Create New Post
                </Typography>
                {/* <h2 className="text-xl font-bold">Create New Post</h2> */}
                <form onSubmit={handleSubmit} className="mb-4">
                  <input type="hidden" name="userId" value={id} />
                  <textarea
                    rows={3}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter post title"
                    className="border rounded p-2 w-full mb-2"
                  />
                  <textarea
                    rows={3}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Enter post body"
                    className="border rounded p-2 w-full mb-2"
                  />
                  <Button color="green" type="submit">
                    Create Post
                  </Button>
                </form>
              </div>
            )}
            <div>{/* <Comments /> */}</div>
          </div>
        </div>
      </div>
      <div className="w-full xl:w-4/12 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <Typography variant="h4" color="blue-gray">
                  Create Comments
                </Typography>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <Button
                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                >
                  See all Comments
                </Button>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <PostDetails />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
