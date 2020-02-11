const User = require('../models/userModels');

module.exports = {
  ensureAuthenticated: function (req, res, next) { // Esta função será executada quando o utlizador não estiver autenticado.
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Por favor cadastre para ver o conteúdo!');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function (req, res, next) { // Esta função será executada quando o utlizador estiver autenticado.
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');
  }
};