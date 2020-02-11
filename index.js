const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// configurar o Passport
require('./config/passport')(passport);

// DB Configurar a Base de dados
const db = require('./config/keys').mongoURI;
// Conectar com o MongoDB
mongoose
  .connect(
    db,
    { 
      useNewUrlParser: true
    }
  )
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Analisador de corpo Express
app.use(express.urlencoded({ extended: true }));

// Sessão Express
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Conexão flash
app.use(flash());

// Variáveis Globais
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/indexRoutes.js'));
app.use('/users', require('./routes/usersRoutes.js'));
app.use('/publish', require('./routes/publishRoutes.js'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Para ver o conteudo da pagina visite http://localhost:${PORT}`));