import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()
const PORT = process.env.PORT || 5000

console.log('I am officially alive!')

// Get the file path from the URL of the current module 

const __filename = fileURLToPath(import.meta.url)

// Get the directory name of the current module

const __dirname = dirname(__filename)

app.use(express.json())
// Serve the HTML file from the /public directory and tells express to serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')))

// Serving the HTML file from the HTML directory 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

// Routes 
app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, you can access it at http://localhost:${PORT}`)
}) 
