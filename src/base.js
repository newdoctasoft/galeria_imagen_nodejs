const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/galeria-imagen', {
    useNewUrlParser: true
})
    .then(db => console.log('SE CONECTO A LA BASE'))
    .catch(err => console.log(err));