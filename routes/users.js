const express = require('express');
const router = express.Router();
const User = require('../models/user');
const roleNames = { 
  0: 'Listener',
  1: 'DJ',
  2: 'Admin'
}

// Grabbing all Users
router.get('/', async (req, res) => { 
  let users = await User.find();
  res.render('users/index', { users: users, roleNames: roleNames });
});

// Form for a new User
router.get('/new', (req, res) => { 
  res.render('users/form');
})

// Grabbing a User
router.get('/:id', (req, res) => { 
});

// Editing a User
router.get('/:id/edit', async (req, res) => { 
  // const user = await User.findById(req.params.id);
  // console.log(user);

  try {
    const user = await User.findById(req.params.id);
    res.render('users/edit', { user: user })
  } catch (error) { 
    console.log(error);
    res.redirect('/users');
  }
});

// Creating a User
router.post('/', async (req, res) => {
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  try { 
    const newUser = await user.save();
    res.status(201).render('users/index');
  } catch (error) { 
    console.log(error);
    res.redirect('/users/new');
  }
});

// Updating a User
router.patch('/:id', (req, res) => {
});

// Deleting a User
router.delete('/:id', (req, res) => { 
});

module.exports = router;