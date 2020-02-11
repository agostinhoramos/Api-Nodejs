const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Carregar o modelo do utilizador
const User = require('../models/userModels');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      
      // Verificar se existe algum utilizador com o mesmo Email
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'Este email não existe' });
        }

        // Tentativa de combinar os senhas
        bcrypt.compare(password, user.password, (err, isMatch) => { // Esta função vai fazer um hash da senha que o utilizador introduzir
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Senha inválida!' });
          }
        });
      });
    })
  );

  // Serializar o utilizador
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Desserializar o utilizador
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
