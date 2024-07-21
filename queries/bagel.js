const db = require("../db/dbCOnfig")

const getAllBagels = async (order ) => {
    try {
        let queryString = "SELECT * FROM bagels";
        const params = [];
        if (order) {
            queryString += " ORDER BY name " + (order === "desc" ? "DESC" : "ASC");
        }
        console.log(queryString, order)
        const allBagels = await db.any(queryString, params);
        return allBagels
    } catch (error) {
        return error;
    }
};

const getBagelById = async (id) => {
    try {
        const singleBagel = await db.one("SELECT * FROM bagels WHERE id=$1", id);
        return singleBagel
    } catch (error) {
        return error;
    }
};

const createBagel = async(bagel) => {
    try {
        const newBagel = await db.one("INSERT INTO bagels (name, description, type, price, is_gluten_free, is_available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [bagel.name, bagel.description, bagel.type, bagel.price, bagel.is_gluten_free, bagel.is_available]);
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
        const updatedBagel = await db.one("UPDATE bagels SET name=$1, description=$2, type=$3, price=$4, is_gluten_free=$5, is_available=$6 WHERE id=$7 RETURNING *", [bagel.name, bagel.description, bagel.type, bagel.price, bagel.is_gluten_free, bagel.is_available, id])
        console.log(updatedBagel)
        return updatedBagel;
    } catch (error) {
        return error;
    }
}






module.exports = { getAllBagels, getBagelById, createBagel, deleteBagel, updateBagel }