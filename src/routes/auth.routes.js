const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const passport = require('../config/passport');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const generateToken = require('../utils/generateToken');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Google OAuth - étape 1 : redirection vers Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth - étape 2 : callback après connexion Google
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Générer un JWT pour l'utilisateur connecté
    const token = generateToken(req.user);
    // Redirection vers ton frontend avec le token
    res.redirect(`http://localhost:5173/login?token=${token}`);
  }
);

// Exemple : route protégée réservée aux admins
router.get('/admin', authMiddleware, roleMiddleware('ADMIN'), (req, res) => {
  res.json({ message: 'Bienvenue admin !' });
});

module.exports = router;
