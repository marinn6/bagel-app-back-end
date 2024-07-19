const cors = require("cors")
const express = require("express")

const app = express();
const bagelsController = require('./controllers/bagelsController')

app.use(cors());
app.use(express.json());
app.use('/bagels', bagelsController)


app.get("/", (req, res) => {
    res.send("Welcome to the Bagel Lab!")
});

app.get('*', (req, res) => {
    res.status(404).send("Page Not Found")
})

module.exports = app;