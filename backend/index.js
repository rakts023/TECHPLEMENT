import express from 'express'
import cors from 'cors'
import mysql from 'mysql'
import dotenv from 'dotenv'

const app = express()
dotenv.config()
app.use(cors())

app.get('/', (req, res) => {
    res.send("DB Server is Ready")
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

const sql = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME 
})

sql.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("DB Connected");   
    }
})

app.get('/api/quotes', (req, res) => {
    const query = 'SELECT * FROM quotes'
    sql.query(query, (error, results) => {
        if (error) {
            console.error(error)
            res.status(500).send('Error fetching quotes')
            return
        }
        res.json(results)
    })
})