const verifySecret = async (req, res, next) =>{
    console.log(req.headers.shipping_secret_key)
    if (!req.headers.shipping_secret_key){
        return res.status(403).json({"error": "SHIPPING_SECRET_KEY is missing or invalid"})
    }
    if(req.headers.shipping_secret_key != 'a1b2c3d4e5f67890123456789abcdef'){
        return res.status(403).json({"error": "Failed to authenticate SHIPPING_SECRET_KEY"})
    }
    next()
}

module.exports = { verifySecret }