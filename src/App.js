import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './UserList';
import UserDetails from './UserDetails';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">User List</Link>
            </li>
            <li>
              <Link to="/user-details">User Details</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" component={UserList} />
          <Route path="/user-details" component={UserDetails} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
