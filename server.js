const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let potions = [
  {
    id: 1,
    name: 'Poción de Cura',
    description: 'Cura heridas leves',
    price: 10,
    quantity: 20,
    category: 'Curación',
    ingredients: ['Hierbas medicinales', 'Agua purificada'],
  },
  {
    id: 2,
    name: 'Poción de Fuerza',
    description: 'Aumenta la fuerza física',
    price: 15,
    quantity: 10,
    category: 'Fuerza',
    ingredients: ['Raíz de dragón', 'Extracto de tigre'],
  },
  // ...
];

// Obtener todas las pociones
app.get('/potions', (req, res) => {
  res.json(potions);
});

// Obtener una poción por ID
app.get('/potions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const potion = potions.find(p => p.id === id);
  if (potion) {
    res.json(potion);
  } else {
    res.status(404).json({ error: 'Poción no encontrada' });
  }
});

// Crear una nueva poción
app.post('/potions', (req, res) => {
  const newPotion = req.body;
  newPotion.id = potions.length + 1;
  potions.push(newPotion);
  res.status(201).json(newPotion);
});

// Actualizar una poción existente
app.put('/potions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedPotion = req.body;
  const index = potions.findIndex(p => p.id === id);
  if (index !== -1) {
    potions[index] = { ...potions[index], ...updatedPotion };
    res.json(potions[index]);
  } else {
    res.status(404).json({ error: 'Poción no encontrada' });
  }
});

// Eliminar una poción
app.delete('/potions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = potions.findIndex(p => p.id === id);
  if (index !== -1) {
    const deletedPotion = potions.splice(index, 1)[0];
    res.json(deletedPotion);
  } else {
    res.status(404).json({ error: 'Poción no encontrada' });
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});