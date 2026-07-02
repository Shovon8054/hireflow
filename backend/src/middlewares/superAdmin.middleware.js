export const isSuperAdmin = (req, res, next) => {
    try {

    
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin only."
            });
        }

        if (req.user.admin_type !== "SUPER_ADMIN") {
            return res.status(403).json({
                message: "Only Super Admin can perform this action."
            });
        }

        next();

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }
};