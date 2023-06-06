import React, { useState } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  const handleUserChange = (e) => {
    setNewUser(e.target.value);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, newUser]);
    setNewUser('');
  };

  return (
    <Container>
      <h1>User List</h1>
      <Form onSubmit={handleUserSubmit}>
        <Form.Group>
          <Form.Label>Create New User:</Form.Label>
          <Form.Control
            type="text"
            value={newUser}
            onChange={handleUserChange}
          />
        </Form.Group>
        <Button type="submit">Add User</Button>
      </Form>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;
