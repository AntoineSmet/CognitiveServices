
import './App.css';
import {useState} from "react";
import { Configuration, OpenAIApi} from "openai";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';


function App() {
  const [prompt, setPrompt] = useState("");
  const [imagehid, setImagehid] = useState("false");
  const [result, setResult] = useState("");
  const [isLoading, setLoading] = useState(true);
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async()=>{
    setLoading(false);

  const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    setLoading(true);
    setImagehid(false);
    setResult(response.data.data[0].url)
    console.log(response.data.data[0].url);
  };
  return (
    <div className="App">
      <Box hidden={isLoading} 
         sx={{ width: '100%',
         marginBottom:'1rem'}} >
      <LinearProgress />
      </Box>
      <h1 sx={{marginBottom: '5%'}}>Generateur d'image</h1>
      <TextField  style={{width: '80%',marginTop: '3%',}} id="filled-basic" label="Votre texte" variant="filled" className='app-input'
        onChange={(e) => setPrompt(e.target.value)}/>
        <br/>
      <Button sx={{marginTop: '3%', backgroundColor: '#683bdb' }} variant="contained" size="medium" onClick={generateImage}>Generation de l'image</Button>
      <Box hidden={imagehid}> 
      <footer>
       <img className="result-image" src={result} /> 
     </footer>
     </Box>
    </div>
  );
}

export default App;
