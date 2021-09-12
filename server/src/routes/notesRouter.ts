import express from 'express'

const NotesCtrl = require('../controllers/notesCtrl')

const router = express.Router()

router.post('/', NotesCtrl.createNote)
router.put('/:id', NotesCtrl.updateNote)
router.delete('/:id', NotesCtrl.deleteNote)
//router.get('/:id', NotesCtrl.getNoteById)
router.get('/', NotesCtrl.getNotes)

export default router;