const express = require('express')
const bagels = express.Router()


//Index: localhost:4008/bagels
bagels.get("/", async (req, res) => {
    const allBagels = await getAllBagels()
    if(allBagels[0]){
        res.status(200).json(allSongs)
    } else {
        res.status(404).json({ error: "Internal Server Error" })
    }
})

//Show: localhost:4008/bagels/1
bagels.get("/:id", async (req, res) => {
    const { id } = req.params
    const singleBagel = await getBagelById(id)
    if(singleBagel.id){
        res.status(200).json(singleSong)
    } else {
        res.status(404).json({ error: "Bagel Not Found" })
    }
})

//Create: 
bagels.post('/', async (req, res) => {
    const newBagel = await createBagel(req.body)
    res.json(newBagel)
})

module.exports = bagels