interface Options {
    role?: string;
}

export default (options: Options) => {
    return async (req, res, next) => {
        if (options.role) {
            if (req.user.role !== options.role) {
                return res.status(403)
            }
        }
        next();
    }
}
