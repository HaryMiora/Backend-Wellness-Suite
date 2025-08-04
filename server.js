const express = require('express');
const app = express();

// Middleware pour lire le JSON
app.use(express.json());

// Route d'accueil
app.get('/', (req, res) => {
  res.send('Hello Backend Express 🚀');
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
