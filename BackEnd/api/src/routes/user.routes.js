const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controllers');
router.get('/basic',userController.helloworld);
// Retrieve all users
router.get('/', userController.findAll);
// Create a new user
router.post('/', userController.create);
//Login
router.post('/login', userController.login);
// Retrieve a single user with id
router.get('/:phone', userController.findOne);
// Update a user with id
router.put('/:id', userController.update);
// Delete a user with id
router.delete('/:id', userController.delete);
module.exports = router