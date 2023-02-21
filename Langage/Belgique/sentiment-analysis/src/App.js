import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  

const API_KEY = '*****';
const API_ENDPOINT = '  Endpoint  /text/analytics/v3.0/sentiment';


function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [response, setResponse] = useState('');
  const [showResults, setShowResults] = React.useState(false)


  const mystyle = {
    background: '#fefefe',
    fontfamily: 'Bebas Neue',
    color:'#0f2832',
    textAlign:'center'
  };

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
  <div style={mystyle}>
        <h1 style={{marginBottom: '5%'}} >Sentiment Analysis</h1>
        <form onSubmit={handleSubmit}>
        <TextField style={{width: '80%'}}onChange={handleChange} value={text} label="Insérez votre texte"/><br></br>
          <Button style={{marginTop: '5%'}} type="submit" variant="contained">
            Valider
          </Button>
        </form>
        
      {sentiment && <p>Sentiment: {sentiment}</p>}

      <div>
      <input style={{marginTop: '2%',border:'none', color:'grey', backgroundColor:'#fefefe'}} type="submit" value="... voir plus" onClick={onClick} />
      { showResults ? <Results /> : null }
      </div>
  </div>
  );

  
}

export default App;