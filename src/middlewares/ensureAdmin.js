
export function ensureAdmin(req, res, next) {
    if(!req.isAdmin) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        })
    }

    return next();
}