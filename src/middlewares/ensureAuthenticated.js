import jwt from 'jsonwebtoken';

export function ensureAuthenticated(req, res, next) {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    try{
        const { id, admin } = jwt.verify(authorization, process.env.JWT_SECRET);
        req.userId = id;
        req.isAdmin = !!admin;

        next();

    }catch(error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }
}