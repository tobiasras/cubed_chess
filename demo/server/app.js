import express from 'express'
import path from 'path'


const app = express()


app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})


app.listen(8080, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('__ server is running __')
    }
})