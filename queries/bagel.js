const db = require("../db/dbCOnfig")

const getAllBagels = async () => {
    try {
        const allBagels = await db.any("SELECT * FROM bagels");
        return allBagels
    } catch (error) {
        return error;
    }
};

const getBagelById = async (id) => {
    try {
        const singleBagel = await db.one("SELECT * FROM bagels WHERE id=$1", id)
        return singleBagel
    } catch (error) {
        return error;
    }
};

const createBagel = async(bagel) => {
    try {
        const newBagel = await db.one("INSERT INTO bagels (name, description, type, price, is_glutenFree, is_available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [bagel.name, bagel.description, bagel.type, bagel.price, bagel.is_glutenFree, bagel.is_available]) 
        return newBagel
    } catch(error) {
        return error;
    }
}

const deleteBagel = async (id) => {
    try {
        const deletedBagel = await db.one("DELETE FROM bagels WHERE id=$1 RETURNING *", id)
        return deletedBagel
    } catch (error) {
        return error
    }
}

const updateBagel = async (id, bagel) => {
    try {
        const updatedBagel = await db.one("UPDATE bagels SET name=$1, is_favorite=$2 WHERE id=$3 RETURNING *", [bagel.name])
        return updatedBagel
    } catch (error) {
        return error
    }
}

module.exports = { getAllBagels, getBagelById, createBagel, deleteBagel, updateBagel }