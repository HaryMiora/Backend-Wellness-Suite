const bcrypt = require('bcrypt');
const prisma = require('../config/prisma');
const generateToken = require('../utils/generateToken');

class AuthService {
  async register({ name, email, password, role }) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('Email déjà utilisé');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role }
    });

    const token = generateToken(user);
    return { user, token };
  }

  async login({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Utilisateur introuvable');

    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch) throw new Error('Mot de passe incorrect');

    const token = generateToken(user);
    return { user, token };
  }
}

module.exports = new AuthService();
