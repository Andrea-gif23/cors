
const express = require('express');
const axios = require('axios');
const cors = require('cors'); 

const app = express();

app.use(cors());


const PORT = 3000;


app.get('/characters', async (req, res) => {
  try {
    
    const response = await axios.get('https://rickandmortyapi.com/api/character');
   
    res.json(response.data);
  } catch (error) {
  
    res.status(500).json({ error: 'Error al obtener personajes' });
  }
});


app.get('/characters/:name', async (req, res) => {
  const { name } = req.params; 
  try {
  
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
    const character = response.data.results[0]; 
    if (character) {
     
      res.json(character);
    } else {
      
      res.status(404).json({ error: 'Personaje no encontrado' });
    }
  } catch (error) {
    
    res.status(500).json({ error: 'Error al obtener el personaje' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
