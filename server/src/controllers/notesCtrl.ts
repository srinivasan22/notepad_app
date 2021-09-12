import { inspect } from "util"
import { Note } from '../models/notesModel'
import { DatabaseService } from "../services/DatabaseService"
import { dbConfig } from "../constants/config"
import { v4 as uuid } from 'uuid';

const databaseService = new DatabaseService(dbConfig.dbName, dbConfig.eventCollection, false);

const saveNote = (note: Note): Promise<boolean> => {
    return databaseService.getDBClient().then(dbClient=>{
        if (note) {
            if (!note._id) {
                note._id = uuid();
            }
            return dbClient.db(dbConfig.dbName).collection(dbConfig.eventCollection).replaceOne({ _id: note._id}, note, { upsert: true }).then(() => {
                return true;
            }).catch(err => {
                console.error(JSON.stringify(err));
                return false;
            });
        } else {
            console.error("ERROR:: Database connection failure.. ");
            return false;
        }
    });
}

const removeNote = (id: any): Promise<boolean> => {
    return databaseService.getDBClient().then(dbClient=>{
            return dbClient.db(dbConfig.dbName).collection(dbConfig.eventCollection).deleteOne({ id: id }).then(() => {
                return true;
            }).catch(err => {
                console.error(err);
                return false;
            });
    });
}

const getAllNotes = (): Promise<Note[]> => {
    return databaseService.getDBClient().then(async client=>{
        if (client.isConnected()) {
            try {
                return client.db(dbConfig.dbName).collection(dbConfig.eventCollection).find().toArray().then(result=>{
                    const notes: Note[] = []
                    for (const content of result) {
                        notes.push(new Note(content.id, content.title, content.content, content.lastModified));
                    }
                    return notes;
                })
            } catch (err) {
                console.error(err);
                return [];
            }
        } else {
            console.error("ERROR:: Database connection failure.. ");
            return [];
        }
    });
}

const createNote = (req, res) => {
    const content = req.body
    if (!content) {
        return res.status(400).json({
            success: false,
            error: 'You must provide content for the note',
        })
    }

    const note = new Note(content.id, content.title, content.content, content.lastModified)

    if (!note) {
        return res.status(400).json({ success: false, error: 'No note' })
    }
    saveNote(note)
        .then(() => {
            return res.status(201).json({
                success: true,
                id: note._id,
                message: 'Note created!',
            })
        })
        .catch(error => {
            console.log(JSON.stringify(error))
            return res.status(400).json({
                error,
                message: 'Note not created!',
            })
        })
}

const updateNote = async (req, res) => {
    const content = req.body
    if (!content) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a content to update',
        })
    }
    createNote(req, res)
}

const deleteNote = async (res) => {
    await removeNote((id: string ) => {
        if (!id) {
            return res
                .status(404)
                .json({ success: false, error: `Note not found` })
        }
        return res.status(200).json({ success: true })
    })
}

const getNotes = async (req, res) => {
    await getAllNotes(), (err, notes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!notes.length) {
            return res
                .status(404)
                .json({ success: false, error: `Note not found` })
        }
        return res.status(200).json({ success: true, data: notes })
    }
}

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNotes
}