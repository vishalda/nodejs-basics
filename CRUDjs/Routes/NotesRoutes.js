const express = require('express')

const mongoose = require('mongoose')

const Notes = mongoose.model('notes')

const router = express.Router();

const notesController = require('../Controllers/NoteControllers.js');

router.get('/',notesController.baseRoute);

router.get('/notes',notesController.getNotes);

router.post('/create-notes',notesController.createNotes);

router.get('/single-note/:id',notesController.getSingleNote);

router.put('/update-note/:id',notesController.updateNote);

router.delete('/delete-note/:id',notesController.deleteNote);

module.exports = router;
