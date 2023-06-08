import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  users: [],
  status: "idle",
  error: null,
  selectedUser: null,
  posts: [],
  selctedPost: null,
  comments: [],
};
// Define the asynchronous thunk for fetching users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (page) => {
  try {
    const perPage = 10;
    // alert((`https://gorest.co.in/public/v2/users?page=${page}&per_page=${perPage}`));
    const response = await axios.get(
      `https://gorest.co.in/public/v2/users?page=${page}&per_page=${perPage}`
    );
    return response.data;
  } catch (error) {
    throw Error("Error fetching users");
  }
});

/*
// Define the asynchronous thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get('https://gorest.co.in/public/v2/users?page=4&per_page=100');
    // console.log(response)
    //  console.log(response.data)
    return response.data;
  } catch (error) {
    // console.log(19)
    throw Error('Error fetching users');
  }
});*/
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId) => {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v2/users/${userId}`
      );
      // console.log(`https://gorest.co.in/public/v2/users/${userId}`)
      //console.log(response.data)

      return response.data;
    } catch (error) {
      throw Error("Error fetching user");
    }
  }
);
export const fetchPostsByUserId = createAsyncThunk(
  "users/fetchPostsByUserId",
  async (userId) => {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v2/posts?user_id=${userId}`
      );
      // console.log(`https://gorest.co.in/public/v2/users/${userId}`)
      console.log(response);

      return response.data;
    } catch (error) {
      throw Error("Error fetching user");
    }
  }
);
export const fetchPostById = createAsyncThunk(
  "users/fetchPostById",
  async (postId) => {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v2/posts/${postId}`
      );
      // console.log(`https://gorest.co.in/public/v2/users/${userId}`)
      console.log(response);

      return response.data;
    } catch (error) {
      throw Error("Error fetching user");
    }
  }
);
export const fetchCommentByPostId = createAsyncThunk(
  "users/fetchCommentByPostId",
  async (postId) => {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v2/comments?post_id=/${postId}`
      );
      // console.log(`https://gorest.co.in/public/v2/users/${userId}`)
      console.log(response);
      //console.log()
      return response.data.data;
    } catch (error) {
      throw Error("Error fetching user");
    }
  }
);

export const postPost = createAsyncThunk(
  "users/postPost",
  async (newPost, thunkAPI) => {
    try {
      //const { accessToken } = thunkAPI.getState().auth; // Get the access token from the auth state in your Redux store
      const accessToken =
        "a1012a2237ffd63964e6b9ad6f4e7a59fa044a8e62e65a1cbb49ad4f54870998"; // Get the access token from the auth state in your Redux store
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
      };

      console.log(newPost);

      // console.log(config)
      const response = await axios.post(
        "https://gorest.co.in/public/v2/posts",
        newPost,
        config
      );
      // console.log(response.data)
      return response.data.data;
    } catch (error) {
      throw Error("Error posting user");
    }
  }
);

export const postComment = createAsyncThunk(
  "users/postPost",
  async (newComment, thunkAPI) => {
    try {
      //const { accessToken } = thunkAPI.getState().auth; // Get the access token from the auth state in your Redux store
      const accessToken =
        "a1012a2237ffd63964e6b9ad6f4e7a59fa044a8e62e65a1cbb49ad4f54870998"; // Get the access token from the auth state in your Redux store
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
      };

      console.log(newComment);

      // console.log(config)
      const response = await axios.post(
        "https://gorest.co.in/public/v2/comments",
        newComment,
        config
      );
      // console.log(response.data)
      return response.data.data;
    } catch (error) {
      throw Error("Error posting user");
    }
  }
);

// Define the asynchronous thunk for posting a user
export const postUser = createAsyncThunk(
  "users/postUser",
  async (user, thunkAPI) => {
    try {
      //const { accessToken } = thunkAPI.getState().auth; // Get the access token from the auth state in your Redux store
      const accessToken =
        "a1012a2237ffd63964e6b9ad6f4e7a59fa044a8e62e65a1cbb49ad4f54870998"; // Get the access token from the auth state in your Redux store
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
      };

      // console.log(config)
      const response = await axios.post(
        "https://gorest.co.in/public/v2/users",
        user,
        config
      );
      // console.log(response.data)
      return response.data.data;
    } catch (error) {
      throw Error("Error posting user");
    }
  }
);

// Create the users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // post users
      .addCase(postUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(postUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPostsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostsByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPostsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;

        // posts
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selctedPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;

        // Comments
      })
      .addCase(fetchCommentByPostId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommentByPostId.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload)
        // console.log("3")
        state.comments = action.payload;
      })
      .addCase(fetchCommentByPostId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
export const {} = usersSlice.actions;
//export { fetchUsers, postUser };
