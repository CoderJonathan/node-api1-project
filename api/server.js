// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')
const server = express()

server.use(express.json())

// [POST] /api/users
server.post('/api/users', (req,res) => {
    const newUser = req.body
    User.insert(newUser)
    .then(newUser => {
        if(!newUser.name || !newUser.bio) {
            res.status(400).json({
                message: `provide name and bio`
            })
        } else {
            const createUser = (newUser)
            res.status(201).json(createUser)
        }
    })
    .catch(err => {
        res.status(500).json({
            error: `500 Error`,
            message: err.message,
            stack: err.stack
        })
    })
})
// [GET] /api/users
server.get('/api/users', (req,res) => {
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({
            error: `no users found`,
            message: err.message,
            stack: err.stack
        })
    })
})
// [GET] /api/users/:id
server.get('/api/users/:id', (req,res) => {
    User.findById(req.params.id)
    .then(foundUser => {
        if (!foundUser) {
            res.status(404).json({
                message: `does not exist`
            })
        } else {
            res.json(foundUser)
        }
    })
    .catch(err => {
        res.status(500).json({
            error: `no users found`,
            message: err.message,
            stack: err.stack
        })
    })
})
// [DELETE] /api/users/:id
server.delete('/api/users/:id', (req,res) => {
    User.remove(req.params.id)
    .then(removeUser => {
        if (!removeUser) {
            res.status(404).json({
                message: `does not exist`
            })
        } else {
            res.json(removeUser)
        }
    })
    .catch(err => {
        res.status(500).json({
            error: `no users found`,
            message: err.message,
            stack: err.stack
        })
    })
})
// [PUT] /api/users/:id
server.put('/api/users/:id', async (req,res) => {
    try {
        const possibleUser = await User.findById(req.params.id)
        if (!possibleUser) {
            res.status(404).json({
                message:"does not exist",
            })
        } else {
          if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message:"provide name and bio",
            })
        } else {
            const editedUser = await User.update(
                req.params.id,
                req.body,
            )
            res.status(200).json(editedUser)
        }
      }
    } catch (err) {
        res.status(500).json({
            message: 'error with edited user',
            err: err.message,
            stack: err.stack,
        })    
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
