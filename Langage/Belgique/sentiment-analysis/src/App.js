import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const API_KEY = '*';
const API_ENDPOINT = '*';

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [response, setResponse] = useState('');
  const [showResults, setShowResults] = React.useState(false)


  const onClick = () => setShowResults(true)

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const Results = () => (
    <div id="results" className="search-results">
      <p>Response: {JSON.stringify(response)}</p>
    </div>)

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(API_ENDPOINT, {
        documents: [{ id: '1', text }]
      }, {
        headers: {
          'Ocp-Apim-Subscription-Key': API_KEY
        }
      });
      setSentiment(response.data.documents[0].sentiment);
      setResponse(response.data.documents[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <h1>Sentiment Analysis</h1>
        <form onSubmit={handleSubmit}>
        <TextField onChange={handleChange} value={text} fullWidth label="Votre texte sera analysé ici"/>
          <Button type="submit" variant="contained">
            Valider
          </Button>
        </form>

      {sentiment && <p>Sentiment: {sentiment}</p>}

      <div>
      <input type="submit" value="Show more" onClick={onClick} />
      { showResults ? <Results /> : null }
      </div>


  




  
  </div>
  );

  
}

export default App;