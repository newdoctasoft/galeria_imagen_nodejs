const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid/v4');


const path = require('path');
 
// intializations
const app = express();
require('./base');

// settings
app.set('views', path.join(__dirname, 'vistas'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
}) 
app.use(multer({storage}).single('imagen'));

 

// routes
app.use(require('./rutas/index'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start
app.listen(3000, () => {
    console.log(`Server on port ${app.get('port')}`);
});
