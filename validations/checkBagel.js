const checkName = (req, res, next) => {
    //Check if the body of the request contains a key called 'name'
    if(req.body.name === 'string'){
        return next()
    } else {
        res.status(400).json({ error: "Bagel name is required" })
    }
}

const checkPrice = (req, res, next) => {
    if(req.body.price > 0) {
        return next()
    } else {
        res.status(400).json({ error: "Price MUST be greater than 0."})
    }
    return price;
}

const checkGlutenFree = (req, res, next) => {
    if(req.body.is_glutenFree === 'boolean') {
        next()
    } else {
        res.status(400).json({ error: 'Gluten Free must be a boolean'})
    }
}



module.exports = { checkName, checkPrice, checkGlutenFree }