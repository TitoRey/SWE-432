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

// Editing a User
router.get('/:id/edit', getUser, async (req, res) => { 
  try {
    res.render('users/edit', { user: res.user })
  } catch (error) { 
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
// NOTE: Should be a PATCH request but it is not working properly on the form...really weird
router.post('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(userId, { $set: req.body }, { new: true });
    res.redirect('/users');
  } catch ( error ) { 
    console.log(error);
    res.redirect(`/users/${userId}/edit`);
  }
});

// Deleting a User
router.delete('/:id', getUser, (req, res) => { 
  try { 
    res.user.remove();
    res.redirect('/users');
  } catch (error) { 
    res.redirect('/users');
  }
});

async function getUser(req, res, next) { 
  let user;
  try {    
    user = await User.findById(req.params.id);
    if (user == null) { 
      res.redirect('/users');
    }
  } catch (error) { 
    console.log('User not found');
    res.redirect('/users');
  }
  res.user = user;
  next();
}

module.exports = router;