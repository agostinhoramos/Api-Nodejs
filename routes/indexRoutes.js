const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth'); // chamas as funções de autenticação
const Publish = require('../models/publishModels');

// Visualizar a página <Welcome>
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Visualizar a página <Dashboard>
router.get('/dashboard', ensureAuthenticated, (req, res) =>{
  Publish.find()
    .then(function (doc) {
      res.render('dashboard', {
        data: doc,
        user: req.user
      });
    });
});

//CRUD

// Visualizar a página <create>
router.get('/publish/crud/create/', ensureAuthenticated, (req, res) =>{
  res.render('crud/create',{
    user: req.user
  });
});

// Visualizar a página <retrieve> e também procurar todos os dados da publicação com este mesmo ID
router.get('/publish/crud/retrieve/:id', ensureAuthenticated, (req, res) =>{
  Publish.findById(req.params.id)
      .then(function (doc) {
        res.render('crud/retrieve', {
          publ: doc
    });
  });
});

// Visualizar a página <update> e também procurar todos os dados da publicação com este mesmo ID
router.get('/publish/crud/update/:id', ensureAuthenticated, (req, res) =>{
  Publish.findById(req.params.id)
      .then(function (doc) {
        res.render('crud/update', {
          publ: doc
    });
  });
});

// Visualizar a página <delete> e também procurar todos os dados da publicação com este mesmo ID
router.get('/publish/crud/delete/:id', ensureAuthenticated, (req, res) =>{
  Publish.findById(req.params.id)
      .then(function (doc) {
        res.render('crud/delete', {
          publ: doc
    });
  });
});

module.exports = router;
