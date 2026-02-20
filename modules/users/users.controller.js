const usersService = require('./users.service');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers(); // Call the service to get all users
    res.json(users); // Send the orders as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
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
