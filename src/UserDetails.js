import React, { useState } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';

const UserDetails = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    setPosts([...posts, newPost]);
    setNewPost('');
  };

  return (
    <Container>
      <h1>User Details</h1>
      <h2>User Name</h2>
      <Form onSubmit={handlePostSubmit}>
        <Form.Group>
          <Form.Label>Create New Post:</Form.Label>
          <Form.Control
            type="text"
            value={newPost}
            onChange={handlePostChange}
          />
        </Form.Group>
        <Button type="submit">Add Post</Button>
      </Form>
      <Table striped bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{post}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserDetails;
