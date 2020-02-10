const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Publish = require('../models/publishModels');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard - 
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

// Create publ
router.get('/publish/crud/create/', ensureAuthenticated, (req, res) =>{
  res.render('crud/create',{
    user: req.user
  });
});

// Retrieve publ
router.get('/publish/crud/retrieve/:id', ensureAuthenticated, (req, res) =>{
  Publish.findById(req.params.id)
      .then(function (doc) {
        res.render('crud/retrieve', {
          publ: doc
    });
  });
});

// Update publ
router.get('/publish/crud/update/:id', ensureAuthenticated, (req, res) =>{
  Publish.findById(req.params.id)
      .then(function (doc) {
        res.render('crud/update', {
          publ: doc
    });
  });
});

// Delete publ
router.get('/publish/crud/delete/:id', ensureAuthenticated, (req, res) =>{
  Publish.findById(req.params.id)
      .then(function (doc) {
        res.render('crud/delete', {
          publ: doc
    });
  });
});

module.exports = router;
