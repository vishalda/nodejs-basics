const express = require('express')

const mongoose = require('mongoose')

const Notes = mongoose.model('notes')

const router = express.Router();

const notesController = require('../Controllers/NoteControllers.js');

router.get('/',notesController.baseRoute);

router.get('/notes',notesController.getNotes);

module.exports = router;
