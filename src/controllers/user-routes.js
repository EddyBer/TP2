const express = require('express');
const jwt = require('jsonwebtoken')
const env = require("dotenv").config()
const router = express.Router();
const userRepository = require('../models/user-repository');
const middlewares = require('../core/middlewares');
const { verify } = require('jsonwebtoken');

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

    const {firstName, password} = req.body

    const token = jwt.sign(
        {user : firstName}, process.env.TOKEN_KEY,
        {
            expiresIn : "1h"
        }
    )

    res.status(200).json(token)
    return res
})

router.get('/logged/test',middlewares.VerifyToken , (req,res) => {
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
