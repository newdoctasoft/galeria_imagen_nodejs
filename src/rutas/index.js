const { Router } = require('express'); 
const path = require('path'); 
const router = Router();
const { unlink } = require('fs-extra');

 // Models
const Imagen = require('../modelos/Imagen');

router.get('/', async (req, res) => {
    const imagenes = await Imagen.find();
    res.render('index', { imagenes });
});
router.get('/formulario', (req, res) => {
    res.render('formulario');
});

router.post('/formulario', async (req, res) => {
    const imagen = new Imagen();
    imagen.titulo = req.body.titulo;
    imagen.descripcion = req.body.descripcion;
    imagen.filename = req.file.filename;
    imagen.path = '/img/uploads/' + req.file.filename;
    imagen.originalname = req.file.originalname;
    imagen.mimetype = req.file.mimetype;
    imagen.tamanio = req.file.size; 

    await imagen.save();
    res.redirect('/');
});


router.get('/imagen/:id', async (req, res) => {
    const { id } = req.params;
    const imagen = await Imagen.findById(id);
    res.render('perfil', { imagen });
});

router.get('/imagen/:id/eliminar', async (req, res) => {
    const { id } = req.params;
    const imagenEliminada = await Imagen.findByIdAndDelete(id); 
    await unlink(path.resolve('./src/public' + imagenEliminada.path));
    res.redirect('/');
});

module.exports = router;