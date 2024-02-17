import jwt from 'jsonwebtoken';

const authenticateJWT= (req, res, next)=> {
    try{
        const secret = process.env.JWT_SECRET
        if(!req.headers?.authorization){
            throw "No Authorization attached."
        }
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).send({ message: 'Token is not provided' });
        }
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Token is not valid' });
            }
            req.user = decoded;
            next();
        });
    }catch(err){
        throw err
    }
}
    
    export default authenticateJWT