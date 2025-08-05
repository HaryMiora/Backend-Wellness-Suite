const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Exemple : route protégée réservée aux admins
router.get('/admin', authMiddleware, roleMiddleware('ADMIN'), (req, res) => {
  res.json({ message: 'Bienvenue admin !' });
});

module.exports = router;
