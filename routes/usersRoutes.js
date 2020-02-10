const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Carregar o modelo de utilizador
const User = require('../models/userModels');
const { forwardAuthenticated } = require('../config/auth');

// Pegar os conteúdos da autenticação login
router.get('/login', forwardAuthenticated, (req, res) => {
  User.find()
  .then(function(doc){
    res.render('login', { // Mostrar a página de Login
      user: doc
    });
  });
});

// Pegar os conteúdos da autenticação registar
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Por favor preencha todos os campos' });
  }

  if (password != password2) {
    errors.push({ msg: 'Senha não coincidem' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Senha deve ter minimo 6 caracteres' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Este email já existe' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Dados registado com sucesso!'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout();
  req.flash('success_msg', 'Sessão terminada com sucesso');
  res.redirect('/users/login');
});

module.exports = router;