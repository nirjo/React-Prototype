import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import UserList from "./UserList";
import UserDetails from "./UserDetails";
import PostDetails from "./PostDetails";
import Header from "./components/Header";
// import Dashboard from "./views/Dashboard";

function App() {
  return (
    <Provider store={store}>
       <Header /> 
      <Router basename="/">
        <Routes>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          <Route path="/" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route exact path="/posts/:postId" element={<PostDetails />} />

          <Route>404 Not Found!</Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
