import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button, InputGroup } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    occupation: "",
    state: "",
  });

  const [dropdownData, setDropdownData] = useState({
    occupations: [],
    states: [],
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    axios
      .get("https://frontend-take-home.fetchrewards.com/form")
      .then((response) => setDropdownData(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://frontend-take-home.fetchrewards.com/form",
        formData
      );
      notifySuccess();
      console.log(response.status);
      setFormData({
        name: "",
        email: "",
        password: "",
        occupation: "",
        state: "",
      });
    } catch (error) {
      notifyError(error.message);
    }
  };

  const notifySuccess = () =>
    toast.success("🎉 User created!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyError = (errorMsg) =>
    toast.error(`Something went wrong: ${errorMsg}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 App">
      <Form onSubmit={handleSubmit} className="bg-light p-5">
        <h1>Create an account</h1>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            aria-label="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            aria-label="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="occupation">Occupation</Label>
          <Input
            type="select"
            name="occupation"
            id="occupation"
            aria-label="Occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
          >
            <option value="">Select occupation...</option>
            {dropdownData.occupations.map((item, idx) => (
              <option key={idx} value={item}>
                {item}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="state">State</Label>
          <Input
            type="select"
            name="state"
            id="state"
            aria-label="State"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select state...</option>
            {dropdownData.states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              aria-label="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button className="btn" onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
        </FormGroup>
        <Button color="primary" type="submit" className="w-100 p-2 mt-2">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default App;
