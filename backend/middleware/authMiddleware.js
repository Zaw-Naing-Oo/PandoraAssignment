import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers?.authorization.split(" ")[1]; 
        let decodeData;
        if(token) {
            decodeData = jwt.verify(token, process.env.SECRET);
            console.log(decodeData);
            req.userId = decodeData?.id;
        }
    next();
    } catch (error) {
        console.log(error);
        return;
}}

export default verifyToken