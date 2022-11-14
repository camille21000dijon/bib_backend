
const express = require('express');

const musiquesControllers = require('../controllers/musiques-controllers');

const router = express.Router();

router.get('/', musiquesControllers.getMusique);

router.get('/:musiqueid', musiquesControllers.getMusiqueById);

router.post('/', musiquesControllers.createMusique);

router.patch('/:musiqueid', musiquesControllers.updateMusique);

router.delete('/:musiqueid', musiquesControllers.deleteMusique);



module.exports = router;

