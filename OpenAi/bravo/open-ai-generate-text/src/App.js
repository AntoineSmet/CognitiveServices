import './App.css';
import {useState} from "react";
import { Configuration, OpenAIApi} from "openai";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// "You: What have you been up to?\nFriend: Watching old movies.\nYou: Are you looking it in HD?\nFriend:",
const generateTexte = async (newPrompt) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: newPrompt,
    temperature: 0.5,
    max_tokens: 100,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop: ["You:"],
  });

  return response.data.choices[0].text;
}

function App() {
  return (
    <div className="App">
      <h1 sx={{marginBottom: '5%'}}>Generateur Conversationnel</h1>
       <TextField  style={{width: '80%',marginTop: '3%',}} id="filled-basic" label="Votre texte" variant="filled" className='app-input'
      // onChange={(e) => setPrompt(e.target.value)}
      />
      <br/>
    <Button sx={{marginTop: '3%', backgroundColor: '#683bdb' }} variant="contained" size="medium" onClick={generateTexte}>Generation de texte</Button>
    <Box> 
   <footer>
    <Input disabled style={{width: '80%',marginTop: '3%'}} defaultValue="reponse" error />
   </footer>
   </Box>
  </div>
  );
}

export default App;
