const checkBagel = (req, res, next) => {
    //Check if the body of the request contains a key called 'name'
    if(req.body.name){
        return next()
    } else {
        res.status(400).json({ error: "Name is required" })
    }
}

module.exports = { checkBagel }