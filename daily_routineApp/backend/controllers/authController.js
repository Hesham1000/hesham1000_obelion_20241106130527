const User = require('../models/User');
const { Op } = require('sequelize');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Incorrect username or password.' });
    }

    const isPasswordValid = await User.validatePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect username or password.' });
    }

    // Assuming session management or JWT token generation is handled elsewhere
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
