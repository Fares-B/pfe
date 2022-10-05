interface Options {
    role?: string;
    verified?: boolean;
    isCurrentUser?: boolean;
}

export default function (options: Options) {
    return async (req: any, res: any, next: any) => {
        const { role, verified = true, isCurrentUser } = options;
        const { user } = req;

        if (verified && !user.verified) {
            return res.sendStatus(403);
        }

        
        if (role) {
            // si bon role ou utilisateur courant
            if (user.role === role || (isCurrentUser && user.id === req.params.id)) {
                return next();
            }
            return res.sendStatus(403);
        }
        next();
    };
}
