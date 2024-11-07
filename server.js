const express = require('express');
const app = express();
const PORT = 3000;

// Middleware pour servir les fichiers CSS
app.use(express.static('public'));

// Middleware de vérification des heures de travail
const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('<h1>Sorry, the website is only available during working hours (Monday to Friday, 9 AM to 5 PM).</h1>');
  }
};

app.use(checkWorkingHours);

// Configurer le moteur de template EJS
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Accueil' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'Nos Services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Nous Contacter' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
