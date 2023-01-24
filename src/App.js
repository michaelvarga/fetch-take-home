import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
    states: []
  })

  useEffect(() => {
    axios.get("https://frontend-take-home.fetchrewards.com/form")
      .then((response) => setDropdownData(response.data))
      .catch(error => console.log(error))
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('https://frontend-take-home.fetchrewards.com/form', formData);
      console.log('sucess')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label for="name">Name</label>
          <Input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label for="email">Email</label>
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label for="occupation">Occupation</label>
          <Input
            type="select"
            name="occupation"
            id="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
          >
            {dropdownData.occupations.map((item, idx) => (<option key={idx} value={item}>{item}</option>))}
          </Input>
        </FormGroup>
        <FormGroup>
          <label for="state">State</label>
          <Input
            type="select"
            name="state"
            id="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            {dropdownData.states.map(state => (<option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>))}
          </Input>
        </FormGroup>
        <FormGroup>
          <label for="password">Password</label>
          <Input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
