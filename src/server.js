require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
