
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the Flask backend
      const response = await axios.post('http://127.0.0.1:5000/submit', {
        password: password,
        email: email,
      });

      console.log(response.data.message)

      // Handle the response from the backend
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error submitting data:', error);
      setResponseMessage('Failed to submit data.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Password:</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default App;
