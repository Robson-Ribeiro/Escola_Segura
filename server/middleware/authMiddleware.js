import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        let decodedData = jwt.verify(token, process.env.TOKEN_SECRET);
        if(!decodedData.id) return res.status(401).json({ error: "You must log in before accessing this route"});

        req.user = { id: decodedData?.id };

        next();
    } catch (error) {
        console.log(error);
    }
}

export default authMiddleware;