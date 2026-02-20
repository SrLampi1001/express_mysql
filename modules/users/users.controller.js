const usersService = require('./users.service');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
exports.getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await usersService.getUserByEmail(email);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
