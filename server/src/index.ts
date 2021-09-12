import express from 'express'
import notesApi from './routes/notesRouter'

const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use('/api/note', notesApi)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))