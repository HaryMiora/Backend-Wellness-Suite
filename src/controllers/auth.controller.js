const authService = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const data = await authService.register({ name, email, password, role });
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login({ email, password });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
