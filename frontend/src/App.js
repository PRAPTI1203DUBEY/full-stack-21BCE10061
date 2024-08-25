import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './global.css';

function App() {
  const rollNumber = '21BCE10061'; // Replace this with your actual roll number

  useEffect(() => {
    document.title = rollNumber; // Set the website title
  }, [rollNumber]);

  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState([]);
  const [filteredData, setFilteredData] = useState(null);

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      setError('');
      const apiResponse = await axios.post('http://your-backend-api-url/endpoint', parsedJson);
      setResponse(apiResponse.data);
      setOptions([
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'numbers', label: 'Numbers' },
        { value: 'highestLowercase', label: 'Highest Lowercase Alphabet' }
      ]);
    } catch (err) {
      setError('Invalid JSON input or API Error.');
    }
  };

  const handleFilterChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    let filtered = response.data;

    if (selectedValues.includes('alphabets')) {
      filtered = filtered.filter(item => /^[a-zA-Z]+$/.test(item));
    }

    if (selectedValues.includes('numbers')) {
      filtered = filtered.filter(item => /^[0-9]+$/.test(item));
    }

    if (selectedValues.includes('highestLowercase')) {
      const highest = Math.max(...filtered.filter(item => /^[a-z]$/.test(item)));
      filtered = [String.fromCharCode(highest)];
    }

    setFilteredData(filtered);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Your Roll Number</h1> {/* Replace with your actual roll number */}
      <textarea
        rows="5"
        value={jsonInput}
        onChange={handleJsonChange}
        placeholder='Enter JSON: { "data": ["A", "C", "z"] }'
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      ></textarea>
      <button onClick={handleSubmit} style={{ marginTop: '10px', padding: '10px 20px' }}>
        Submit
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <>
          <Select
            isMulti
            options={options}
            onChange={handleFilterChange}
            placeholder='Select Filter Options'
            style={{ marginTop: '20px' }}
          />
          <h2>Filtered Response</h2>
          <pre>{JSON.stringify(filteredData, null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default App;
