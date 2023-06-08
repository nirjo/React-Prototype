import React, { useState } from "react";
// import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { postUser } from "../redux/usersSlice";
// import 'bootstrap/dist/css/bootstrap.css';
import {
  Card,
  Input,
  Alert,
  Checkbox,
  Select,
  Option,
  Button,
  Typography,
} from "@material-tailwind/react";

const UserForm = () => {
  const [userid, setUserId] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: `${firstName} ${lastName}`,
      email,
      gender,
      status: "active",
    };

    dispatch(postUser(newUser))
      .then(() => {
        setShowAlert(true);
      })
      .catch(() => {
        setShowAlert(true);
      });

    setFirstName("");
    setLastName("");
    setEmail("");
    setGender("");
  };

  return (
    <Card color="transparent" shadow={false}>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit}
      >
        <div className="mb-4 flex flex-col gap-6">
          {showAlert && status === "succeeded" && (
            <Alert
              variant="success"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              User added successfully.
            </Alert>
          )}
          {showAlert && status === "failed" && (
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              Failed to add user. {error}
            </Alert>
          )}
          <Input
            size="lg"
            label="First Name"
            type="text"
            // placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            size="lg"
            label="Last Name"
            type="text"
            // placeholder="Enter your Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            size="lg"
            label="Email"
            type="email"
            // placeholder="Enter your Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Select label="Select Gender">
            <Option value="">Select gender</Option>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>

          <Button variant="primary" type="submit">
            CREATE USER
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default UserForm;

{
  /*      
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group 
      className="mb-3" controlId="gender">
        <Form.Label>Gender</Form.Label>
        <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Form.Select>
      </Form.Group> */
}
