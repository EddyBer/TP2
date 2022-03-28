const { users } = require('./db');
const md5 = require('md5');
const uuid = require('uuid');
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(12)

exports.getUsers = () => {
  return users;
};

exports.getUserByFirstName = (firstName) => {
  const foundUser = users.find((user) => user.firstName == firstName);

  if (!foundUser) {
    throw new Error('User not found');
  }

  return foundUser;
};

exports.createUser = (data) => {
  const user = {
    id: uuid.v4(),
    firstName: data.firstName,
    lastName: data.lastName,
    password: bcrypt.hashSync(data.password,salt),
  };

  users.push(user);
};

exports.updateUser = (id, data) => {
  const foundUser = users.find((user) => user.id == id);

  if (!foundUser) {
    throw new Error('User not found');
  }

  foundUser.firstName = data.firstName || foundUser.firstName;
  foundUser.lastName = data.lastName || foundUser.lastName;
  foundUser.password = data.password ? md5(data.password) : foundUser.password;
};

exports.deleteUser = (id) => {
  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex === -1) {
    throw new Error('User not foud');
  }

  users.splice(userIndex, 1);
};

exports.login = (data) => {
    const userIndex = users.findIndex((user) => user.firstName == data.firstName)

    if (userIndex === -1) {
        throw new Error('User not foud');
    }

    let comparePassword = bcrypt.compareSync(data.password, users[userIndex].password)

    return comparePassword
};
