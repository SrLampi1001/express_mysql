const service = require('./users.service');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await service.getAllUsers(); // Call the service to get all users
    res.json(users); // Send the orders as a JSON response
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.getUserById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
exports.getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await service.getUserByEmail(email);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
