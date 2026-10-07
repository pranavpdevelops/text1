import jwt from "jsonwebtoken"

const protect = (req,res,next)=>{
    try {
        const authHeader = req.headers.authorization
        if(!authHeader||!authHeader.startsWith("bearer")){
            return res.status(404).json({
                message:"authentication required"
            })
        }

        const token = authHeader.split("")[1]
        const decoded = jwt.verify( token,process.env.TOKEN_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(404).json({
            message:"invalid token"
        })
    }
}

export default protect