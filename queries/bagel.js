const db = require("../db/dbConfig");

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

const createBagel = async() => {
    try {
        const newBagel = await db.one("INSERT INTO bagels (name, description, type, price, is_glutenFree, is_available) VALUES ($1, $2, $3, $4, $5, $6, $7 RETURNING *", []) 
        return newBagel
    } catch(error) {
        return error
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

module.exports = { getAllBagels, getBagelById, createBagel, deleteBagel }