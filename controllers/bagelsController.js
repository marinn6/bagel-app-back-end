const express = require('express')
const bagels = express.Router()
const { getAllBagels, getBagelById, createBagel, deleteBagel, updateBagel } =require('../queries/bagel')

//Index: localhost:4008/bagels
bagels.get("/", async (req, res) => {
    const allBagels = await getAllBagels()
    //if req.query.order === "as
    if(allBagels[0]){
        res.status(200).json(allBagels)
    } else {
        res.status(404).json({ error: "Internal Server Error" })
    }
})

//Show: localhost:4008/bagels/1
bagels.get("/:id", async (req, res) => {
    const { id } = req.params
    const singleBagel = await getBagelById(id)
    if(singleBagel.id){
        res.status(200).json(singleBagel)
    } else {
        res.status(404).json({ error: "Bagel Not Found" })
    }
})

//Create: localhost:4008/bagels/
bagels.post('/', async (req, res) => {
    const newBagel = await createBagel(req.body)
    res.status(201).json(newBagel)
})

//Delete: localhost:4008/bagels/:id
// :id is a parameter(param)
//req.params holds the params that the request(req) holds
bagels.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deletedBagel = await deleteBagel(id)
        if(deletedBagel.id){
            res.status(200).json({ message: "Successfully deleted bagel." })
        } else {
            res.status(404).json({ error: "Bagel Not Found" })
        } 
    }   catch (error) {
        console.error(`Error deleting bagel with id: ${id}`)
    }
})

//Edit/UPDATE: localhost:4008/bagels/:id
bagels.put("/:id", async (req, res) => {
    const { id } = req.params
    const updatedBagel = await updateBagel(id, req.body)
    console.log(updatedBagel)
    if(updatedBagel.id){
        res.status(200).json(updatedBagel)
    } else {
        res.status(404).json({ error: "Bagel Not Found" })
    }
})

module.exports = bagels