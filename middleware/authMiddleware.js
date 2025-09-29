const verifySecret = async (req, res, next) =>{
    if (!req.headers.SHIPPING_SECRET_KEY){
        return res.status(403).json({"error": "SHIPPING_SECRET_KEY is missing or invalid"})
    }
    if(req.headers.SHIPPING_SECRET_KEY === 'a1b2c3d4e5f67890123456789abcdef'){
        next()
    }
    return res.status(403).json({"error": "Failed to authenticate SHIPPING_SECRET_KEY"})
}

module.exports = { verifySecret }