
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const musiquesRoutes = require('./routes/musiques-routes');
const filmsRoutes = require('./routes/films-routes');
const HttpError = require('./models/http-error');

const app = express()
const port = 5000

app.use(bodyParser.json())

app.use('/api/musiques',musiquesRoutes);

app.use((req,res,next) => {
    const error = new HttpError('Page pas trouvée', 404);
    next(error);
});

app.use('/api/films',filmsRoutes);

app.use((error, req, res, next) => {
    if (res.headerSent) { //vérifier si la réponse a terminé / a été retournée
        return next(error);
    }
    res.status(error.code || 500); //vérifier si un code erreur spécifique a été généré par le router
    res.json({ message: error.message || 'Une erreur non gérée est survenue' })
});

app.get('/', (req, res) => {
    res.json({musiques:'Liste des musiques'})
 //   console.log(req)
})

const uri = 'mongodb+srv://greta:zyvkVpTFE1XbnKL8@clustertest.jy1ghco.mongodb.net/Gretadb?retryWrites=true&w=majority';
//userNewUrlParser: true, userUnifiedTopology: true, userFindAndModify: true
const options = {};
mongoose.connect(uri, options)
    .then(()=>{
        app.listen(port,console.log(`serveur running on port ${port}`));
    })
    .catch(err =>{
        console.log(err);
    })

//app.listen(port, () => {
 //   console.log(`Server running on port ${port}`)
//})
