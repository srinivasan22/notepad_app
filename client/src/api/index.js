import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const createNote = async payload => api.post(`/note`, payload)
export const getAllNotes = () => api.get(`/notes`)
export const updateNoteById = (id, payload) => api.put(`/note/${id}`, payload)
export const deleteNoteById = id => api.delete(`/note/${id}`)

const apis = {
    createNote,
    getAllNotes,
    updateNoteById,
    deleteNoteById,
}

export default apis