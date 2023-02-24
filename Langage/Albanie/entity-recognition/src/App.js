import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App () {
  const [inputText, setInputText] = useState('');
  const [entities, setEntities] = useState([]);

  const alpha = {
    background: '#fefefe',
    fontfamily: 'Bebas Neue',
    color:'#0f2832',
    textAlign:'center',
  };
  const tablestyle = {
    margin: 'auto',
    width:'75%'
  }


  const handleChange = e => setInputText(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();

    const key = '**';
    const endpoint = '***';
    const url = `${endpoint}text/analytics/v3.0/entities/recognition/general?showStats=true`;
    const headers = { 'Ocp-Apim-Subscription-Key': key };
    const data = { documents: [{ id: '1', text: inputText }] };

    try {
      const res = await axios.post(url, data, { headers });
      setEntities(res.data.documents[0].entities);
      console.log(res.data.documents[0].entities)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
       <div style={alpha} >   
        <h1 style={{marginBottom: '5%'}} >Entity Recognition</h1>
          <form onSubmit={handleSubmit}>
          <TextField  multiline  rows={4}  style={{width: '80%'}}onChange={handleChange} value={inputText} label="Insérez votre texte"/><br></br>
            <Button style={{marginTop: '5%'}} type="submit" variant="contained">
              Valider
            </Button>
          </form>
    </div>

<div   >
    <TableContainer  style={{ marginTop: '5%'}} component={Paper}>
      <Table style={tablestyle} sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Texte</TableCell>
            <TableCell align="right">Categorie</TableCell>
            <TableCell align="right">Sous catégorie</TableCell>
            <TableCell align="right">Fiabilité</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {entities.map(entity => (
            <TableRow
              key={entity.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {entity.text}
              </TableCell>
              <TableCell align="right">{entity.category}</TableCell>
              <TableCell align="right">{entity.subcategory}</TableCell>
              <TableCell align="right">{entity.confidenceScore}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</div>

</> 
  );
};

export default App;
