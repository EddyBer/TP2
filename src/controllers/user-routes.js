const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');

router.get('/', (req, res) => {
  res.send(userRepository.getUsers())
});

router.get('/:firstName', (req, res) => {
  const foundUser = userRepository.getUserByFirstName(req.params.firstName);

  if (!foundUser) {
    throw new Error('User not found');
  }

  res.send(foundUser);
});

router.post('/', (req, res) => {
  userRepository.createUser(req.body);
  res.status(201).end();
});

router.post('/login', (req,res) => {
    const connection = userRepository.login(req.body)

    if (!connection) {
        res.status(401).end(); 
    }

    res.status(200).end()
    
})

router.put('/:id', (req, res) => {
  userRepository.updateUser(req.params.id, req.body);
  res.status(204).end();
});

router.delete('/:id', (req, res) => {
  userRepository.deleteUser(req.params.id);
  res.status(204).end();
});

exports.initializeRoutes = () => {
  return router;
}
