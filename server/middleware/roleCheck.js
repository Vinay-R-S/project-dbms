export const isManager = (req, res, next) => {
    if (req.user && req.user.role === 'Manager') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Manager role required.' });
    }
};

export const isEmployee = (req, res, next) => {
    if (req.user && req.user.role === 'Employee') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Employee role required.' });
    }
};