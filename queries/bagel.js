const db = require("../db/dbCOnfig");

const getAllBagels = async (order, is_gluten_free, type ) => {
    try {
        let queryString = "SELECT * FROM bagels";
        const params = [];

        if (type === "Savory" || type === "Sweet" || type === "Gluten-free" || type === "Traditional") {
            queryString += " WHERE type = $1 ";
            params.push(type)
        }

        if (is_gluten_free !== undefined) {
            queryString += " WHERE is_gluten_free = $1 ";
            params.push(is_gluten_free === "true");
        }
    
        if (order) {
            queryString += " ORDER BY name " + (order === "desc" ? "DESC" : "ASC");
        }
        
        const allBagels = await db.any(queryString, params);
        return allBagels
    } catch (error) {
        return error;
    }
};

const getBagelById = async (id) => {
  try {
    const singleBagel = await db.one("SELECT * FROM bagels WHERE id=$1", id);
    return singleBagel;
  } catch (error) {
    return error;
  }
};

// nicole code
// const createBagel = async (bagel) => {
//   try {
//     const newBagel = await db.one(
//       "INSERT INTO bagels (name, description, type, price, is_gluten_free, is_available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
//       [
//         bagel.name,
//         bagel.description,
//         bagel.type,
//         bagel.price,
//         bagel.is_gluten_free,
//         bagel.is_available,
//       ]
//     );
//     return newBagel;
//   } catch (error) {
//     return error;
//   }
// };

//rizel code
const createBagel = async (bagel) => {
  try {
    // Execute the SQL query with all the necessary fields
    const newBagel = await db.one(
      "INSERT INTO bagels (name, description, type, price, is_gluten_free, is_available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        bagel.name,
        bagel.description,
        bagel.type || "SUGGESTED!", // Provide a default value for type if not provided
        bagel.price || 0.0, // Provide a default value for price if not provided
        bagel.is_gluten_free || false, // Provide a default value for is_gluten_free if not provided
        bagel.is_available || false, // Provide a default value for is_available if not provided
      ]
    );
    return newBagel;
  } catch (error) {
    console.error("Error creating bagel:", error);
    throw error; // Rethrow error to handle it where this function is called
  }
};

const deleteBagel = async (id) => {
  try {
    const deletedBagel = await db.one(
      "DELETE FROM bagels WHERE id=$1 RETURNING *",
      id
    );
    return deletedBagel;
  } catch (error) {
    return error;
  }
};

const updateBagel = async (id, bagel) => {
  try {
    const updatedBagel = await db.one(
      "UPDATE bagels SET name=$1, description=$2, type=$3, price=$4, is_gluten_free=$5, is_available=$6 WHERE id=$7 RETURNING *",
      [
        bagel.name,
        bagel.description,
        bagel.type,
        bagel.price,
        bagel.is_gluten_free,
        bagel.is_available,
        id,
      ]
    );
    console.log(updatedBagel);
    return updatedBagel;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllBagels,
  getBagelById,
  createBagel,
  deleteBagel,
  updateBagel,
};
