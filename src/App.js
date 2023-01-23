import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    occupation: "",
    state: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="name">Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required/>
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required/>
        </div>
        <div>
          <label for="occupation">Occupation</label>
          <input type="text" name="occupation" id="occupation" value={formData.occupation} onChange={handleChange} required/>
        </div>
        <div>
          <label for="state">State</label>
          <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} required/>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required/>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
